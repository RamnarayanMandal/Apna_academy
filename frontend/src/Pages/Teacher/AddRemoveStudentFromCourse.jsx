import React, { useState, useEffect } from 'react';
import { useTheme } from '../../ThemeProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddRemoveStudentFromCourse = ({ student, closeModal }) => {
  const { isDarkMode } = useTheme();
  const [courses, setCourses] = useState([]);
  const studentId = student.id; // Get studentId from the prop (student)
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token'); // Ensure that the token is being passed correctly

  // Fetch all courses
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

  // Enroll or remove student from a course
  const handleCourseAction = async (courseId, action) => {
    try {
      if (action === 'add') {
        // Add student to course
        const response = await axios.put(
          `${BASE_URL}/api/course/${studentId}/${courseId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
         Swal.fire({
                  title: 'Added!',
                  text: 'The student has been added successfully.',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                });
       
      } else if (action === 'remove') {
        // Remove student from course
        const response = await axios.delete(
          `${BASE_URL}/api/course/${courseId}/removeStudent/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
         Swal.fire({
                  title: 'Deleted!',
                  text: 'The student has been deleted successfully.',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                });
        
      }
    } catch (error) {
     
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error with the block/unblock operation.',
      });
    }
  };
  

  // Check if the student is enrolled in the specific course
  const isEnrolledInCourse = (course) => {
    return course.students && course.students.some(studentRef => studentRef.id === studentId);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div className={`p-6 rounded-lg w-[700px] max-w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Manage Courses for {student.name}</h2>

        <div className="overflow-x-auto">
          <table className={`min-w-full border border-gray-200 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}>
            <thead>
              <tr className={isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}>
                <th className={`px-4 py-2 border ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>#</th>
                <th className={`px-4 py-2 border ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>Course Name</th>
                <th className={`px-4 py-2 border ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>Number of Students</th>
                <th className={`px-4 py-2 border ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course._id} className={isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}>
                  <td className={`px-4 py-2 border ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>{index + 1}</td>
                  <td className={`px-4 py-2 border ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>{course.courseName}</td>
                  <td className={`px-4 py-2 border ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>{course.students ? course.students.length : 0}</td>
                  <td className={`px-4 py-2 border ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    {/* Check if the student is enrolled in this course */}
                    {isEnrolledInCourse(course) ? (
                      <button
                        onClick={() => handleCourseAction(course.id, 'remove')}
                        className={`bg-red-500 text-white px-4 py-2 rounded-md mr-2 ${isDarkMode ? 'bg-red-700' : 'bg-red-500'}`}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCourseAction(course.id, 'add')}
                        className={`bg-green-500 text-white px-4 py-2 rounded-md mr-2 ${isDarkMode ? 'bg-green-700' : 'bg-green-500'}`}
                      >
                        Add
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={closeModal}
            className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-500 text-white'}`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRemoveStudentFromCourse;
