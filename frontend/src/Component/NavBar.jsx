import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { FaMoon, FaSun } from 'react-icons/fa'; // Dark and light mode icons
import { HiMenu, HiX } from 'react-icons/hi'; // React Icons for menu and close
import Logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate()
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogin = () => {
    console.log('Login button clicked');
    // Add login functionality here
  };

  return (
    <header
      className={`fixed top-0 left-0 font-serif w-full text-xl font-semibold ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } shadow-md z-50`}
    >
      <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
       <div className='text-center'>
        <p className='text-xl'>Apna</p>
        <p  className='text-xl font-serif text-blue-600' >academy</p>
        
       </div>

        {/* Links Section for Desktop */}
        <div
          className={`hidden lg:flex space-x-5 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-800'
          }`}
        >
          <a href="#home" className="hover:text-gray-500">Home</a>
          <a href="#about" className="hover:text-gray-500">About</a>
          <a href="#blog" className="hover:text-gray-500">Blogs</a>
          <a href="#contact" className="hover:text-gray-500">Contact</a>
         
        </div>
       <div className='`hidden lg:flex justify-center gap-5 text-base hidden '>
       <button onClick={() => navigate("/login")} >
          Login
          </button>
          <button onClick={() => navigate("/student/registration")} className="hover:text-blue-800 border-blue-500 border-2 p-1 rounded-sm text-blue-400">
          Register
          </button>
       </div>
        <button onClick={toggleTheme} className="p-2">
          {/* Toggle the icon between sun/moon based on dark mode */}
          {isDarkMode ? (
            <FaSun className="text-2xl" /> // Sun icon for dark mode (indicating day mode)
          ) : (
            <FaMoon className="text-2xl" /> // Moon icon for light mode (indicating night mode)
          )}
        </button>

        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden px-4 py-2"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <HiX className="text-2xl" /> // X icon for closing the menu
          ) : (
            <HiMenu className="text-2xl" /> // Menu (bars) icon for opening the menu
          )}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`fixed top-0 right-0 w-3/4 ${
              isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
            } h-full shadow-lg lg:hidden z-50`}
          >
            <div className="flex justify-between items-center p-4">
              <button onClick={toggleMenu}>
                <HiX className="text-2xl" />
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4 p-4">
              <a href="#home" className="hover:text-gray-500" onClick={toggleMenu}>Home</a>
              <a href="#about" className="hover:text-gray-500" onClick={toggleMenu}>About</a>
              <a href="#blog" className="hover:text-gray-500" onClick={toggleMenu}>Blogs</a>
              <a href="#contact" className="hover:text-gray-500" onClick={toggleMenu}>Contact</a>
              <button onClick={handleLogin} className="hover:text-gray-500">
                Login/Register
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
