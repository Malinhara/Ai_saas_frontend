import { useState } from "react";
import { useMediaHandler } from "../Logichandle/mediaHandler";
import Alert from "../components/alertBtn";
import Alertstatus from "../components/alertstatus";

export default function Talkimage() {
  const [imageMode, setImageMode] = useState("generate"); // Manage image mode
  const [audioMode, setAudioMode] = useState("generate"); // Manage audio mode
  
  const [uploadimage, setuploadimage] = useState(); // Manage audio mode
  const [uploadaudio,setUploadaudio] = useState();


  const handleCloseAlert = () => {
    setError(null); // Close the alert by resetting the error state
  };
  // const [audioMode, setAudioMode] = useState("generate"); // Manage audio mode


  const {
    voice,
    gptimage,
    audio,
    image,
    video,
    prompt,
    voiceType,
    isGenerating,
    isMakingVideo,
    audioprompt,
    error,
    setError,
    url,
    viewVideo,
    setVoiceType,
    handleImageUpload,
    handlePromptChange,
    handleaudionPromptChange,
    generateImage,
    createVideo,
    handleAudioUpload,
  } = useMediaHandler();


  console.log("image",imageMode,"audio",audioMode)
  // Fetch available voices for TTS
 

  return (
    <>
      <div className="container mx-auto px-6 py-36 min-h-screen" style={{
    background: "linear-gradient(to right, white, #b3d7f8 50%, white)",
  }}>
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
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Image Tools</h2>
    <p className="text-gray-600 mb-6">
      {imageMode === "generate"
        ? "Generate AI-powered images from your ideas."
        : "Upload your own image to enhance."}
    </p>

    <div className="flex space-x-4 mb-6">
      <button
        className={`px-4 py-2 rounded-lg shadow-md ${
          imageMode === "generate" ? "bg-indigo-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => setImageMode("generate")}
      >
        Generate Image
      </button>
      <button
        className={`px-4 py-2 rounded-lg shadow-md ${
          imageMode === "upload" ? "bg-indigo-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => setImageMode("upload")}
      >
        Upload Image
      </button>
    </div>

    {imageMode === "generate" ? (
      <>
        <textarea
          id="prompt"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Describe your idea..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        ></textarea>
        <button
          onClick={generateImage}
          disabled={isGenerating}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md mt-4 hover:bg-indigo-500 transition duration-300"
        >
          {isGenerating ? "Generating..." : "Generate Image"}
        </button>
      </>
    ) : (
      <>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              // Update the preview using FileReader
              const reader = new FileReader();
              reader.onload = (event) => {
                setuploadimage(event.target.result); // Set the preview image
              };
              reader.readAsDataURL(file);

              // Call handleImageUpload with the file
              handleImageUpload(file);
            }
          }}
          className="w-full bg-white border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </>
    )}

    {/* Conditional rendering for image preview based on imageMode */}
    {(imageMode === "generate" && gptimage) || (imageMode === "upload" && uploadimage) ? (
      <div className="mt-6">
        <img
          src={imageMode === "generate" ? gptimage : uploadimage}
          alt="Generated or Uploaded"
          className="w-full rounded-lg shadow-md"
        />
        {/* <a
          href={imageMode === "generate" ? gptimage : uploadimage}
          download="image.png"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md mt-4 inline-block text-center hover:bg-blue-500 transition duration-300"
        >
          Download Image
        </a> */}
      </div>
    ) : null}
         
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
  {(
    // Validation function for inputs
    (() => {
      const isImageValid =
        (imageMode === "generate" && gptimage && /^(https:\/\/)/.test(gptimage)) ||
        (imageMode === "upload" && image && /^(s3:\/\/)/.test(image));
      const isAudioValid =
        (audioMode === "generate" && audioprompt && audioprompt.trim() !== "") ||
        (audioMode === "upload" && audio && /^(s3:\/\/)/.test(audio));
      return isImageValid && isAudioValid;
    })() ? (
      <>
        {/* Make Video Button */}
        <button
          onClick={() => createVideo(imageMode, audioMode)}
          className="w-60 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md mt-4 hover:bg-indigo-500 transition duration-300"
          disabled={isMakingVideo} // Disable while video is being created
        >
          {isMakingVideo ? "Making Video..." : "Make Video"}
        </button>

        {/* Display alerts if there are errors */}
        {error && error === 401 && <Alert onClose={handleCloseAlert} />}
        {error && error === 405 && <Alertstatus onClose={handleCloseAlert} />}
      </>
    ) : (
      // Information Button (Waiting or Uploading)
      <button
        disabled
        className="w-60 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md mt-4 cursor-not-allowed"
      >
        {imageMode === "upload" && (!image || !/^(s3:\/\/)/.test(image))
          ? "Waiting for image upload..."
          : audioMode === "upload" && (!audio || !/^(s3:\/\/)/.test(audio))
          ? "Waiting for audio upload..."
          : "Waiting for inputs..."}
      </button>
    )
  )}

  {url && ( 
          <button
          onClick={viewVideo} // Trigger the viewVideo function on click
          className="w-60 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md mt-4 hover:bg-indigo-500 transition duration-300">
          View Video
        </button>
      )}
</div>




      {/* Only display the video if the video URL is set */}
      {video !== ""&& (
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

