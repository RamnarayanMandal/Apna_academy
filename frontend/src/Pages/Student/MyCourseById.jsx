import React, { useEffect, useState } from 'react';
import { useTheme } from '../../ThemeProvider';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import { StudentSideBar } from './StudentSidebar';
import { parse, differenceInDays } from 'date-fns';

const MyCourseById = () => {
  const { isDarkMode } = useTheme(); // Using dark mode state from context or provider
  const { id } = useParams(); // Get the course id from the URL params
  const [course, setCourse] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation (back button)

  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token'); // Get token from localStorage

  useEffect(() => {
    fetchCourseDetails();
    fetchVideoByCourseId();
  }, [id]); // Fetch course details when the component mounts or when `id` changes

  // Fetch course details
  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`${BASE_URL}/api/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(resp.data);
    } catch (error) {
      setError('Error fetching course details');
      console.error('Error fetching course details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch videos by course ID
  const fetchVideoByCourseId = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`${BASE_URL}/api/videos/getVideoByCourseId/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideo(resp.data);
    } catch (error) {
      setError('Error fetching video details');
      console.error('Error fetching video details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate course duration
  const calculateDuration = (startDateString, endDateString) => {
    if (!startDateString || !endDateString) return 'N/A';
    
    try {
      const startDate = parse(startDateString, 'dd/MM/yyyy', new Date());
      const endDate = parse(endDateString, 'dd/MM/yyyy', new Date());
      const duration = differenceInDays(endDate, startDate);
      return duration > 0 ? `${duration} days` : 'N/A';
    } catch (error) {
      console.error('Invalid date format', error);
      return 'N/A';
    }
  };

  // Handle Back button click
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div
      className={`min-h-screen flex lg:gap-20 w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}
        transition-colors`}
    >
      {/* Sidebar */}
      <div className="fixed z-40">
        <StudentSideBar />
      </div>

      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className={`back-button fixed right-5 top-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300`}
      >
        Back
      </button>

      {/* Course Details */}
      <div className="lg:flex lg:flex-row flex-col-reverse p-6 lg:ml-64 ml-16 gap-10 overflow-hidden w-full">
        {loading ? (
          <p className="text-center text-xl text-gray-500">Loading course details...</p>
        ) : error ? (
          <p className="text-center text-xl text-red-500">{error}</p>
        ) : (
          course && (
            <div className={`w-full ${isDarkMode ? 'bg-gray-900 text-white' : ' text-gray-900'} p-6`}>
              {/* Course Image and Title */}
              <div className="w-full h-auto border-b-2 pb-4 overflow-hidden grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div
                  className={`w-full shadow-md p-4 rounded-lg mt-8 transition-all ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                >
                  <img
                    src={course.image}
                    alt="Course"
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                </div>

                {/* Course Services Section */}
                <div className={`w-full shadow-md p-8 rounded-lg mt-8 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                  <h2 className="text-2xl font-semibold mb-6 border-b-2 pb-2">{course.courseName}</h2>
                  <div className="space-y-4">
                    {/* Service Items */}
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <p className="text-left">Videos</p>
                      <p className="text-right text-blue-600">{course?.videos?.length || '0'}</p>
                    </div>

                    <div className="flex justify-between items-center text-lg font-semibold">
                      <p className="text-left">Assignments</p>
                      <p className="text-right text-blue-600">{course?.assignments?.length || '0'}</p>
                    </div>

                    <div className="flex justify-between items-center text-lg font-semibold">
                      <p className="text-left">Test</p>
                      <p className="text-right text-blue-600">{course?.test?.length || '0'}</p>
                    </div>

                    <div className="flex justify-between items-center text-lg font-semibold">
                      <p className="text-left">Students</p>
                      <p className="text-right text-blue-600">{course?.students?.length || '0'}</p>
                    </div>

                    <div className="flex justify-between items-center text-lg font-semibold">
                      <p className="text-left">Duration</p>
                      <p className="text-right text-blue-600">{calculateDuration(course.startingDate, course.endDate)}</p>
                    </div>

                    <div className="flex justify-between items-center text-lg font-semibold">
                      <p className="text-left">Class Notes</p>
                      <p className="text-right text-blue-600">Download</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Description and Instructor */}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyCourseById;
