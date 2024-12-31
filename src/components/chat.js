import axios from 'axios';
import React, { useState } from 'react';
import { getStatus } from '../Logichandle/Auth';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const email = getStatus();

  const handleChat = async () => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/user/chat`,
            {
                input: userInput,
                email
            }
        );

        if (response.status === 200) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'user', text: userInput },
                { sender: 'bot', text: response.data.message },
            ]);
            setUserInput(''); // Clear the input field
        } else {
            alert('Error: ' + response.data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while communicating with the chatbot.');
    }
};


  return (
    <div className="flex-1 flex flex-col mt-16 p-4 md:mt-32">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded max-w-xs md:max-w-md ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-200 text-black self-start'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-1 p-2 border rounded-l text-sm md:text-base"
        />
        <button
          onClick={handleChat}
          className="px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600 text-sm md:text-base"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
