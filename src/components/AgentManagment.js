import { Plus, RefreshCw, Users } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AgentManagement = () => {
  const navigate = useNavigate();

  const handleCreateAgent = () => {
    navigate('/botconfigure');
  };

  const handleUpdateAgent = () => {
    navigate('/botconfigure'); // Replace with the correct path for updating an agent
  };

  const handleExistingAgent = () => {
    navigate('/chat');
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 mt-40 h-96">
      <div className="space-y-4">
        <button
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={handleCreateAgent}
        >
          <Plus size={20} />
          Create New Agent
        </button>

        <button
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
          onClick={handleUpdateAgent}
        >
          <RefreshCw size={20} />
          Update Agent
        </button>

        <button
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
          onClick={handleExistingAgent}
        >
          <Users size={20} />
          Already Created
        </button>
      </div>
    </div>
  );
};

export default AgentManagement;
