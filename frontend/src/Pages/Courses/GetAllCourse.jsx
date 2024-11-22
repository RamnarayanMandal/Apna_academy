import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';

const GetAllCourse = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([
    {
      id: 1,
      courseName: 'React Basics',
      description: 'Introduction to React fundamentals',
      startingDate: '2024-01-15',
      endDate: '2024-03-15',
      image: 'https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg',
    },
    {
      id: 2,
      courseName: 'Advanced JavaScript',
      description: 'Deep dive into JavaScript concepts',
      startingDate: '2024-02-01',
      endDate: '2024-04-01',
      image: 'https://cdn.pixabay.com/photo/2023/11/29/12/29/kid-8419485_1280.jpg',
    },
    {
      id: 3,
      courseName: 'AI Fundamentals',
      description: 'Understanding the basics of Artificial Intelligence',
      startingDate: '2024-03-10',
      endDate: '2024-05-10',
      image: 'https://cdn.pixabay.com/photo/2018/07/14/11/33/earth-3537401_1280.jpg',
    },
    {
      id: 4,
      courseName: 'Tech Innovations',
      description: 'Explore the latest trends in technology',
      startingDate: '2024-04-05',
      endDate: '2024-06-05',
      image: 'https://media.istockphoto.com/id/1826767918/photo/ai-tech-expert-businessman-show-virtual-graphic-global-internet-connect-robot-chat-ai.jpg',
    },
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      id="Courses"
      className={`p-6 w-full lg:mx-10 ml-20 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
      }`}
    >
      {/* Search Bar */}
      <div className="flex items-center bg-white shadow-md rounded-md p-2 my-10">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search Courses..."
          value={searchTerm}
          onChange={handleSearch}
          className="outline-none bg-transparent w-full"
        />
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className={`p-4 font-serif shadow-lg rounded-md transform transition duration-300 hover:scale-105 ${
              isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-white hover:bg-blue-100 text-gray-900'
            }`}
          >
            {/* Course Image */}
            <img
              src={course.image}
              alt={`${course.courseName}`}
              className="w-full h-72 object-cover rounded-md mb-4"
            />
            {/* Course Details */}
            <h2 className="text-xl font-bold mb-2">{course.courseName}</h2>
            <p className="text-sm mb-4">
              {isDarkMode ? '📘' : '📗'} {course.description}
            </p>
            <div className="text-sm flex justify-between">
              <p>
                <span className="font-semibold">Start Date:</span> {course.startingDate}
              </p>
              <p>
                <span className="font-semibold">End Date:</span> {course.endDate}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mb-4 mt-4">
              {/* Update Button */}
              <button
                className={`flex items-center px-4 py-2 rounded-md font-semibold border ${
                  isDarkMode
                    ? 'border-white text-white hover:bg-white hover:text-gray-900'
                    : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                }`}
                onClick={() => alert(`Update ${course.courseName}`)}
              >
                Update
              </button>

              {/* Explore Now Button */}
              <button
                className={`flex items-center px-4 py-2 rounded-md font-semibold ${
                  isDarkMode
                    ? 'bg-blue-500 text-white hover:bg-blue-400'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
                onClick={() => alert(`Explore ${course.courseName}`)}
              >
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Courses Found Message */}
      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No courses found.</p>
      )}
    </div>
  );
};

export default GetAllCourse;
