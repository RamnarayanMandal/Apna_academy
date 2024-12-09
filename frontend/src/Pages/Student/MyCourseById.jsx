import React, { useEffect, useState } from 'react';
import { useTheme } from '../../ThemeProvider';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import { StudentSideBar } from './StudentSidebar';
import { parse, differenceInDays } from 'date-fns';

const MyCourseById = () => {
  const { isDarkMode } = useTheme(); // Using dark mode state from context or provider
  const { id } = useParams(); // Get the course id from the URL params
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState(null);
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
      setVideos(resp.data.data);
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

  const handleLink = async (id) => {
    navigate(`/video/${id}`, { state: { data: videos } });
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
              <div
                className={`w-full h-auto border-b-2 pb-4 overflow-hidden grid lg:grid-cols-2 grid-cols-1 gap-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
              >

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

              {
                videos && videos.length > 0 ? (
                  <div className="overflow-y-auto max-h-[500px] scrollbar-hidden">
                    {videos.map((video) => (
                      <div key={video.id} className="grid lg:grid-cols-2 mt-8 grid-cols-1 gap-6">
                        <div 
                          onClick={()=>handleLink(video.id)}>
                          <video controls src={video.videoFile} className="w-full max-h-96 object-cover rounded-md cursor-pointer"></video>
                        </div>
                        <div className="flex flex-col justify-center content-center items-center space-y-2">
                          <p className="text-2xl font-semibold">{video.title}</p>
                          <p>{video.description}</p>

                          {/* Hard-set Like and Comment Counts */}
                          <div className="flex space-x-4 text-blue-600">
                            <button className="flex items-center space-x-2">
                              {/* Like Icon */}
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                              </svg>
                              <span>Like (50)</span> {/* Hard-set Like count */}
                            </button>

                            <button className="flex items-center space-x-2">
                              {/* Comment Icon */}
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path d="M21 12c0 5.523-4.477 10-10 10s-10-4.477-10-10S5.477 2 11 2s10 4.477 10 10zM11 4c-3.314 0-6 2.686-6 6 0 1.628.628 3.103 1.658 4.204l-1.229 3.692L8.825 14.9a7.978 7.978 0 0 1 2.174.846l3.329-.892c-.243-.782-.552-1.495-.939-2.122C12.368 10.956 12 9.67 12 8.5c0-1.104-.896-2-2-2s-2 .896-2 2c0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z"></path>
                              </svg>
                              <span>Comment (10)</span> {/* Hard-set Comment count */}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='flex justify-center items-center content-center mt-20'>
                    <p className="text-center text-xl text-gray-500">No videos found.</p>
                  </div>
                )
              }



            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyCourseById;
