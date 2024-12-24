import axios from 'axios';
import { useEffect, useState } from 'react';
import BACKEND_URL from '../config';
import Token from '../Token';
import { getConfig, getStatus } from './Auth';

export function HqMediaHandler() {
  const [voice, setVoice] = useState([]); // Initialize voices with an empty array
  const [audio, setAudio] = useState();
  const [video, setVideo] = useState(null);
  const [presenters, setPresenters] = useState([]); // Initialize as an empty array
  const [presenter, setPresenter] = useState();
  const [presenterimg,setPresenterimg]= useState(null);
  const [audioprompt, setaudioPrompt] = useState("");
  const [voiceType, setVoiceType] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMakingVideo, setIsMakingVideo] = useState(false);
  const [url,setUrl] = useState(null);
  const [error, setError] = useState(null);
  const email = getStatus();


  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/generate/voicelist`);
        if (response.data && response.data.data) {
          setVoice(response.data.data);
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching voices:', error);
      }
    };

    fetchVoices();
  }, []);



  useEffect(() => {
    const fetchPresters = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/generate/hqpresenters`);
        console.log(response)
        if (response.data && response.data.data.presenters) {
          setPresenters(response.data.data.presenters);
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching voices:', error);
      }
    };

    fetchPresters();
  }, []);



  const handleAudioUpload = async (file) => {

    if (file) {
      const formData = new FormData();
      formData.append('audio', file);
     

      try {
        const response = await axios.post('https://api.d-id.com/audios', formData, {
          headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data',
            authorization:Token,
          },
        });
        
        console.log(response)
    
        setAudio(response.data.url); // Set the response as the audio
      
      } catch (error) {
        console.error('Error uploading audio:', error);
      }
    }
  };


  


  const handleaudionPromptChange = (event) => {
    setaudioPrompt(event.target.value);
  };


  useEffect(() => {
    if (presenter) { // Check if `presenter` is non-null
        console.log(presenter)
      const getPresenter = async () => {
        try {
          const response = await axios.post(`${BACKEND_URL}/generate/hqpresenter`, {
            id: presenter // Send `presenter` as part of the request body
          });

          setPresenterimg(response.data.data.presenters[0].talking_preview_url); // Update with the image URL from the response
        } catch (err) {
          console.error("Error generating image:", err);
          alert("Something went wrong while generating the image. Please try again.");
        }
      };

      getPresenter();
    }
  }, [presenter]); 
  // imagelink ,voiceid ,prompt

  const createVideo = async (audioMode) => {

    if(!presenter){

      setError(402)
      return;
    }


    try {
      let videoResponse;  // Declare the videoResponse variable outside the conditions.
  
      // Check conditions for different modes
      if ( audioMode === 'upload') {
          videoResponse = await axios.post(`${BACKEND_URL}/generate/hqownvideo`, {
            presenterid: presenter,
            audiolink: audio,
            email:email
          },getConfig());
        }

       else if (audioMode === 'generate') {
          videoResponse = await axios.post(`${BACKEND_URL}/generate/hqvideo`, {
              presenterid: presenter,
              voiceid: voiceType,
              prompt: audioprompt,
              email:email
          },getConfig());
      }
  
      // Now that we have the response, we can handle saving and logging it.
      if (videoResponse) {
           console.log(videoResponse.data.data.id)
          setUrl(videoResponse.data.data.id); // Adjust based on actual response structure
       
          
      }
  
    } catch (error) {
      setError(error.status)

    }

  };


  const viewVideo = async () => {

    try{

           const response = await axios.get(`https://api.d-id.com/clips/${url}`, {
            headers: {
              accept: 'application/json',
              authorization:Token,
            },
           });
          
         
          console.log(response.data?.result_url)
          setVideo(response.data?.result_url);  // Call a function to handle the video saving process.

 
        }

        catch(err){
      console.log(err)
 
       }

  }
  

  return {
    audio,
    video,
    prompt,
    voiceType,
    isGenerating,
    isMakingVideo,
    voice,
    presenters,
    presenterimg,
    audioprompt,
    url,
    error,
    setError,
    viewVideo,
    setVoiceType,
    setPresenter,
    setAudio,
    handleaudionPromptChange,
    createVideo,
    handleAudioUpload,
    setVoice
  };
}
