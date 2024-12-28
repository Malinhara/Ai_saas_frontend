

// Alert.js
export default function Info({ onClose }) {


    return (
      <>
        {/* Backdrop for the blur effect */}
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"></div>
  
        {/* The alert box */}
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800 w-96">
            <div className="flex items-center">
              <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <h3 className="text-lg font-medium">info alert</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">
            Please wait some time to generate the video if not come at once please click again to "view video button"
            </div>
            <div className="flex justify-end">
  <button 
    onClick={onClose}
    type="button" 
    className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800 mr-2" // Added margin-right here
  >
    Dismiss
  </button>
  
  
</div>

          </div>
        </div>
      </>
    );
  }
  