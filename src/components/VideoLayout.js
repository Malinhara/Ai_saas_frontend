import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VideoLayout = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    const video = document.getElementById('mainVideo');
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Text Section */}
          <div className="lg:w-1/2 p-8 flex flex-col justify-center">
            <div className="text-sm text-blue-600 font-semibold mb-4">
              AI VOICEOVERS & TRANSLATIONS
            </div>
            <h1 className="text-4xl font-bold mb-6 text-navy-900">
              Turn text into high-quality voiceovers with one click
            </h1>
            <div className="space-y-4">
              {[
                'Get consistent voiceovers in over 80 languages',
                'High quality Presenters',
                'Many voice types'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <Link 
            to="/createHqavatar" // Link to the desired route
            className="mt-8 inline-flex items-center px-4 py-2 rounded-lg border border-gray-400 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
              Test it
           <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
             </Link>
          </div>

          {/* Right Video Section */}
          <div className="lg:w-1/2 relative">
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
            <video
            id="mainVideo"
            className="w-2/3 h-auto object-cover"
             src="/upload/talkingPreview.mp4"
               playsInline
               loop
               onClick={handlePlayPause}
              />
        
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLayout;