import { Camera, Download, Share2 } from 'lucide-react';
import React from 'react';

const ImageGalleryPage = () => {
  const images = [
    { id: 1, url: '/upload/ai-generated-7868242_1280.webp'},
    { id: 2, url: '/upload/ai-generated-8021008_1280.webp' },
    { id: 3, url: '/upload/ai-generated-8060640_1280.webp'},
    { id: 4, url: '/upload/OIP(14).webp' },
    { id: 5, url: '/upload/OIP(15).webp' },
    { id: 6, url: '/upload/OIP(16).webp'},
    { id: 7, url: '/upload/Screenshot.jpg' },
    { id: 8, url: '/upload/ai-generated-9249559_1280.webp'}
  ];

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8" style={{
      background: "linear-gradient(to right, white, #b3d7f8 50%, white)",
    }}>
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Camera className="w-10 h-10 text-pink-400 animate-pulse" />
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            AI Gallery
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group bg-gray-900/60 backdrop-blur-sm border border-gray-800 hover:border-purple-500 transition-all duration-300 rounded-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={image.url}
                  className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-end gap-2">
                   
                  </div>
                </div>
              </div>
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryPage;
