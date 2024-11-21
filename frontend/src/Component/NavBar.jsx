import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';


export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logo, setLogo] = useState([]);
  const { isDarkMode, toggleTheme } = useTheme(); 
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch logo from API
    const fetchLogo = async () => {
      try {
        const response = await fetch(`${URI}/logos`);
        const data = await response.json();
        setLogo(data);
      } catch (error) {
        console.error('Error fetching logos:', error);
      }
    };
    fetchLogo();
  }, [URI]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogin = () => {
    console.log('Login button clicked');
    // Add login functionality here
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } shadow-md z-50`}
    >
      <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <a href="#" className="flex items-center">
          {logo.length > 0 ? (
            <img
              src={logo[0].logo} // Display the first logo
              alt="logo"
              className="h-8 w-auto rounded-full object-cover"
            />
          ) : (
            <p>Loading logo...</p>
          )}
        </a>

        {/* Links Section for Desktop */}
        <div
          className={`hidden lg:flex space-x-5 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-800'
          }`}
        >
          <a href="#home" className="hover:text-gray-500">Home</a>
          <a href="#about" className="hover:text-gray-500">About</a>
          <a href="#workexperience" className="hover:text-gray-500">Experience</a>
          <a href="#education" className="hover:text-gray-500">Education</a>
          <a href="#skills" className="hover:text-gray-500">Skills</a>
          <a href="#projects" className="hover:text-gray-500">Projects</a>
          <a href="#certificate" className="hover:text-gray-500">Certificate</a>
          <a href="#blog" className="hover:text-gray-500">Blogs</a>
          <a href="#contact" className="hover:text-gray-500">Contact</a>
          <button onClick={handleLogin} className="hover:text-gray-500">
            Login
          </button>
        </div>

        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="p-2">
          <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>

        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden px-4 py-2"
          onClick={toggleMenu}
        >
          <i className={`fa-solid ${isMenuOpen ? 'fa-x' : 'fa-bars'}`}></i>
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
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4 p-4">
              <a href="#home" className="hover:text-gray-500" onClick={toggleMenu}>Home</a>
              <a href="#about" className="hover:text-gray-500" onClick={toggleMenu}>About</a>
              <a href="#workexperience" className="hover:text-gray-500" onClick={toggleMenu}>Experience</a>
              <a href="#education" className="hover:text-gray-500" onClick={toggleMenu}>Education</a>
              <a href="#skills" className="hover:text-gray-500" onClick={toggleMenu}>Skills</a>
              <a href="#projects" className="hover:text-gray-500" onClick={toggleMenu}>Projects</a>
              <a href="#certificate" className="hover:text-gray-500" onClick={toggleMenu}>Certificate</a>
              <a href="#blog" className="hover:text-gray-500" onClick={toggleMenu}>Blogs</a>
              <a href="#contact" className="hover:text-gray-500" onClick={toggleMenu}>Contact</a>
              <button onClick={handleLogin} className="hover:text-gray-500">
                Login
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
