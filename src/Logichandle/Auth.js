import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export const getConfig = () => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  if (!token) {
    console.error("Token not found");
    return {error: true};
  }

  // Decode the JWT token to get user information (including 'status')
  const decodedToken = jwtDecode(token);
 // Get 'status' from the decoded token
  const email = decodedToken?.email;


  localStorage.setItem('email', email); // Save status in localStorage or use state management (Redux, context, etc.)

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getStatus = () => {
 // Retrieve status from localStorage
  const email = localStorage.getItem('email');
  return email ;; // Return the stored status
};

const PrivateRoute = ({ children }) => {
  const agent = localStorage.getItem('agent'); // Check if 'agent' exists in localStorage

  if (!agent) {
    // Redirect if 'agent' is not set or invalid
    return <Navigate to="/aImarketplace" replace />;
  }

  return children;
};

export default PrivateRoute;
