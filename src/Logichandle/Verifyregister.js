import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from '../config';

export default function VerifyCode({ email }) {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setCodeError] = useState("");
  const navigate = useNavigate(); 

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!code) {
      setCodeError("Verification code is required.");
      return;
    }

    if (!password) {
      setCodeError("Password is required.");
      return;
    }

    if (!email) {
      setCodeError("Email is required.");
      return;
    }

    try {
      // Send verification code and password to the server for verification
      const response = await axios.post(`${BACKEND_URL}/user/register`, { email, code, password });

      if (response.status == 201) {

          navigate('/signin')
      }
      setCodeError(""); // Clear any previous error
    } catch (err) {
      // Handle error response
      const errorMessage = err.response?.data?.error // Use the error message from the server response
      setCodeError(errorMessage); // Set the error message
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleVerifyCode}>
      <div>
        <label htmlFor="code" className="block text-sm/6 font-medium text-gray-900">Verification code</label>
        <div className="mt-2">
          <input
            type="text"
            name="code"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
        <div className="mt-2">
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Register
        </button>
      </div>
    </form>
  );
}
