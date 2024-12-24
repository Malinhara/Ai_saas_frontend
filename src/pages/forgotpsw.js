// import { useState } from "react";

// export default function ForgotPassword() {
//   const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Confirm Code, Step 3: Reset Password
//   const [email, setEmail] = useState("");
//   const [code, setCode] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const handleEmailSubmit = (e) => {
//     e.preventDefault();
//     console.log("Email submitted:", email);
//     // Send email to backend to trigger sending confirmation code
//     setStep(2); // Move to step 2
//   };

//   const handleCodeSubmit = (e) => {
//     e.preventDefault();
//     console.log("Code submitted:", code);
//     // Verify the code with the backend
//     setStep(3); // Move to step 3
//   };

//   const handlePasswordReset = (e) => {
//     e.preventDefault();
//     console.log("New password submitted:", newPassword);
//     // Send new password to backend to reset it
//     alert("Password has been reset successfully!");
//     setStep(1); // Reset to step 1 after successful password reset
//   };

//   return (
//     <div className="flex min-h-full flex-col justify-center px-6 py-32 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img
//           className="mx-auto h-10 w-auto"
//           src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
//           alt="Your Company"
//         />
//         <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
//           Forgot Password
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <div className="space-y-6">
//           {step === 1 && (
//             <form onSubmit={handleEmailSubmit} className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-900"
//                 >
//                   Email address
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
//                   />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Send Confirmation Code
//               </button>
//             </form>
//           )}

//           {step === 2 && (
//             <form onSubmit={handleCodeSubmit} className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="code"
//                   className="block text-sm font-medium text-gray-900"
//                 >
//                   Confirmation Code
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="text"
//                     id="code"
//                     value={code}
//                     onChange={(e) => setCode(e.target.value)}
//                     required
//                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
//                   />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Verify Code
//               </button>
//             </form>
//           )}

//           {step === 3 && (
//             <form onSubmit={handlePasswordReset} className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="new-password"
//                   className="block text-sm font-medium text-gray-900"
//                 >
//                   New Password
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="password"
//                     id="new-password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     required
//                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
//                   />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Reset Password
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
