import { useState } from "react";

import axios from "axios";
import Googlesignup from "../Logichandle/Googlesignup";
import VerifyCode from "../Logichandle/Verifyregister";
import BACKEND_URL from "../config";

export default function Signin() {
  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  
  const handleSendVerificationCode = async (e) => {
    e.preventDefault();
  
    if (!email) {
      setError("Email is required.");
      return;
    }
  
    // Call API to send verification code using axios
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/send-verification-code`, { email});
  
      if (response.status !== 201) {
        throw new Error('Failed to send verification code.');
      }
  
      setShowVerifyCode(true);  // Show the verification code input after successful request
    } catch (err) {
      setError(err.response?.data?.message || err.message);  // Handle error from the response
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-32 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {showVerifyCode ? (
            <VerifyCode email={email} setError={setError} />
          ) : (
            <form className="space-y-6" onSubmit={handleSendVerificationCode}>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Send Verification code
                </button>
              </div>

              {/* Google Login Component */}
              <Googlesignup />

            </form>
          )}
        </div>
      </div>
    </>
  );
}
