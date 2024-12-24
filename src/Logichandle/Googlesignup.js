import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from '../config';

export default function Googlesignup() {

 const navigate = useNavigate(); 
 const [error,setError] = useState("");


  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLEID,
      callback: handleGoogleSignIn,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      {
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "pill",
      }
    );
  }, []);

  // Handle Google Sign-In
  const handleGoogleSignIn = (response) => {
    try {
      // Decode the JWT token to extract the email
      const decoded = jwtDecode(response?.credential);
      const userEmail = decoded?.email; // Extract email from the decoded token

      if (userEmail) {
        // Call the Register function if email is found
        Register(userEmail);
      } else {
        throw new Error('Email not found in the response');
      }
    } catch (err) {
      console.error('Error decoding Google token:', err.message);
    }
  };

  // Send Verification Code to the email after successful Google login
  const Register = async (userEmail) => {
    try {
   // Send the email to your API to trigger the verification code
      const response = await axios.post(`${BACKEND_URL}/user/google-register`, { email: userEmail, password: '1234', code: '22344' });

      if (response.status === 201) {
        
        navigate('/signin')

      } 
    } catch (err) {

     const errorMessage = err.response?.data?.error // Use the error message from the server response
      setError(errorMessage);
    }
  };

  return (
    <>
     <div id="googleSignInDiv" className="mb-4"></div>
    {error && <p className="text-red-500 text-sm  align-middle">{error}</p>}
    
    </>
 
  );
}
