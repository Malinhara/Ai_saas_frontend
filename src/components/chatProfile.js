import axios from 'axios';
import { getStatus } from '../Logichandle/Auth';

// Function to fetch user data from the server using GET
const fetchUserData = async () => {
    try {
        const email = getStatus(); // Get email from localStorage or context
        // Using GET method, email is passed as query parameter
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/chat/profile`, {
            params: { email }, // Email is sent as a query parameter
        });
        const data = response.data;

        if (data.success) {
            console.log(data)
            localStorage.setItem('agent',1)
            return data.data; // Return the fetched user data
        } else {
            console.error(data.message);
            return {}; // Return empty object on failure
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return {}; // Return empty object on error
    }
};


const fetchAgentData = async () => {
    try {
        // Using GET method to fetch the agent data
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/agents`); // Replace this with your actual endpoint for agents

        const data = response.data;

        if (data.success) {
            return data.data; // Return the fetched agent data
        } else {
            console.error(data.message);
            return []; // Return empty array on failure
        }
    } catch (error) {
        console.error('Error fetching agent data:', error);
        return []; // Return empty array on error
    }
};

export { fetchUserData,fetchAgentData  };

