import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { StudentSideBar } from './StudentSidebar';
import { useTheme } from '../../ThemeProvider';
import { FaSearch } from 'react-icons/fa'; // Search icon from react-icons
import UpdateStudent from './UpdateStudent'; // Import the UpdateStudent component

// Import the image from the local assets folder
import studentImage from '../../assets/heroPage.webp'; // Adjust the path as needed

const BASE_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token'); 
  const studentId = localStorage.getItem('CurrentUserId'); 
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to control showing the UpdateStudent form
  const [showAllCarts, setShowAllCarts] = useState(false); // State for toggling cart visibility
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/student/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/course/getAllCourses/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched courses:', response.data);  // Log the courses data
        setMyCourses(response.data || []);
      } catch (error) {
        console.error('Error fetching student courses:', error);
      }
    };
    fetchMyCourses();
  }, [studentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>No profile data found</div>;
  }

  const { name, email, phone, createdAt } = profileData;

  // Format the createdAt date to a readable format (e.g., "Nov 29, 2024")
  const creationDate = new Date(createdAt);
  const formattedDate = creationDate.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Dummy data for missing fields
  const profilePicture = 'https://via.placeholder.com/150'; // Placeholder image

  const handleEditProfile = () => {
    setShowUpdateForm(true); 
  };

  const handleViewCourse = (courseId) => {
    // Implement navigation or course view functionality here
    console.log('View course with ID:', courseId);
    navigate(`/course/${courseId}`);  // Example to navigate to a course page
  };

  const handleSeeAllClick = () => {
    setShowAllCarts(!showAllCarts); // Toggle visibility of all carts
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Sidebar on the left */}
      <div className="w-1/4 lg:w-1/5 xl:w-1/6 p-4">
        <StudentSideBar />
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6">
        {/* Flex container for the search bar and profile section */}
        <div className="flex justify-between items-center mb-6">
          {/* Search bar aligned to the left */}
          <div className="flex items-center w-1/2 max-w-xs border rounded-full px-4 py-2 border-gray-300 bg-white">
            <FaSearch className="text-gray-500 mr-2 w-5 h-5" /> {/* Reduced icon size */}
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 bg-transparent text-gray-900 focus:outline-none"
            />
          </div>

          {/* Profile section aligned to the right */}
          <div className="flex items-center ml-auto">
            {/* Profile Text (Name, Email) on the right */}
            <div className="text-left">
              <h2 className="text-2xl font-bold">{name}</h2>

              {/* Email in a single line */}
              <p className="text-lg text-gray-700" style={{ whiteSpace: 'nowrap' }}>
                {email}
              </p>

              {/* Phone */}
              <p className="text-lg">{phone}</p>
            </div>
            <div className="flex-shrink-0">
              <img
                className="w-16 h-16 rounded-full object-cover m-2"
                src={profilePicture}
                alt="Avatar"
              />
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={handleEditProfile}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>

        {/* Conditional Rendering for Update Form */}
        {showUpdateForm && <UpdateStudent profileData={profileData} />}

        {/* Full-width Box below Edit Profile Button with Image on the Right */}
        <div className="mt-8 p-12 bg-gray-100 rounded-lg flex items-center justify-between">
          {/* Left-side content (optional) */}
          <div className="w-2/3 pr-6">
            {/* Display the creation date above the welcome message */}
            <p className="text-xl text-black-500 pb-12">Account Created: {formattedDate}</p>
            <h3 className="text-xl font-bold ">Welcome back, {name}!</h3>
            <p className="text-lg text-gray-700 ">Always stay updated with your Student portal</p>
          </div>

          {/* Right-side Image with reduced size */}
          <div className="flex-shrink-0 w-1/3 h-36"> {/* Adjusted height of container */}
            <img
              className="w-48 h-48 pb-2 object-cover rounded-lg" // Reduced the image size
              src={studentImage} // Use the imported image
              alt="Student Image"
            />
          </div>
        </div>

        {/* Carts Section - 3 carts in a row */}
        <div className="mt-8">
          {/* Title and See All Button */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Enrolled Courses</h3>
            <button
              onClick={handleSeeAllClick}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {showAllCarts ? 'See Less' : 'See All'}
            </button>
          </div>

          {/* Carts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Display the first 3 carts if "See All" is not clicked */}
            {myCourses.length > 0 ? (
              myCourses.slice(0, showAllCarts ? myCourses.length : 3).map((course) => (
                <div key={course.id} className="bg-white p-4 shadow rounded-lg">
                  <h4 className="text-xl font-bold">{course.courseName}</h4>
                  {/* <p className="mt-2">Course details go here.</p> */}
                  <button
                    onClick={() => handleViewCourse(course.id)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center col-span-3">No courses found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
