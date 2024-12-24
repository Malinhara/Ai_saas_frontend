import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Handle Google Sign-In
  const handleGoogleSignIn = (response) => {
    try {
      // Decode the JWT token to extract the email
      const decoded = jwtDecode(response?.credential);
      const userEmail = decoded?.email; // Extract email from the decoded token

      if (userEmail) {
        // Call the Login function if email is found
        Login(userEmail);
      } else {
        throw new Error("Email not found in the response");
      }
    } catch (err) {
      console.error("Error decoding JWT: ", err.message);
      setError("Failed to log in with Google.");
    }
  };

  // Send Verification Code to the email after successful Google login
  const Login = async (userEmail) => {
    try {
      const response = await axios.post(
        `https://ai-saas-backend-teal.vercel.app/user/google-login`,
        { email: userEmail, password: "1234" }
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed.";
      setError(errorMessage);
    }
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:"367800385600-hj8iebmm3rh5nok8jhfvlfjcgikoku16.apps.googleusercontent.com",
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
  }, []); // No dependency on handleGoogleSignIn to avoid circular reference

  return (
    <>
      <div id="googleSignInDiv" className="mb-4"></div>
      {error && <p className="text-red-500 text-sm align-middle">{error}</p>}
    </>
  );
}
