import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; 
import { IoMdClose } from 'react-icons/io'; // Cross icon
import { StudentSideBar } from './StudentSidebar';
import { useTheme } from '../../ThemeProvider';
import UpdateStudent from './UpdateStudent'; // Import the UpdateStudent component
import studentImage from '../../assets/BoyGirl.jfif'; // Image for the profile page
import { TeacherSideBar } from '../Teacher/TeacherSideBar';
import AdminSidebar from '../Admin/AdminSidebar';

const BASE_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const studentId = localStorage.getItem('CurrentUserId');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to control showing the UpdateStudent form
  const [showAllCarts, setShowAllCarts] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [myCourses, setMyCourses] = useState([]);
  const role = localStorage.getItem('role');

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

  const { name, email, address, dateOfBirth, gender, phone, profilePicture, createdAt } = profileData;
  const creationDate = new Date(createdAt);
  const formattedDate = creationDate.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleEditProfile = () => {
    setShowUpdateForm(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowUpdateForm(false); // Close the modal
  };

  const handleViewCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleSeeAllClick = () => {
    setShowAllCarts(!showAllCarts);
  };

 const renderSiderbar = () => {
    if(role === 'teacher'){
      return <TeacherSideBar/>
    }else if(role === 'admin'){
      return <AdminSidebar/>
    }else {
      return <StudentSideBar />
    }
 }

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Sidebar */}
      <div className="w-1/4 lg:w-1/5 xl:w-1/6 p-4">
        {renderSiderbar()}
      </div>

      {/* Main content */}
      <div className="flex-1 ">
       

        {/* Modal for UpdateStudent */}
        {showUpdateForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/3 relative">
              <UpdateStudent profileData={profileData} setShowModal={handleCloseModal} />
              
              {/* Cross Icon */}
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                <IoMdClose className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 p-12 bg-gray-100 rounded-lg flex items-center justify-between">
          <div className="w-2/3 pr-6">
            <p className="text-xl text-black-500 pb-12">Account Created: {formattedDate}</p>
            <h3 className="text-xl font-bold">Welcome back, {name}!</h3>
            <p className="text-lg text-gray-700">Always stay updated with your Student portal</p>
          </div>
          <div className="flex-shrink-0">
            <img className="w-56 h-56 mb-0  object-cover rounded-lg" src={studentImage} alt="Student Image" />
          </div>
        </div>
        <div className="mt-8 p-8 bg-white rounded-lg shadow-lg flex items-center">
          {/* Left: Profile Image */}
          <div className="flex-shrink-0 w-1/4 h-48">
            <img className="w-32 h-32 rounded-full object-cover" src={profilePicture} alt="Avatar" />
            
            {/* Edit Profile Button below the profile image */}
        {role == 'student' &&     <button
              onClick={handleEditProfile}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>}
          </div>

          {/* Right: Personal Information */}
          <div className="ml-8 w-3/4">
          <div className=' flex text-2xl font-bold mb-4 justify-between'>
          <h3 >{name} Personal Information</h3>
          <span>Total Enrolled Courses: {myCourses.length}</span>
          </div>
           
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Date of Birth:</span>
                <span className="text-gray-600">{new Date(dateOfBirth).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Gender:</span>
                <span className="text-gray-600">{gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Address:</span>
                <span className="text-gray-600">{address}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-600">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Phone:</span>
                <span className="text-gray-600">{phone}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Enrolled Courses</h3>
            <button
              onClick={handleSeeAllClick}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {showAllCarts ? 'See Less' : 'See All'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {myCourses.length > 0 ? (
              myCourses.slice(0, showAllCarts ? myCourses.length : 3).map((course) => (
                <div key={course.id} className="bg-white p-4 shadow rounded-lg">
                  <h4 className="text-xl font-bold">{course.courseName}</h4>
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
