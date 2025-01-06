import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStatus } from '../Logichandle/Auth';

const BotConfig = () => {
  const navigate = useNavigate();
  const email = getStatus();

  const [formData, setFormData] = useState({
    name: 'Percy Verence',
    nickname: 'Percy Verence',
    shortBio: 'ex. A friendly wizard with round glasses',
    avatar: '/api/placeholder/192/192', // Default placeholder
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true); // Show loading state
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/chat/save`, {
        name: formData.name,
        nickname: formData.nickname,
        shortBio: formData.shortBio,
        email:email,
        avatar: formData.avatar, // Include avatar URL in payload
      });

      if (!response || response.status !== 201) {
        throw new Error('Failed to save bot configuration');
      }

      alert('Bot saved successfully!');
      navigate('/chat');
    } catch (error) {
      console.error('Error saving bot:', error);
      alert('Error saving bot configuration.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-gray-300 text-lg font-medium">BASIC</h1>
        <button className="flex items-center gap-2 text-gray-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Documentation
        </button>
      </div>

      <div className="flex gap-8">
        <div className="w-48 h-48 bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={formData.avatar}
            alt="Character Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Name</label>
            <p className="text-xs text-gray-500">The name displayed on the character card</p>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-900 rounded-lg p-2 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Nickname</label>
            <p className="text-xs text-gray-500">The name your friends refer to you by in conversation</p>
            <input
              type="text"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              className="w-full bg-gray-900 rounded-lg p-2 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Short Bio</label>
            <p className="text-xs text-gray-500">The description displayed on the Character Card</p>
            <input
              type="text"
              value={formData.shortBio}
              onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
              className="w-full bg-gray-900 rounded-lg p-2 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Avatar URL</label>
            <p className="text-xs text-gray-500">Provide the link to the avatar image</p>
            <input
              type="text"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              className="w-full bg-gray-900 rounded-lg p-2 text-white"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className={`w-full bg-blue-600 rounded-lg p-2 text-white hover:bg-blue-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotConfig;
