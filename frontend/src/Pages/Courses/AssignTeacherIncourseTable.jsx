import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../ThemeProvider';
import AdminSidebar from '../Admin/AdminSidebar';
import { IoMdCloseCircle } from 'react-icons/io';
import { AssignTeacherModel } from './AssignTeacherModel';

const AssignTeacherInCourse = () => {
  const { isDarkMode } = useTheme();
  const [courses, setCourses] = useState([]);
  const [showModel, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [coursesPerPage] = useState(10); // Set number of courses per page
  const [totalCourses, setTotalCourses] = useState(0); // Total number of courses
  const [selectCourse, setSelectCourse] = useState(null);
  const token = localStorage.getItem('token');
  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchAllCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/course`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data || []);
      setTotalCourses(response.data.length); // Set total number of courses
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };


  useEffect(() => {
    fetchAllCourses();

  }, []);

  // Filter courses by search query
  const filteredCourses = courses.filter((course) =>
    course.courseName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the courses to display for the current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Pagination buttons logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleassginTeacher = (course) => {
    setSelectCourse(course);
    setShowModal(true);

  }

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
        }`}
    >
      <AdminSidebar />
      <div className="overflow-x-auto w-full lg:ml-20 p-6">
        <div className="mb-4 flex ">
          <input
            type="text"
            placeholder="Search Courses"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`px-4 py-2 rounded-lg w-1/3 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
              } border`}
          />
        </div>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr
              className={`text-left ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-900'
                }`}
            >
              <th className="border border-gray-400 px-4 py-2">#</th>
              <th className="border border-gray-400 px-4 py-2">Course Name</th>
              <th className="border border-gray-400 px-4 py-2">Course Code</th>
              <th className="border border-gray-400 px-4 py-2">Description</th>
              <th className="border border-gray-400 px-4 py-2">Students</th>
              <th className="border border-gray-400 px-4 py-2">Teachers</th>
              <th className="border border-gray-400 px-4 py-2">Start Date</th>
              <th className="border border-gray-400 px-4 py-2">End Date</th>
              <th className="border border-gray-400 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.length > 0 ? (
              currentCourses.map((course, index) => (
                <tr
                  key={course._id}
                  className={isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}
                >
                  <td className="border border-gray-400 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-400 px-4 py-2">{course.courseName}</td>
                  <td className="border border-gray-400 px-4 py-2">{course.courseCode}</td>
                  <td className="border border-gray-400 px-4 py-2 truncate">{course.description}</td>
                  <td className="border border-gray-400 px-4 py-2">
                    {course.students?.length > 0
                      ? course.students.map((student) => student.name).join(', ')
                      : 'No Students'}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {course.teacher  
                      ? course.teacher.name
                      : 'No Teacher'}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">{course.startingDate}</td>
                  <td className="border border-gray-400 px-4 py-2">{course.endDate}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    <button
                      className={`px-4 py-2 rounded ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                      onClick={() => handleassginTeacher(course)}>
                      Assign Teacher
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No courses available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Previous
          </button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Next
          </button>
        </div>
        {

          showModel && (
            <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black opacity-90 flex items-center justify-center">
              <div className="p-4 w-full max-w-sm mx-auto bg-white rounded-md shadow-md relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                >
                  <IoMdCloseCircle className="text-2xl" />
                </button>

                <AssignTeacherModel selectCourse={selectCourse} setShowModal={setShowModal} />
              </div>
            </div>
          )

        }
      </div>
    </div>
  );
};

export default AssignTeacherInCourse;
