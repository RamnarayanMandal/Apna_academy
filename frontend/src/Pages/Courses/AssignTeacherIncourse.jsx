import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../ThemeProvider';
import AdminSidebar from '../Admin/AdminSidebar';

const AssignTeacherInCourse = () => {
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

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <AdminSidebar />
      <div className="overflow-x-auto w-full lg:ml-20 pt-20">
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search Courses"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg w-1/3 text-black"
          />
        </div>
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Course Name</th>
              <th className="border border-gray-300 px-4 py-2">Course Code</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Students</th>
              <th className="border border-gray-300 px-4 py-2">Teachers</th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">End Date</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <tr key={course._id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{course.courseName}</td>
                  <td className="border border-gray-300 px-4 py-2">{course.courseCode}</td>
                  <td className="border border-gray-300 px-4 py-2">{course.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {course.students && course.students.length > 0
                      ? course.students.map((student) => student.name).join(', ')
                      : 'No Students'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {course.teachers && course.teachers.length > 0
                      ? course.teachers.map((teacher) => teacher.name).join(', ')
                      : 'No Teachers'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{course.startingDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{course.endDate}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
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
  );
};

export default AssignTeacherInCourse;
