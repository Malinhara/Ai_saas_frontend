export default function Card() {
    return (
      <>
        <div className="overflow-hidden py-24 sm:py-32" style={{
    background: "linear-gradient(to right, white, #b3d7f8 50%, white)",
  }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {/* Left Section */}
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">

                  <p className="mt-2 text-4xl  tracking-tight text-gray-900 sm:text-5xl font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-800 font-bold">Avatar </span> Video Generation With AI
                  </p>
                  <p className="mt-6 text-lg text-gray-600 ">
                  Avatar Video Generation with AI uses artificial intelligence to create realistic, animated avatars that mimic human expressions
                   and speech, enabling users to generate personalized video content easily and efficiently.
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base text-gray-600 lg:max-w-none">
                    {/* Feature 1 */}
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <svg
                        className="h-5 w-5 text-indigo-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <circle cx="10" cy="10" r="9" fill="currentColor" />
                      </svg>
                    </div>
                        Realistic Animation:
                      </dt>
                      <circle cx="10" cy="10" r="9" fill="currentColor" />
                      <dd className="inline">
                      AI creates lifelike avatars that can mimic human expressions, gestures, and speech.
                      </dd>
                    </div>
                    {/* Feature 2 */}
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <svg
                        className="h-5 w-5 text-indigo-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <circle cx="10" cy="10" r="9" fill="currentColor" />
                      </svg>
                    </div>
                       Fast and Efficient:
                      </dt>
                      <dd className="inline">
                      Users can generate videos by simply providing text, audio, or visual input for tailored video content.
                      </dd>
                    </div>
                    {/* Feature 3 */}
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <svg
                        className="h-5 w-5 text-indigo-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <circle cx="10" cy="10" r="9" fill="currentColor" />
                      </svg>
                    </div>
                        Realistic Animation:
                      </dt>
                      <circle cx="10" cy="10" r="9" fill="currentColor" />
                      <dd className="inline">
                      AI creates lifelike avatars that can mimic human expressions, gestures, and speech.
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              {/* Right Section */}
              <video
                className="object-cover h-full w-full xl:rounded-3xl rounded-2xl"
                autoPlay
                muted
                playsInline
                preload="auto"
                loop
                poster="https://assets-static.invideo.io/images/large/Default_pic_2641255902.webp"
              >
                <source
                  src="https://assets-static.invideo.io/files/Gen_AI_site_2_3da134c8cc.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </>
    );
  }
  
