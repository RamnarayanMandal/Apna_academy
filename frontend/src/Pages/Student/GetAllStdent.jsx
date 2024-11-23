import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../Admin/AdminSidebar';


export const GetAllStdent = () => {
    const { isDarkMode } = useTheme();
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    const token = localStorage.getItem('token');
    const BASE_URL = import.meta.env.VITE_API_URL;
  
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
  
    const fetchAllTeacher = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/teacher`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeachers(response.data || []);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };
  
    useEffect(() => {
      fetchAllCourses();
      fetchAllTeacher();
    }, []);
  
    // Filter courses by search query
    const filteredCourses = courses.filter((course) =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const formatDate = (date) => {
      if (!date) return 'N/A';
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }).format(new Date(date));
    };

  
  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <AdminSidebar />
      <div className="overflow-x-auto w-full lg:ml-20 p-6">
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search Courses"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`px-4 py-2 rounded-lg w-1/3 ${
              isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
            } border`}
          />
        </div>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr
              className={`text-left ${
                isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-900'
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
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
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
                    {course.teachers?.length > 0
                      ? course.teachers.map((teacher) => teacher.name).join(', ')
                      : 'No Teachers'}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">{formatDate(course.startingDate)}</td>
                  <td className="border border-gray-400 px-4 py-2">{formatDate(course.endDate)}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    <button
                      className={`px-4 py-2 rounded ${
                        isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                      } text-white`}
                    >
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
      </div>
    </div>
  )
}
