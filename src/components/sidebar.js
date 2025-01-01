import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineClockCircle, AiOutlineMenu, AiOutlineTwitter } from 'react-icons/ai';
import Modal from 'react-modal';
import { getStatus } from '../Logichandle/Auth';

Modal.setAppElement('#root');

const Sidebar = () => {
  const [isTwitterModalOpen, setTwitterModalOpen] = useState(false);
  const [isTweetModalOpen, setTweetModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const email = getStatus();


  const [credentials, setCredentials] = useState({
    appKey: '',
    appSecret: '',
    accessToken: '',
    accessSecret: '',
  });

  const [tweet, setTweet] = useState('');
  const [schedule, setSchedule] = useState('Just Now');
  const [personality, setPersonality] = useState('');


  const handleTwitterSubmit = async () => {
    try {


      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/twitter`, {
        credentials,
        email
      });
  
      const data = response.data; // Access the response data directly
  
      if (response.status === 201) { // Check for success based on status code
        alert('Twitter connected successfully!');

      } else {
        alert('Failed to connect Twitter: ' + data.message);
      }
    } catch (error) {
    
  
      // Handle errors from Axios
      if (error.response) {
    
        alert('Failed to connect Twitter: ' + error.response.data.message);
      } else if (error.request) {
       
        alert('No response from server. Please try again later.');
      } else {
       
        alert('An error occurred while connecting to Twitter.');
      }
    } finally {
      setTwitterModalOpen(false);
    }
  };
  

  const handleSendTweet = async () => {
    try {
      // Send POST request using axios
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/twitter/post`, {
        tweet,
        schedule,
        email,
      });
  
      // `axios` response data is already parsed, so you can use `response.data`
      const data = response.data;
  
      if (response.status === 201) {
        alert('Tweet sent successfully!');
        console.log('Tweet sent:', data);
      } else {
        alert('Failed to send tweet: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the tweet.');
    } finally {
      // Clear input fields and close modal
      setTweet('');
      setSchedule('Just Now');
      setTweetModalOpen(false);
    }
  };
  
//   const handleChatSubmit = async () => {
//     try {
//         const response = await axios.post(
//             `${process.env.REACT_APP_BACKEND_URL}/user/chat/personality`,
//             {
//                 personality,
//                 email
//             }
//         );

//         // No need to use response.json() as `axios` parses JSON by default
//         if (response.status === 201) {
//             alert('submitted successfully!');
//             console.log('Chat response:', response.data); // Log the actual response data
//         } else {
//             alert('Failed to send chat: ' + response.data.message);
//         }
//     } catch (error) {
//         console.error('Error:', error);

//         // Improved error handling to show server response if available
//         if (error.response && error.response.data && error.response.data.message) {
//             alert('An error occurred: ' + error.response.data.message);
//         } else {
//             alert('An unexpected error occurred while submitting the chat.');
//         }
//     }
// };


  return (
    <>
      {/* Menu Button for Mobile */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md md:hidden"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <AiOutlineMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 p-4 border-r border-gray-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:relative md:translate-x-0 md:w-1/4`}
      >
        <h2 className="text-lg font-bold mb-4 mt-20">Options</h2>
        <button
          onClick={() => setTwitterModalOpen(true)}
          className="flex items-center gap-2 w-full px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <AiOutlineTwitter /> Connect to Twitter
        </button>
        <button
          onClick={() => setTweetModalOpen(true)}
          className="flex items-center gap-2 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <AiOutlineClockCircle /> Send and Schedule Tweet
        </button>
{/* 
        <h2 className="text-lg font-bold mb-4 mt-20">Enter Personality</h2>
        <input
          type="text"
          placeholder="Enter Personality"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          className="block w-full p-2 border rounded-md"
        /> */}
        <br />
        {/* <button
          onClick={handleChatSubmit}
          className="flex items-center gap-2 w-20 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit
        </button> */}

        <h2 className="text-lg font-bold mb-4 mt-20">How to Connect Twitter</h2>
           <a 
           href="https://drive.google.com/file/d/1-fpOH7NUbJ7rEqBpAFTwUO8KkMz4KjnL/view?usp=drive_link" 
           className="text-blue-500 underline"
           target="_blank"
            rel="noopener noreferrer"
           >
           Click here to view the guide
           </a>
        {/* Twitter Modal */}
        <Modal
          isOpen={isTwitterModalOpen}
          onRequestClose={() => setTwitterModalOpen(false)}
          className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto mt-20"
          overlayClassName="bg-gray-800 bg-opacity-50 fixed inset-0 flex items-center justify-center"
        >
          <h2 className="text-xl font-bold mb-4">Connect to Twitter</h2>
          <input
            type="text"
            placeholder="App Key"
            value={credentials.appKey}
            onChange={(e) =>
              setCredentials({ ...credentials, appKey: e.target.value })
            }
            className="w-full px-4 py-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="App Secret"
            value={credentials.appSecret}
            onChange={(e) =>
              setCredentials({ ...credentials, appSecret: e.target.value })
            }
            className="w-full px-4 py-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Access Token"
            value={credentials.accessToken}
            onChange={(e) =>
              setCredentials({ ...credentials, accessToken: e.target.value })
            }
            className="w-full px-4 py-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Access Secret"
            value={credentials.accessSecret}
            onChange={(e) =>
              setCredentials({ ...credentials, accessSecret: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded"
          />
          <button
            onClick={handleTwitterSubmit}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </Modal>

        {/* Tweet Modal */}
       <Modal
  isOpen={isTweetModalOpen}
  onRequestClose={() => setTweetModalOpen(false)}
  className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto mt-20"
  overlayClassName="bg-gray-800 bg-opacity-50 fixed inset-0 flex items-center justify-center"
>
  <h2 className="text-xl font-bold mb-4">Send or Schedule Tweet</h2>
  <textarea
    placeholder="Write your tweet here..."
    value={tweet}
    onChange={(e) => setTweet(e.target.value)}
    className="w-full px-4 py-2 mb-4 border rounded h-24"
  />
  <select
    value={schedule === 'Just Now' ? 'Just Now' : 'Custom'}
    onChange={(e) => {
      if (e.target.value === 'Just Now') {
        setSchedule('Just Now');
      } else {
        setSchedule(''); // Clear schedule to allow time picker input
      }
    }}
    className="w-full px-4 py-2 mb-4 border rounded"
  >
    <option value="Just Now">Just Now</option>
    <option value="Custom">Custom Time</option>
  </select>
  {schedule !== 'Just Now' && (
    <input
      type="time"
      value={schedule}
      onChange={(e) => setSchedule(e.target.value)}
      className="w-full px-4 py-2 mb-4 border rounded"
    />
  )}
  <button
    onClick={handleSendTweet}
    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
  >
    Submit
  </button>
   </Modal>
      </div>
    </>
  );
};

export default Sidebar;
