import { Bot, ChevronRight, Clock, Search, Settings, TrendingUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConfig } from '../Logichandle/Auth';
import { fetchAgentData, fetchUserData } from './chatProfile';
import PhantomWallet from './wallet';

const AIMarketplace = () => {
  const [userData, setUserData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const openModal = () => setIsModalOpen(true); // Function to open the modal
  const closeModal = () => setIsModalOpen(false); // Function to close the modal
  const [agents, setAgents] = useState([]); // State to store the fetched agents

  useEffect(() => {
      const getAgentData = async () => {
          const data = await fetchAgentData(); // Fetch agent data
          setAgents(data); // Update state with the agent data
      };

      getAgentData(); // Call the function on component mount
  }, []); // Empty dependency array means this runs once on component mount

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserData();
      setUserData(data);

      // Show alert if userData is null or empty
      if (!data || Object.keys(data).length === 0) {
        setShowAlert(true);
      }
    };
    fetchData();
  }, []);

  getConfig();

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 mt-14">
      {/* Header Section with Gradient */}
      
      <div className="bg-gradient-to-r from-indigo-800 to-indigo-800 top-6 w-full z-10 shadow-lg ">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center md:text-sm">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          
          
          </h1>
          <div className='mt-6'>

      <button 
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
       Phantom 
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 max-w-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Phantom Wallet</h2>
              <button onClick={closeModal} className="text-gray-500">X</button>
            </div>
            <PhantomWallet />
          </div>
        </div>
      )}
    </div>
        </div>
      </div>

      {/* Alert Message */}
      {showAlert && (
       <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
       <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
         <h2 className="text-lg font-bold text-gray-800">Access Restricted</h2>
         <p className="text-gray-600 mt-2">
           You need to create a Agent.
         </p>
         <div className="mt-4 flex justify-end space-x-3">
           <button
             onClick={closeAlert}
             className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
           >
             Close
           </button>
           <Link
             to="/agentmanagment"
             className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
           >
             Create Agent
           </Link>
         </div>
       </div>
     </div>
      )}

      {/* Search Hero Section */}
      <div className="bg-gradient-to-b from-indigo-800 to-indigo-700 p-8 text-white -mt-10 shadow-xl">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold mb-2">Search for AI agents</h2>
          <p className="text-indigo-200 mb-6">Discover new tokens, trade memes</p>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for AI agents"
                className="w-full p-2 rounded-xl text-gray-800 pr-12 border-2 border-transparent focus:border-indigo-500 transition-all shadow-lg"
              />
              <Search className="absolute right-4 top-4 text-gray-400" />
            </div>
            <a href="/agentmanagment">
              <button className="bg-white text-red-500 px-8 py-2 rounded-xl font-semibold hover:bg-red-50 transition-all shadow-lg flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Create Agent
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="text-indigo-600" />
            My Dashboard
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Profile Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={userData?.avatar || '/default-avatar.png'}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full ring-4 ring-indigo-50"
                  />
                  <div>
                    <h3 className="font-bold text-xl">{userData?.name || 'Unknown Name'}</h3>
                    <p className="text-gray-500">{userData?.email || 'Unknown Email'}</p>
                  </div>
                </div>
                <button className="p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <Settings size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-xl">
                  <p className="text-sm text-indigo-600 font-medium">Total Value</p>
                  <p className="text-2xl font-bold text-indigo-900">$12,345</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-xl">
                  <p className="text-sm text-green-600 font-medium">Active Agents</p>
                  <p className="text-2xl font-bold text-green-900">1</p>
                </div>
              </div>
            </div>

            {/* Agent Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <Bot className="text-indigo-600" />
                  My Agent
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <img
                      src={userData?.avatar || '/default-avatar.png'}
                      alt="Agent Avatar"
                      className="w-12 h-12 rounded-full ring-2 ring-indigo-100"
                    />
                    <div>
                      <p className="font-semibold text-lg">{userData?.name || 'Unknown Agent'}</p>
                      <p className="text-gray-500">{userData?.nickname || 'No bio available'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                Active
              </span>
                     {userData && Object.keys(userData).length > 0 ? (
                   <a href="/chat" className="p-2 hover:bg-indigo-50 rounded-full transition-colors">
                     <ChevronRight size={20} className="text-indigo-600" />
                    </a>
                   ) : (
                 <span className="p-2 text-gray-400 rounded-full cursor-not-allowed">
                   <ChevronRight size={20} className="text-gray-400" />
                   </span>
                      )}
                 </div>

               
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Latest Agents */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="text-indigo-600" />
                Latest Agents
            </h2>
            <div className="space-y-4">
                {/* Display each agent */}
                {agents.length === 0 ? (
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-white rounded-xl"></div>
                ) : (
                    agents.map((agent) => (
                        <div key={agent.email} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-white rounded-xl">
                                    {agent.avatar ? (
                                        <img src={agent.avatar} alt={`${agent.name} avatar`} className="w-full h-full object-cover rounded-xl" />
                                    ) : (
                                        <span className="w-full h-full flex items-center justify-center text-white">{agent.name[0] || 'agent'}</span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold">{agent.name}</p>
                                    <p className="text-gray-500">{agent.nickname|| 'symbol'}</p>
                                </div>
                            </div>
                            <span className="text-gray-500">{agent.createdAt || 'just Now'}</span> {/* You can modify this timestamp logic */}
                        </div>
                    ))
                )}
            </div>
        </div>

          {/* Top Agents */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="text-indigo-600" />
              Top Agents
            </h2>
           {agents.map((agent) => (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-white rounded-xl"> <img src={agent.avatar} alt={`${agent.name} avatar`} className="w-full h-full object-cover rounded-xl" /></div>
                  <div>
                    <p className="font-semibold">{agent.name}</p>
                    <p className="text-gray-500">{agent.nickname|| 'symbol'}</p>
                  </div>
                </div>
                <span className="text-green-500 font-semibold">$12,345</span>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMarketplace;
