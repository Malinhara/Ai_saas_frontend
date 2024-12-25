import { useState } from "react";
import { HqMediaHandler } from "../Logichandle/hqmediahandler";
import Alert from "../components/alertBtn";
import Alertgenerate from "../components/alertGenerate";
import Alertstatus from "../components/alertstatus";

export default function CreateAvatar() {

  const [audioMode, setAudioMode] = useState("generate"); // Manage audio mode
  const [uploadaudio,setUploadaudio] = useState();


  const handleCloseAlert = () => {
    setError(null); // Close the alert by resetting the error state
  };
  // const [audioMode, setAudioMode] = useState("generate"); // Manage audio mode


  const {
    voice,
    audio,
    video,
    voiceType,
    isGenerating,
    presenter,
    presenterimg,
    presenters,
    isMakingVideo,
    setPresenter,
    audioprompt,
    error,
    url,
    setError,
    viewVideo,
    setVoiceType,
    handleaudionPromptChange,
    createVideo,
    handleAudioUpload,
  } = HqMediaHandler();



  return (
    <>
      <div className="container mx-auto px-6 py-36 min-h-screen" style={{
    background: "linear-gradient(to right, white, #b3d7f8 50%, white)",}}>
        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
            AI-Driven Creativity Tools
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into stunning visuals, engaging audio, and
            captivating videos with Image AI King.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
  <div className="bg-slate-50 rounded-xl shadow-xl p-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Select Premium Presenter</h2>
  
      <label className="text-black font-semibold">Choose Presenter</label>
      <select
  id="presenter"
  value={presenter}
  onChange={(e) => setPresenter(e.target.value)} // Save the selected presenter ID
  className="w-full mt-4 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
>
  {presenters.length === 0 ? (
    <option>Loading Presenters...</option> // Handle the loading state
  ) : (
    presenters.map((p) => (
      <option key={p.presenter_id} value={p.presenter_id}>
        {p.name} {p.language ? `- ${p.language}` : ""} {/* Handle missing language */}
      </option>
    ))
  )}
</select>
{presenterimg && (
  <div className="w-full max-w-4xl mx-auto mt-4">
    <video
      className="w-full h-80 rounded-lg shadow-lg"
      controls
      src={presenterimg}
      alt="Presenter Video"
    >
      Your browser does not support the video tag.
    </video>
  </div>
)}

     </div>

          {/* Right Column - Audio Tools */}
  <div className="bg-slate-50 rounded-xl shadow-xl p-8">
  <h2 className="text-3xl font-bold text-gray-800 mb-4">
    Audio Tools
  </h2>
  <p className="text-gray-600 mb-6">
    {audioMode === "generate"
      ? "Convert text into lifelike audio."
      : "Upload an audio file to use."}
  </p>

  {/* Mode Toggle */}
  <div className="flex space-x-4 mb-6">
    <button
      className={`px-4 py-2 rounded-lg shadow-md ${
        audioMode === "generate" ? "bg-indigo-600 text-white" : "bg-gray-200"
      }`}
      onClick={() => setAudioMode("generate")}
    >
      Generate Audio
    </button>
    <button
      className={`px-4 py-2 rounded-lg shadow-md ${
        audioMode === "upload" ? "bg-indigo-600 text-white" : "bg-gray-200"
      }`}
      onClick={() => setAudioMode("upload")}
    >
      Upload Audio
    </button>
  </div>

  {/* "Generate Audio" Mode */}
  {audioMode === "generate" ? (
    <>
      <textarea
        value={audioprompt}
        onChange={handleaudionPromptChange}
        placeholder="Type the text you want to convert..."
        className="w-full h-32 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      ></textarea>
      <label className="text-black font-semibold">Choose Voice</label>
      <select
        id="voiceType"
        value={voiceType}
        onChange={(e) => setVoiceType(e.target.value)}
        className="w-full mt-4 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
      >
        {voice.length === 0 ? (
          <option>Loading Voices...</option>
        ) : (
          voice.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} -{" "}
              {v.languages.map((lang) => lang.language).join(", ")}
            </option>
          ))
        )}
      </select>
    </>
  ) : (
    // "Upload Audio" Mode
    <>
      <input
        type="file"
        id="audioUpload"
        accept="audio/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            // Set the preview URL
            const reader = new FileReader();
            reader.onload = (event) => {
              setUploadaudio(event.target.result); // Preview the audio file
            };
            reader.readAsDataURL(file);

            // Call handleAudioUpload with the file
            handleAudioUpload(file);
          }
        }}
        className="w-full bg-white border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
      />
    </>
  )}

  {/* Show Audio Preview and Download Link */}
  {(audioMode === "generate" && "") || (audioMode === "upload" && uploadaudio) ? (
    <div className="mt-6">
      <audio
        controls
        src={audioMode === "generate" ? audio : uploadaudio} // Display uploaded audio or the generated audio
        className="w-full rounded-lg shadow-md"
      >
        Your browser does not support the audio element.
      </audio>
      <a
        href={audioMode === "generate" ? audio : uploadaudio}
        download="uploaded-audio.mp3"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md mt-4 inline-block text-center hover:bg-blue-500 transition duration-300"
      >
        Download Audio
      </a>
    </div>
  ):null}
           
          </div>
        </div>

        {/* Video Tools */}
  <div className="mt-4">
<div className="flex flex-col items-center">
 

      {/* Make Video Button */}

      {( (audio ) || (audioprompt && voiceType) ) && (
     <button
    onClick={() => createVideo(audioMode)}
    className="w-60 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md mt-4 hover:bg-indigo-500 transition duration-300"
    disabled={isMakingVideo} // Disable while video is being created
    >
    {isMakingVideo ? "Making Video..." : "Make Video"}
  </button>
    )}

         {error && error === 402 && <Alertgenerate onClose={handleCloseAlert} />}

         {error && error === 401 && <Alert onClose={handleCloseAlert} />}
         {error && error === 405 && <Alertstatus onClose={handleCloseAlert} />}

     
        {url && ( 
          <button
          onClick={viewVideo} // Trigger the viewVideo function on click
          className="w-60 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md mt-4 hover:bg-indigo-500 transition duration-300">
          View Video
        </button>
      )}

     </div>

      {video !== "" && (
        <video controls src={video} className="w-full rounded-lg shadow-md mt-4" />
      )}

      <div className="flex flex-col items-center mt-6">
        {/* Only display the download link if the video is available */}
        {video && (
          <a
            href={video}
            download="video.mp4"
            className="w-60 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md mt-4 text-center hover:bg-indigo-500 transition duration-300"
          >
            Download Video
          </a>
        )}
      </div>


</div>


      </div>
    </>
  );
}

