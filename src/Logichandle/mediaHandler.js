import axios from 'axios';
import { useEffect, useState } from 'react';
import { getConfig, getStatus } from './Auth';
import OpenAI from "openai";
import BACKEND_URL from '../config';
import Token from '../Token';

export function useMediaHandler() {
  const [voice, setVoice] = useState([]); // Initialize voices with an empty array
  const [image, setImage] = useState(null);
  const [gptimage, setGptImage] = useState(null);
  const [audio, setAudio] = useState();
  const [video, setVideo] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [audioprompt, setaudioPrompt] = useState("");
  const [voiceType, setVoiceType] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMakingVideo] = useState(false);
  const [url,setUrl] = useState(null);
  const [error, setError] = useState(null);

  const email = getStatus();

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/generate/voicelist`);
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



  const handleImageUpload = async (file) => {

    // if (file) {
    //   const formData = new FormData();
    //   formData.append('image', file);

    //   try {
    //     const response = await axios.post('https://api.d-id.com/images', formData, {
    //       headers: {
    //         accept: 'application/json',
    //         'content-type': 'multipart/form-data',
    //         authorization:process.env.REACT_APP_DDI,
    //       },
    //     });

    //     console.log(response)
    //     setImage(response.data.url); // Set the response as the image

    //   } catch (error) {
    //     console.error('Error uploading image:', error);
    //   }
    // }
  };

  const handleAudioUpload = async (file) => {

    // if (file) {
    //   const formData = new FormData();
    //   formData.append('audio', file);
     

    //   try {
    //     const response = await axios.post('https://api.d-id.com/audios', formData, {
    //       headers: {
    //         accept: 'application/json',
    //         'content-type': 'multipart/form-data',
    //         authorization:process.env.REACT_APP_DDI,
    //       },
    //     });
        
    //     console.log(response)
    
    //     setAudio(response.data.url); // Set the response as the audio
      
    //   } catch (error) {
    //     console.error('Error uploading audio:', error);
    //   }
    // }
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  


  const handleaudionPromptChange = (event) => {
    setaudioPrompt(event.target.value);
  };


  const generateImage = async () => {

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY

    try {
    const config = getConfig();

    if (config.error ) {
      // If there's an error in the config, set error and stop execution
      setError(401); // Set error for unauthorized access
      return;
    }

    setIsGenerating(true);
      
      const openai = new OpenAI({
        apiKey: apiKey, 
        dangerouslyAllowBrowser: true, // Allow browser usage
      });
      
      
      const character_type = "person";
      const style = "should be portrait and facing the camera";
      const description = prompt;
  
      // Function to generate the prompt string
      const createPrompt = (character_type, style, description) => {
        return `A ${character_type}, in a ${style} style, with ${description}.`;
      };
  
      // Generate the prompt
      const generated_prompt = createPrompt(character_type, style, description);
  
      const response = await openai.images.generate({
        model: "dall-e-3", // Specify the model
        prompt: generated_prompt ,    // User-provided prompt
        n: 1,              // Number of images to generate
        size: "1024x1024", // Resolution of the generated image
      });
  
      setGptImage(response.data[0].url);
  
    } catch (error) {
      console.error("Error generating image:", error.message);
    }

    finally {
      setIsGenerating(false);
    }
  };


  // imagelink ,voiceid ,prompt

  const createVideo = async (imageMode, audioMode) => {

    console.log(audioMode,imageMode)
    try {
      let videoResponse;  // Declare the videoResponse variable outside the conditions.
  
      // Check conditions for different modes
      if (imageMode === 'upload' && audioMode === 'upload') {
          videoResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/generate/ownvideo`, {
              imagelink: image,
              audiolink: audio,
              email:email
          },getConfig() );

      } else if (imageMode === 'generate' && audioMode === 'upload') {
          videoResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/generate/ownvideo`, {
              imagelink: gptimage,
              audiolink: audio,
              email:email
          },getConfig() );
      } else if (imageMode === 'generate' && audioMode === 'generate') {
          videoResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/generate/video`, {
              imagelink: gptimage,
              voiceid: voiceType,
              prompt: audioprompt,
              email:email
          },getConfig() );
      } else if (imageMode === 'upload' && audioMode === 'generate') {
          videoResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/generate/video`, {
              imagelink: image,
              voiceid: voiceType,
              prompt: audioprompt,
              email:email,
          },getConfig() );
      }
  
      // Now that we have the response, we can handle saving and logging it.
      if (videoResponse) {
        
          setUrl(videoResponse.data.data.id); // Adjust based on actual response structure
          console.log(videoResponse.data.data.id)
          
          
      }
  
    } catch (error) {
      setError(error.status)

    }
  };


  const viewVideo = async () => {

         try{

           
          console.log(url)
  
           const response = await axios.get(`https://api.d-id.com/talks/${url}`, {
            headers: {
              accept: 'application/json',
              authorization:process.env.APP_DDI,
            },
   });
          
          console.log(response)
          console.log(response.data?.result_url)
          
          setVideo(response.data?.result_url);  // Call a function to handle the video saving process.

          // const response2 = await axios.post('http://localhost:3001:user/update',email);
          


          // if (response2.status === 201) {
          //   console.log("User data updated:", response2.data);
          // } else {
          //   console.error("Failed to update user data, status code:", response2.status);
          //   setError("Error updating user data.");
          // }

      }

       catch(err){

      setError(err)

      }
          
  }

  return {
    image,
    audio,
    video,
    gptimage,
    prompt,
    voiceType,
    isGenerating,
    isMakingVideo,
    voice,
    audioprompt,
    url,
    error,
    setError,
    viewVideo,
    setVoiceType,
    setImage,
    setAudio,
    setGptImage,
    handleImageUpload,
    handlePromptChange,
    generateImage,
    handleaudionPromptChange,
    createVideo,
    handleAudioUpload,
    setVoice
  };
}
