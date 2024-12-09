import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddCourse from './AddCourse';
import { IoMdCloseCircle } from 'react-icons/io';
import Swal from 'sweetalert2';

const GetAllCourse = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const [showModel, setShowModal] = useState(false);
  const [selectCourse, setSelectCourse] = useState(null);
  const teacherId = localStorage.getItem("CurrentUserId");
  const role = localStorage.getItem('role'); // Get the user's role
  const navagate = useNavigate();

  // Fetch all courses (for Admin)
  const fetchAllCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/course`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data || []);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch courses of a specific teacher
  const fetchAllCoursesOfTeacher = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/course/teacher/getAllCourses/${teacherId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data || []);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action will permanently delete the course!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
  
      // Proceed if the user confirms
      if (result.isConfirmed) {
        await axios.delete(`${BASE_URL}/api/course/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // Update courses state
        setCourses(courses.filter((course) => course.id !== id));
  
        // Show success alert
        Swal.fire({
          title: 'Deleted!',
          text: 'The course has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }
    } catch (error) {
      console.error('Error deleting course:', error);
  
      // Show error alert
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while deleting the course. Please try again.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    }
  };
  

  // Sorting functions
  const handleSortByAlphabet = () => {
    const sortedCourses = [...courses].sort((a, b) =>
      a.courseName.localeCompare(b.courseName)
    );
    setCourses(sortedCourses);
  };

  const handleSortByDate = () => {
    const sortedCourses = [...courses].sort(
      (a, b) => new Date(a.startingDate) - new Date(b.startingDate)
    );
    setCourses(sortedCourses);
  };

  // Filter courses based on search term
  const filteredCourses = courses.filter((course) =>
    course.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (role === 'teacher') {
      fetchAllCoursesOfTeacher(); // Fetch teacher's courses
    } else if (role === 'admin') {
      fetchAllCourses(); // Fetch all courses for admin
    }
  }, [role]);

  // Handle adding course
  const handleAddCourse = () => {
    setShowModal(true);
  };

  // Handle editing course
  const handleEditCourse = (course) => {
    setShowModal(true);
    setSelectCourse(course);
  };

  const hanleOnclicked = async(id)=>{

    navagate(`/student/courses/${id}`)
  }

  return (
    <div
      id="Courses"
      className={`p-6 w-full lg:mx-40 ml-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
        }`}
    >
      {/* Search and Add Button */}
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
        { location.pathname === '/admin-teacher-add-course' && (
          <button
            className={`flex items-center px-4 py-2 rounded-md font-semibold border ${isDarkMode
              ? 'border-white text-white'
              : 'border-gray-500 text-gray-900'
              }`}
            onClick={handleAddCourse}
          >
            Add New Course
          </button>
        )}
      </div>

      {/* Sort Buttons */}
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

      {/* Course List */}
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
              src={course.image}
              alt={`${course.courseName}`}
              className="w-full h-72 object-cover rounded-md mb-4"
              onClick={()=>hanleOnclicked(course._id)}
            />
            <h2 className="text-xl font-bold mb-2">{course.courseName}</h2>
            <div
              className="text-sm mb-4 text-ellipsis overflow-hidden line-clamp-4"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
            <div className="text-sm flex justify-between mb-4">
              <p>
                <span className="font-semibold">Start Date:</span>{' '}
                {course.startingDate}
              </p>
              <p>
                <span className="font-semibold">End Date:</span> {course.endDate}
              </p>
            </div>
            <div className="flex justify-center mb-4 mt-4 flex-wrap gap-4">
              {/* Update Button */}
              <button
                className={`flex items-center px-4 py-2 rounded-md font-semibold border ${isDarkMode
                  ? 'border-white text-white hover:bg-white hover:text-gray-900'
                  : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                  }`}
                onClick={() => handleEditCourse(course)}
              >
                Update
              </button>

              { location.pathname === "/admin-teacher-add-course" && (
                <button
                  className={`flex items-center px-4 py-2 rounded-md font-semibold border ${isDarkMode
                    ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                    : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                    }`}
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  Delete
                </button>
              )}

              {/* Explore Now Button */}
              <button
                className={`flex items-center px-4 py-2 rounded-md font-semibold ${isDarkMode
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

      {showModel && (
        <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black opacity-90 flex items-center justify-center">
          <div className="p-4 w-full max-w-sm mx-auto bg-white rounded-md shadow-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
            >
              <IoMdCloseCircle className="text-2xl" />
            </button>
            <AddCourse selectCourse={selectCourse} setShowModal={setShowModal} />
          </div>
        </div>
      )}

      {/* No Courses Found */}
      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No courses found.</p>
      )}
    </div>
  );
};

export default GetAllCourse;
