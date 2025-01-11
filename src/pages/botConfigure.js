import axios from 'axios';
import { Upload } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhantomWallet from '../components/wallet';
import { getStatus } from '../Logichandle/Auth';

const BotConfig = () => {
  const email = getStatus();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const openModal = () => setIsModalOpen(true); // Function to open the modal
  const closeModal = () => setIsModalOpen(false); // Function to close the modal

  const [formData, setFormData] = useState({
    name: 'Percy Verence',
    nickname: 'Percy Verence',
    tickerName: '',
    age: 18,
    shortBio: 'ex. A friendly wizard with round glasses',
    avatar: null, // Updated to store file instead of URL
    description: '',
    personality: '',
    firstMessage: '',
    lore: '',
    style: '',
    adjectives: '',
    knowledge: '',
  });



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) { // 2 MB size limit
        alert('File size exceeds 2 MB.');
        return;
    }
    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Only JPEG or PNG files are allowed.');
        return;
    }
    setFormData({ ...formData, avatar: file });
};

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('nickname', formData.nickname);
      payload.append('shortBio', formData.shortBio);
      payload.append('email', email);
      payload.append('tickerName', formData.tickerName);
      payload.append('age', formData.age);
      payload.append('avatar', formData.avatar); // Append the file
      payload.append('description', formData.description);
      payload.append('personality', formData.personality);
      payload.append('firstMessage', formData.firstMessage);
      payload.append('lore', formData.lore);
      payload.append('style', formData.style);
      payload.append('adjectives', formData.adjectives);
      payload.append('knowledge', formData.knowledge);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/chat/save`,
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (!response || response.status !== 201) {
        throw new Error('Failed to save bot configuration');
      }

      alert('Bot saved successfully!');

      navigate('/chat');
    } catch (error) {
      console.error('Error saving bot:', error);
      alert('Error saving bot configuration.');
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (label, field, description = '', type = 'text') => (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      {description && <p className="text-xs text-gray-500">{description}</p>}
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
        className="w-full bg-gray-900 rounded-lg p-2 text-white"
      />
    </div>
  );

  const renderTextarea = (label, field, description = '') => (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      {description && <p className="text-xs text-gray-500">{description}</p>}
      <textarea
        value={formData[field]}
        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
        className="w-full bg-gray-900 rounded-lg p-2 text-white min-h-24"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-gray-300 p-16">
  <div className="flex justify-end items-center mb-6 sm:mb-11 mt-5">
  <button
    onClick={openModal}
    className="bg-blue-600 text-white px-4 py-1 rounded-md sm:mr-12"
  >
    Phantom
  </button>

  {isModalOpen && (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-sm sm:w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Phantom Wallet</h2>
          <button onClick={closeModal} className="text-gray-500">
            X
          </button>
        </div>
        <PhantomWallet />
      </div>
    </div>
    )}
   </div>

      <div className="space-y-8">
        {/* Identity Section */}
        <section className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-6">Identity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {renderInput('AI AGENT NAME', 'name')}
              {renderInput('TICKER NAME', 'tickerName', 'This field is required')}
              {renderInput('AI AGENT AGE', 'age', 'Minimum age is 18', 'number')}

              <div className="space-y-2">
                <label className="block text-sm font-medium">AI AGENT IMAGE</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2">Click to upload or drag and drop</p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-2 block w-full text-xs text-gray-500"
                    accept=".jpg, .jpeg, .png, .gif"
                  />
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personality Section */}
        <section className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-6">Personality</h2>
          <div className="space-y-6">
            {renderTextarea('DESCRIPTION', 'description', 'Write a brief overview of your AI Agent.')}
            {renderTextarea('PERSONALITY', 'personality', 'Describe your AI Agent traits, behavior and demeanor.')}
            {renderTextarea('FIRST MESSAGE', 'firstMessage', 'Write the first message your AI Agent will send.')}
            {renderInput('LORE', 'lore', "Write lore about your agent. Separate by ,'s")}
            {renderInput('STYLE', 'style', "Write your agent's response style. Separate by ,'s")}
            {renderInput('ADJECTIVES', 'adjectives', "Give your agent some adjectives. Separate by ,'s")}
            {renderInput('KNOWLEDGE', 'knowledge', "Give your agent some knowledge. Separate by ,'s")}
          </div>
        </section>

        <div className="space-y-4">
          {saveStatus && (
            <div
              className={`p-4 rounded-lg ${
                saveStatus.includes('Error') ? 'bg-red-900' : 'bg-green-900'
              }`}
            >
              {saveStatus}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={loading}
            className={`w-full bg-blue-600 rounded-lg p-3 text-white hover:bg-blue-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating agent...' : 'Create Agent'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotConfig;
