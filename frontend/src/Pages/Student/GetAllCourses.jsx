import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetAllCourse = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const studentId = localStorage.getItem('CurrentUserId');
  const navigate = useNavigate();

  const fetchAllCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/course`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  console.log(courses)

  const fetchMyCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/course/getAllCourses/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching student courses:', error);
    }
  };

  const handleSortByAlphabet = () => {
    const sortedCourses = [...courses].sort((a, b) => a.courseName.localeCompare(b.courseName));
    setCourses(sortedCourses);
  };

  const handleSortByDate = () => {
    const sortedCourses = [...courses].sort(
      (a, b) => new Date(a.startingDate) - new Date(b.startingDate)
    );
    setCourses(sortedCourses);
  };

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isEnrolled = (courseId) => myCourses.some((course) => course.id === courseId);

  const handleEnrollNow = async (courseId) => {
    if (isEnrolled(courseId)) {
      alert('You are already enrolled in this course!');
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/api/course/${studentId}/${courseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert(`You have successfully enrolled in the course: ${response.data.courseName}`);
        setMyCourses([...myCourses, response.data]);
      } else {
        alert('Enrollment failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    fetchAllCourses();
    fetchMyCourses();
  }, []);

  const handleOnClicked = async (id) => {
    navigate(`/student/courses/${id}`);
  };

  return (
    <div
      id="Courses"
      className={`p-6 w-[80%]  lg:mx-40 lg:ml-72 ml-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}
    >
      <div className="flex justify-between flex-wrap gap-4 items-center w-full mb-6">
        <div className="flex items-center bg-white shadow-md rounded-md p-2 w-auto">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none bg-transparent w-full"
          />
        </div>
      </div>

      <div className="flex justify-start gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${isDarkMode
            ? 'bg-blue-500 text-white hover:bg-blue-400'
            : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
          onClick={handleSortByAlphabet}
        >
          Sort by Alphabet
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${isDarkMode
            ? 'bg-blue-500 text-white hover:bg-blue-400'
            : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
          onClick={handleSortByDate}
        >
          Sort by Date
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className={`p-4 font-serif shadow-lg rounded-md transform transition duration-300 hover:scale-105 ${isDarkMode
              ? 'bg-gray-800 hover:bg-gray-700 text-white'
              : 'bg-white hover:bg-blue-100 text-gray-900'
              }`}
          >
            <img
             src={`${course.image} || https://cdn.pixabay.com/photo/2023/11/29/12/29/kid-8419485_1280.jpg`}
              alt={`${course.courseName}`}
              className="w-full h-72 object-cover rounded-md mb-4"
              onClick={() => handleOnClicked(course.id)}
            />
            <h2 className="text-xl font-bold mb-2">{course.courseName}</h2>

            {/* Display course description as HTML */}
            <div
              className="text-sm mb-4 text-ellipsis overflow-hidden line-clamp-4"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />


            <div className="text-sm flex justify-between mb-4">
              <p>
                <span className="font-semibold">Start Date:</span> {course.startingDate}
              </p>
              <p>
                <span className="font-semibold">End Date:</span> {course.endDate}
              </p>
            </div>

            <div className="flex justify-center mb-4 mt-4 flex-wrap gap-4">
              <button
                className={`flex items-center px-4 py-2 rounded-md font-semibold ${isDarkMode
                  ? 'bg-blue-500 text-white hover:bg-blue-400'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
                  } ${isEnrolled(course.id) ? 'bg-green-500 cursor-not-allowed' : ''}`}
                onClick={() => handleEnrollNow(course.id)}
                disabled={isEnrolled(course.id)}
              >
                {isEnrolled(course.id) ? 'Enrolled' : 'Enroll Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No courses found.</p>
      )}
    </div>
  );
};

export default GetAllCourse;
