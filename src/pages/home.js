import ImageGalleryPage from "../components/gallery";
import Card from "../components/serviceCard";
import VideoLayout from "../components/VideoLayout";

export default function Home() {
    return (
      <>
        <div className="relative isolate px-6 pt-14 lg:px-8" style={{
    background: "linear-gradient(to right, white, #b3d7f8 50%, white)",
  }}>
         
          <div className="mx-auto max-w-2xl py-16 sm:py-16 lg:py-16 relative z-10">
            <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl text-center">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-600">
        A
       </span>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-600">
        I
      </span>
      <span className="ml-4">Image Talking Maker</span>
         </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-600 sm:text-xl/8">
                Create a Digital Clone of Yourself with Our AI Avatar Generator.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">

                <a href="#"  className="rounded-lg bg-indigo-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Create Free Talk Image<span aria-hidden="true"> →</span>
                </a>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: '100%',display: 'flex',justifyContent: 'center', alignItems: 'center',borderRadius:'10px' }}>
       <video
       autoPlay
       className="object-cover h-full w-half xl:rounded-2xl rounded-2xl"
       loop
       muted
       width="80%"
        height="80%"
        poster="https://assets-static.invideo.io/images/large/Headerwebv30_c4ecb2a66f.webp"
         style={{ height: '100%' }}
        >
        <source
         src="https://assets-static.invideo.io/files/Invideo_Demo_HP_18_10_2024_V001_1921f1aee3.mp4"
        type="video/mp4"
        />
      Your browser does not support the video tag.
    </video>
   </div>
   
      <Card/>


      <VideoLayout/> 
        <ImageGalleryPage/>
        </div>
      </>
    );
  }
  
