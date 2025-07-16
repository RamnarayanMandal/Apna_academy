import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TeacherSideBar } from './TeacherSideBar';
import Swal from 'sweetalert2'; 
import AddRemoveStudentFromCourse from './AddRemoveStudentFromCourse'; // Import the modal component
import AdminSidebar from '../Admin/AdminSidebar';

const ManageStudent = () => {
    const { isDarkMode } = useTheme();
    const BASE_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10);
    const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    // Fetching all students from the API
    const fetchAllStudents = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/student/with-courses`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStudents(response.data || []);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    useEffect(() => {
        fetchAllStudents();
    }, []);

    // Filter students based on the search term
    const filteredStudents = students.filter(student => {
        const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesEmail = student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPhone = student.phone.includes(searchTerm);
        const matchesCourse = student.course.some(course => course.courseName.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesName || matchesEmail || matchesPhone || matchesCourse;
    });

    // Pagination logic
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    const handlePagination = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    // Handle actions
    const handleAction = (action, studentId) => {
        const student = students.find(s => s.id === studentId); // Find the selected student
        switch(action) {
            case 'edit':
                setSelectedStudent(student); // Set the selected student
                setIsModalOpen(true); // Open the modal
                break;
            case 'delete':
                deleteStudent(studentId);
                break;
            case 'view':
                navigate(`/Student-profile/${studentId}`);
                break;
            case 'block':
                blockOrUnblockStudent(studentId, 'block');
                break;
            case 'unblock':
                blockOrUnblockStudent(studentId, 'unblock');
                break;
            default:
                break;
        }
    };

    const deleteStudent = async (studentId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/student/${studentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setStudents((prevStudents) => prevStudents.
            filter(student => student.id !== studentId));
            Swal.fire({
                icon: 'success',
                title: 'Student Deleted!',
                text: 'The student was deleted successfully.',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an error deleting the student.',
            });
        }
    };

    const blockOrUnblockStudent = async (studentId, action) => {
        try {
            const response = await axios.put(`${BASE_URL}/api/student/${studentId}/${action}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                setStudents((prevStudents) =>
                    prevStudents.map((student) =>
                        student.id === studentId
                            ? { ...student, block: action === 'block' }
                            : student
                    )
                );
                Swal.fire({
                    icon: 'success',
                    title: `${action === 'block' ? 'Blocked' : 'Unblocked'}!`,
                    text: `The student has been ${action === 'block' ? 'blocked' : 'unblocked'} successfully.`,
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

    const renderCourses = (courses) => {
        if (!courses || !Array.isArray(courses)) {
            return 'No courses available';
        }
        return courses.map(course => course.courseName).join(', ');
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStudent(null);
    };

    return (
        <div className={`flex flex-col lg:flex-row min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}>
            {/* Sidebar */}
            <div className={`w-full lg:w-64 md:w-20 flex-shrink-0`}> {/* Sidebar full width on mobile, fixed on desktop */}
                {/* <TeacherSideBar /> */}
                {role === "teacher" ? <TeacherSideBar /> : <AdminSidebar />}

            </div>

            {/* Main content */}
            <div className={`flex-1 p-2 sm:p-4 md:p-6`}> {/* Responsive padding */}
                <h1 className={`text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Manage Students
                </h1>

                {/* Search bar */}
                <div className={`relative flex items-center mb-4 w-full max-w-xs sm:max-w-md mx-auto ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <FaSearch className={`absolute left-3 text-gray-600 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or course"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`pl-10 pr-4 py-2 w-full border rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                    />
                </div>

                {/* Responsive Table */}
                <div className="overflow-x-auto w-full">
                    <table className={`min-w-full rounded-lg shadow-md text-xs sm:text-sm md:text-base ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}> 
                        <thead>
                            <tr className={isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                                <th className="px-2 sm:px-4 py-2 text-left">#</th>
                                <th className="px-2 sm:px-4 py-2 text-left">Name</th>
                                <th className="px-2 sm:px-4 py-2 text-left">Email</th>
                                <th className="px-2 sm:px-4 py-2 text-left">Phone</th>
                                <th className="px-2 sm:px-4 py-2 text-left">Courses</th>
                                <th className="px-2 sm:px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentStudents.map((student, index) => (
                                <tr key={student.id} className={isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
                                    <td className={`px-2 sm:px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{index + 1 + (currentPage - 1) * studentsPerPage}</td>
                                    <td className={`px-2 sm:px-4 py-2 break-words max-w-[120px] sm:max-w-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{student.name}</td>
                                    <td className={`px-2 sm:px-4 py-2 break-words max-w-[140px] sm:max-w-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{student.email}</td>
                                    <td className={`px-2 sm:px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{student.phone}</td>
                                    <td className={`px-2 sm:px-4 py-2 break-words max-w-[140px] sm:max-w-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{renderCourses(student.course)}</td>
                                    <td className="px-2 sm:px-4 py-2 flex flex-col sm:flex-row gap-2 justify-center items-center">
                                        <button
                                            onClick={() => handleAction('view', student.id)}
                                            className={`bg-blue-500 text-white px-3 py-1 rounded-md ${isDarkMode ? 'hover:bg-blue-400' : 'hover:bg-blue-600'}`}
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleAction('edit', student.id)}
                                            className={`bg-yellow-500 text-white px-3 py-1 rounded-md ${isDarkMode ? 'hover:bg-yellow-400' : 'hover:bg-yellow-600'}`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleAction('delete', student.id)}
                                            className={`bg-red-500 text-white px-3 py-1 rounded-md ${isDarkMode ? 'hover:bg-red-400' : 'hover:bg-red-600'}`}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleAction(student.block ? 'unblock' : 'block', student.id)}
                                            className={`px-3 py-1 rounded-md ${student.block ? 'bg-green-500' : 'bg-gray-500'} text-white ${isDarkMode ? 'hover:bg-green-400' : 'hover:bg-gray-400'}`}
                                        >
                                            {student.block ? 'Unblock' : 'Block'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-2">
                    <button
                        onClick={() => handlePagination(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 bg-gray-300 text-gray-800 rounded-md ${currentPage === 1 ? 'opacity-50' : 'hover:bg-gray-400'}`}
                    >
                        Previous
                    </button>
                    <span className="text-xs sm:text-base">Page {currentPage} of {totalPages}</span>
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
            {isModalOpen && selectedStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg mx-auto">
                        <AddRemoveStudentFromCourse student={selectedStudent} closeModal={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageStudent;
