import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { FaMoon, FaSun } from 'react-icons/fa'; // Dark and light mode icons
import { HiMenu, HiX } from 'react-icons/hi'; // Menu and close icons
import Login from '../Pages/Login';
import Registration from '../Pages/Student/Registration';

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [RegistershowModal, setShowModalRegister] = useState(false);

  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogin = () => {
    setShowModal(true);
  };

  const handleRegister = () => {
    setShowModalRegister(true); // Replace this logic if separate modals are needed
  };

  return (
    <header
      className={`fixed top-0 left-0 font-serif w-full text-xl font-semibold ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } shadow-md z-50`}
    >
      <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="text-center">
          <p className="text-xl">Apna</p>
          <p className="text-xl font-serif text-blue-600">academy</p>
        </div>

        {/* Links Section for Desktop */}
        <div className={`hidden lg:flex space-x-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
          <a href="#home" className="hover:text-yellow-400">
            Home
          </a>
          <a href="#about" className="hover:text-yellow-400">
            About
          </a>
          <a href="#blog" className="hover:text-yellow-400">
            Blogs
          </a>
          <a href="#contact" className="hover:text-yellow-400">
            Contact
          </a>
        </div>

        {/* Buttons Section */}
        <div
          className={`hidden lg:flex items-center space-x-4 hover:text-yellow-400 px-3 py-1 rounded-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-800'
          }`}
        >
          <button onClick={handleLogin}>Login</button>
          <button
            onClick={handleRegister}
            className="hover:text-blue-800 border-blue-500 border-2 px-3 py-1 rounded-sm text-blue-400"
          >
            Register
          </button>
        </div>

        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="p-2" aria-label="Toggle Theme">
          {isDarkMode ? <FaSun className="text-2xl" /> : <FaMoon className="text-2xl" />}
        </button>

        {/* Hamburger Menu for Mobile */}
        <button className="lg:hidden px-4 py-2" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`fixed top-0 right-0 w-3/4 ${
              isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
            } h-full shadow-lg lg:hidden z-50`}
          >
            <div className="flex justify-between items-center p-4">
              <button onClick={toggleMenu} aria-label="Close Menu">
                <HiX className="text-2xl" />
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4 p-4">
              <a href="#home" className="hover:text-yellow-400" onClick={toggleMenu}>
                Home
              </a>
              <a href="#about" className="hover:text-yellow-400" onClick={toggleMenu}>
                About
              </a>
              <a href="#blog" className="hover:text-yellow-400" onClick={toggleMenu}>
                Blogs
              </a>
              <a href="#contact" className="hover:text-yellow-400" onClick={toggleMenu}>
                Contact
              </a>
              <button
                onClick={() => {
                  toggleMenu();
                  handleLogin();
                }}
                className="hover:text-gray-500"
              >
                Login/Register
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Modal for Login/Register */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <Login setShowModal={setShowModal} />
        </div>
      )}
      {RegistershowModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <Registration setShowModal={setShowModalRegister} />
        </div>
      )}
    </header>
  );
};
