import React from 'react';
import { useTheme } from '../../ThemeProvider';
import heroImg from '../../assets/heroPage.webp';

export const HeroSection = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div
            className={`min-h-screen pt-40 flex flex-col lg:flex-row md:flex-row items-center justify-center px-6 ${isDarkMode ? 'bg-[#0F172A] text-white' : 'bg-white text-gray-900'
                }`}
        >
            {/* Left Image Section */}
            <div className='lg:w-1/2 md:w-1/2 w-full flex justify-center items-center'>
                <img
                    src={heroImg}
                    alt="Hero Section"
                    className="w-full max-w-lg lg:max-w-full md:max-w-full object-contain"
                />
            </div>

            {/* Right Content Section */}
            <div className="lg:w-1/2 md:w-1/2 w-full text-center lg:text-left md:text-left mt-10 lg:mt-0 md:mt-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                    Transform Your <span className="text-blue-500">Learning Journey</span> with Apna Academy
                </h1>
                <p className="text-lg md:text-xl mb-8 leading-relaxed">
                    Discover world-class courses, gain practical skills, and unlock your true potential. 
                    Your success starts here.
                </p>
                <div className="flex justify-center lg:justify-start md:justify-start space-x-4">
                    {/* Primary Button */}
                    <button className="px-6 py-3 text-lg font-medium rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                        Get Started
                    </button>

                    {/* Secondary Button */}
                    <button className="px-6 py-3 text-lg font-medium rounded-lg shadow-lg bg-gray-200 text-gray-900 hover:bg-gray-300 transition">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
};
