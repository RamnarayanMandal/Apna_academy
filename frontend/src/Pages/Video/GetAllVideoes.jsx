import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { RiVideoFill } from 'react-icons/ri'; // Import RiVideoFill icon
import AddVideo from './AddVideo'; // Assuming you have an AddVideo component

const GetAllVideos = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [videoToPlay, setVideoToPlay] = useState(null);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const teacherId = localStorage.getItem("CurrentUserId");
  const role = localStorage.getItem('role');
    const [selectVideo, setSelectVideo] = useState(null);
  // Fetch all videos (for Admin)
  const fetchAllVideos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/videos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(response.data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  // Filter videos based on search term
  const filteredVideos = videos.filter((video) =>
    video.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchAllVideos();
  }, [role]);

  // Handle video playback
  const handlePlayVideo = (videoUrl) => {
    setVideoToPlay(videoUrl);
    setShowVideoPlayer(true);
  };

  // Close video player
  const closeVideoPlayer = () => {
    setShowVideoPlayer(false);
    setVideoToPlay(null);
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Sorting by Alphabet
  const handleSortByAlphabet = () => {
    const sortedVideos = [...videos].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setVideos(sortedVideos);
  };

  // Sorting by Date
  const handleSortByDate = () => {
    const sortedVideos = [...videos].sort(
      (a, b) => new Date(a.uploadDate) - new Date(b.uploadDate)
    );
    setVideos(sortedVideos);
  };

  // Handle Edit Course
  const handleEditVideo = (video) => {
    setSelectVideo(video); // Set selected video data for the form
    setShowAddVideoModal(true); // Open the modal
  };

  // Handle Delete Course
  const handleDeletevideo = async(videoId) => {
    try {
      await axios.delete(`${BASE_URL}/api/videos/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(videos.filter((video) => video.videoId !== videoId));
      alert('video deleted successfully');
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div
      id="Videos"
      className={`p-6 w-full lg:mx-40 ml-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}
    >
      {/* Search and Add Button */}
      <div className="flex justify-between flex-wrap gap-4 items-center w-full mb-6">
        <div className="flex items-center bg-white shadow-md rounded-md p-2 w-auto">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none bg-transparent w-full"
          />
        </div>
        <button
          className={`flex items-center px-4 py-2 rounded-md font-semibold border ${isDarkMode
            ? 'border-white text-white hover:bg-white hover:text-gray-900'
            : 'border-gray-500 text-gray-900'}`}
          onClick={() => setShowAddVideoModal(true)}
        >
          Add New Video
        </button>
      </div>

      {/* Sort Buttons */}
      <div className="flex justify-start gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${isDarkMode
            ? 'bg-blue-500 text-white hover:bg-blue-400'
            : 'bg-gray-900 text-white hover:bg-gray-700'}`}
          onClick={handleSortByAlphabet}
        >
          Sort by Alphabet
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${isDarkMode
            ? 'bg-blue-500 text-white hover:bg-blue-400'
            : 'bg-gray-900 text-white hover:bg-gray-700'}`}
          onClick={handleSortByDate}
        >
          Sort by Date
        </button>
      </div>

      {/* Video List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className={`p-4 font-serif shadow-lg rounded-md transform transition duration-300 hover:scale-105 ${isDarkMode
              ? 'bg-gray-800 hover:bg-gray-700 text-white'
              : 'bg-white hover:bg-blue-100 text-gray-900'}`}
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-72 object-cover rounded-md mb-4"
              />
              <RiVideoFill
                onClick={() => handlePlayVideo(video.videoFile)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-5xl cursor-pointer"
              />
            </div>
            <h2 className="text-xl font-bold mb-2">{video.title}</h2>
            <p className="text-sm mb-4">{isDarkMode ? '🎬' : '📺'} {video.description}</p>
            <div className="text-sm flex justify-between mb-4">
              <p><span className="font-semibold">Upload Date:</span> {video.uploadDate}</p>
            </div>

            {/* Additional buttons */}
            <div className="flex justify-center mb-4 mt-4 flex-wrap gap-4">
              <button
                className={`flex items-center px-4 py-2 rounded-md font-semibold border ${isDarkMode
                  ? 'border-white text-white hover:bg-white hover:text-gray-900'
                  : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                }`}
                onClick={() => handleEditVideo(video)}
              >
                Update
              </button>

              {location.pathname === "/admin-teacher-add-course" && (
                <button
                  className={`flex items-center px-4 py-2 rounded-md font-semibold border ${isDarkMode
                    ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                    : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                    }`}
                  onClick={() => handleDeletevideo(video.id)}
                >
                  Delete
                </button>
              )}

              <button
                className={`flex items-center px-4 py-2 rounded-md font-semibold ${isDarkMode
                  ? 'bg-blue-500 text-white hover:bg-blue-400'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
                onClick={() => alert(`Explore ${video.title}`)}
              >
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {showVideoPlayer && (
        <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black opacity-90 flex items-center justify-center">
          <div className="p-4 w-full max-w-lg mx-auto bg-white rounded-md shadow-md relative">
            <button onClick={handleBack} className="absolute top-3 left-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition">
              <IoIosArrowBack className="text-2xl" />
            </button>
            <button onClick={closeVideoPlayer} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition">
              <IoMdCloseCircle className="text-2xl" />
            </button>

            <video className="w-full h-auto" controls>
              <source src={videoToPlay} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {filteredVideos.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No videos found.</p>
      )}

{showAddVideoModal && (
  <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black opacity-90 flex items-center justify-center">
    <div className="p-4 w-full max-w-sm mx-auto bg-white rounded-md shadow-md relative">
      <button onClick={() => setShowAddVideoModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition">
        <IoMdCloseCircle className="text-2xl" />
      </button>
      <AddVideo selectVideo={selectVideo} setShowModal={setShowAddVideoModal} />
    </div>
  </div>
)}
    </div>
  );
};

export default GetAllVideos;
