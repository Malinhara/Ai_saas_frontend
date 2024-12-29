import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../Logichandle/userContex';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [generateDropdownOpen, setGeberateDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const togglegenerateDropdown = () => {
    setGeberateDropdownOpen(!generateDropdownOpen);
  };

  const { user, logout } = useUser(); // Access user context


  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
           <span className="self-center text-sm md:text-lg font-semibold whitespace-nowrap dark:text-white">VISUALS</span>
          </a>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
  onClick={user.isLoggedIn ? logout : toggleDropdown} // Log out if logged in, otherwise toggle dropdown
  type="button"
  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  {user.isLoggedIn ? "Log Out" : "Get Started"}
</button>

{/* Dropdown Menu */}
{!user.isLoggedIn && isDropdownOpen && (
  <div
    className="absolute left-100 mt-12 w-26 sm:w-36 md:w-46 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-600"
    id="menu-full-dropdown"
  >
    <ul className="py-2">
  <li>
    <Link
      to="/signin"
      className="block px-2 py-2 text-black hover:bg-gray-100">
      Sign In
    </Link>
  </li>
  <li>
    <Link
      to="/signup"
      className="block px-2 py-2 text-black hover:bg-gray-100"
    >
      Sign Up
    </Link>
  </li>
</ul>
     </div>
   )}

            <button
              onClick={toggleMenu}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={menuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links (Visible on desktop and toggled on mobile) */}
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${menuOpen ? 'block' : 'hidden'}`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>

              {/* Company Dropdown */}
              <li className="relative">
                <button
                  onClick={togglegenerateDropdown}
                  className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                  Generate
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                
                {generateDropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-600"
                    id="mega-menu-full-dropdown"
                  >
                   <ul className="py-2">
  <li>
    <Link
      to="/createHqavatar" // Use the `to` prop for internal routing
      className="block px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      Create HQ Talk Avatar
    </Link>
  </li>
  <li>
    <Link
      to="/talkimage" // Use the `to` prop for internal routing
      className="block px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      Create Custom Talk Avatar
    </Link>
  </li>
  <li>
    <Link
      to="#" // If you want to use an external link or an internal route for "Other"
      className="block px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      Other
    </Link>
  </li>
</ul>
                  </div>
                )}
              </li>

             <li>
                <a
                  href="/service"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="contact"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
