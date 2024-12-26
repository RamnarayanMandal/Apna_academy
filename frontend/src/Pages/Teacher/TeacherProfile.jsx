import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io'; // Cross icon
import { TeacherSideBar } from '../Teacher/TeacherSideBar';
import { useTheme } from '../../ThemeProvider';
import AdminSidebar from '../Admin/AdminSidebar';
import UpdateTeacher from './UpdateTeacher';

const BASE_URL = import.meta.env.VITE_API_URL;

const TeacherProfile = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to control showing the UpdateTeacher form
  const [myCourses, setMyCourses] = useState([]);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const role = localStorage.getItem('role');
  const teacherId = id 
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/teacher/${teacherId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching teacher profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [teacherId]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/course/teacher/getAllCourses/${teacherId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyCourses(response.data || []);
      } catch (error) {
        console.error('Error fetching teacher courses:', error);
      }
    };
    fetchMyCourses();
  }, [teacherId]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (!profileData) {
    return <div className="text-center text-xl">No profile data found</div>;
  }

  const { name, email, address, dateOfBirth, gender, phoneNo, profilePicture, createdAt } = profileData;
  const creationDate = new Date(createdAt).toLocaleDateString();

  const handleEditProfile = () => {
    setShowUpdateForm(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowUpdateForm(false); // Close the modal
  };

  const handleViewCourse = (courseId) => {
    navigate(`/teacher/Mycourses/${courseId}`);
  };

  // Fallback or placeholder for missing fields
  const profileImage = profilePicture || 'path/to/default-profile-picture.png'; // Provide a default image if null
  const formattedDateOfBirth = dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : 'N/A';
  const formattedPhone = phoneNo || 'N/A';
  const formattedAddress = address || 'N/A';
  const formattedGender = gender || 'N/A';
  const formattedQualification = profileData.qualification || 'N/A'; // Assuming qualification field exists

  return (
    <div
      className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      {/* Sidebar */}
      <div className="fixed z-40">
        {role === 'admin' ? <AdminSidebar /> : <TeacherSideBar />}
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 lg:ml-72 ml-24">
        {/* Modal for UpdateTeacher */}
        {showUpdateForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg w-1/3 relative">
              <UpdateTeacher profileData={profileData} setShowModal={handleCloseModal} />
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                <IoMdClose className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Profile Header */}
        <div className={`mt-8 p-6 rounded-lg flex-1 justify-center`}>
          <div className="flex flex-col flex-wrap justify-center items-center content-center">
            <img
              className="w-40 h-40 rounded-full object-cover"
              src={profileImage}
              alt="Profile"
            />

            {/* Render Edit button only if role is 'teacher' */}
            {role === 'teacher' && (
              <button
                onClick={handleEditProfile}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
          </div>
          <div className="flex flex-col flex-wrap justify-center items-center content-center my-4">
            <p className="text-lg font-semibold">Account Created: {creationDate}</p>
            <h3 className="text-2xl font-bold">Welcome back, {name}!</h3>
            <p>Always stay updated with your Teacher Portal</p>
          </div>
        </div>

        {/* Personal Information */}
        <div
          className={`mt-8 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex`}
        >
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
            <p>
              <span className="font-semibold">Date of Birth:</span> {formattedDateOfBirth}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {formattedGender}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {formattedPhone}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {formattedAddress}
            </p>
            <p>
              <span className="font-semibold">Qualification:</span> {formattedQualification}
            </p>
          </div>
        </div>

        {/* Courses Taught */}
        <div className="mt-8">
          <h3 className="text-xl font-bold">Courses You Teach</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {myCourses.length > 0 ? (
              myCourses.map((course) => (
                <div
                  key={course.id}
                  className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <h4 className="text-lg font-bold text-center">{course.courseName}</h4>
                  <div className="flex justify-center items-center content-center">
                    <button
                      onClick={() => handleViewCourse(course.id)}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No courses found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
