import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../Admin/AdminSidebar';
import Swal from 'sweetalert2'; 
import AddRemoveTeacherFromCourse from './AddRemoveTeacherFromCourse'; // Modal component for managing teachers

const ManageTeacher = () => {
  const { isDarkMode } = useTheme();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage] = useState(10);
  const [selectedTeacher, setSelectedTeacher] = useState(null); // Store selected teacher
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Check user role for sidebar

  // Fetching all teachers from the API
  const fetchAllTeachers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/teacher/with-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(response.data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  useEffect(() => {
    fetchAllTeachers();
  }, []);

  // Filter teachers based on the search term
  const filteredTeachers = teachers.filter(teacher => {
    const matchesName = teacher.name && teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmail = teacher.email && teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = teacher.subjectSpecialization && teacher.subjectSpecialization.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesName || matchesEmail || matchesSubject;
  });

  // Pagination logic
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  const handlePagination = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

  // Handle actions for the teacher
  const handleAction = (action, teacherId) => {
    const teacher = teachers.find(t => t.id === teacherId); // Find the selected teacher
    switch(action) {
      case 'edit':
        setSelectedTeacher(teacher); // Set the selected teacher
        setIsModalOpen(true); // Open the modal
        break;
      case 'delete':
        deleteTeacher(teacherId);
        break;
      case 'view':
        navigate(`/Teacher-profile/${teacherId}`);
        break;
      case 'block':
        blockOrUnblockTeacher(teacherId, 'block');
        break;
      case 'unblock':
        blockOrUnblockTeacher(teacherId, 'unblock');
        break;
      default:
        break;
    }
  };

  const deleteTeacher = async (teacherId) => {
    try {
      await axios.delete(`${BASE_URL}/api/teacher/${teacherId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.id !== teacherId));
      Swal.fire({
        icon: 'success',
        title: 'Teacher Deleted!',
        text: 'The teacher was deleted successfully.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error deleting the teacher.',
      });
    }
  };

  const blockOrUnblockTeacher = async (teacherId, action) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/teacher/${teacherId}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setTeachers(prevTeachers =>
          prevTeachers.map(teacher =>
            teacher.id === teacherId
              ? { ...teacher, block: action === 'block' }
              : teacher
          )
        );
        Swal.fire({
          icon: 'success',
          title: `${action === 'block' ? 'Blocked' : 'Unblocked'}!`,
          text: `The teacher has been ${action === 'block' ? 'blocked' : 'unblocked'} successfully.`,
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

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
  };
  const renderCourses = (courses) => {
    if (!courses || courses.length === 0) {
      return <span>No courses assigned</span>;
    }
  
    // Map through the courses and render course names or any relevant information
    return courses.map((course, index) => (
      <div key={course.id}>
        {/* Displaying course name and course code */}
        <span>{course.courseName}</span>
        {index < courses.length - 1 && <span>, </span>} {/* Add a comma between courses */}
      </div>
    ));
  };
  

  return (
    <div className={`flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}>
      {/* Sidebar */}
      <div className="w-64 min-h-screen">
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <h1 className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Manage Teachers
        </h1>

        {/* Search bar */}
        <div className={`relative flex items-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <FaSearch className={`absolute left-3 text-gray-600 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
          <input
            type="text"
            placeholder="Search by name, email, or subject"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 w-80 border rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
          />
        </div>

        {/* Table to display teachers */}
        <table className={`min-w-full rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <thead>
            <tr className={isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}>
              <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>#</th>
              <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Name</th>
              <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email</th>
              <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Subject</th>
              <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Courses</th>
              <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
          {currentTeachers.map((teacher, index) => (
  <tr key={teacher.id} className={isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
    <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {index + 1 + (currentPage - 1) * teachersPerPage}
    </td>
    <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {teacher.name}
    </td>
    <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {teacher.email}
    </td>
    <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {teacher.subjectSpecialization}
    </td>
    <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {renderCourses(teacher.course)} {/* Corrected usage of teacher.courses */}
    </td>
    <td className="px-4 py-2">
      <button
        onClick={() => handleAction('view', teacher.id)}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-2 ${isDarkMode ? 'hover:bg-blue-400' : 'hover:bg-blue-600'}`}
      >
        View
      </button>
      <button
        onClick={() => handleAction('edit', teacher.id)}
        className={`bg-yellow-500 text-white px-4 py-2 rounded-md mr-2 ${isDarkMode ? 'hover:bg-yellow-400' : 'hover:bg-yellow-600'}`}
      >
        Edit
      </button>
      <button
        onClick={() => handleAction('delete', teacher.id)}
        className={`bg-red-500 text-white px-4 py-2 rounded-md mr-2 ${isDarkMode ? 'hover:bg-red-400' : 'hover:bg-red-600'}`}
      >
        Delete
      </button>
      <button
        onClick={() => handleAction(teacher.block ? 'unblock' : 'block', teacher.id)}
        className={`px-4 py-2 rounded-md ${teacher.block ? 'bg-green-500' : 'bg-gray-500'} text-white ${isDarkMode ? 'hover:bg-green-400' : 'hover:bg-gray-400'}`}
      >
        {teacher.block ? 'Unblock' : 'Block'}
      </button>
    </td>
  </tr>
))}

          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2 ${currentPage === 1 ? 'opacity-50' : 'hover:bg-gray-400'}`}
          >
            Previous
          </button>
          <button
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-gray-300 text-gray-800 rounded-md ${currentPage === totalPages ? 'opacity-50' : 'hover:bg-gray-400'}`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <AddRemoveTeacherFromCourse teacher={selectedTeacher} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTeacher;
