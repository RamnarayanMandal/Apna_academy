import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { IoMdCloseCircle } from 'react-icons/io';
import AddExam from './AddExam'; // Assuming the AddExam component exists

const GetAllExam = ({ courseId, courseName }) => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectExam, setSelectExam] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10); // Adjust the number of exams per page
  const token = localStorage.getItem('token');
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchExams = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/exams/course/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExams(response.data || []);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, [courseId]);

  useEffect(() => {
    setFilteredExams(
      exams.filter((exam) =>
        exam.examName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, exams]);

  // Handle sort by name
  const handleSortByAlphabet = () => {
    const sortedExams = [...filteredExams].sort((a, b) =>
      a.examName.localeCompare(b.examName)
    );
    setFilteredExams(sortedExams);
  };

  // Handle sort by date
  const handleSortByDate = () => {
    const sortedExams = [...filteredExams].sort(
      (a, b) => new Date(a.startTime) - new Date(b.startTime)
    );
    setFilteredExams(sortedExams);
  };

  // Pagination: Calculate paginated exams
  const paginatedExams = filteredExams.slice((page - 1) * perPage, page * perPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleAddExam = () => {
    setShowModal(true); // Set the modal state to true when the "Add New Exam" button is clicked
  };

  const handleEditExam = (exam) => {
    setShowModal(true);
    setSelectExam(exam);
  };

  const handleDeleteExam = async (examid) => {
    try {
      await axios.delete(`${BASE_URL}/api/exams/${examid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedExams = exams.filter((exam) => exam.id !== examid);
      setExams(updatedExams);
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  // Navigate to view questions page
  const handleViewQuestions = (examId) => {
    navigate(`/teacher-get-questions/${examId}`); // Navigate to the view questions page
  };

  return (
    <div
      className={`p-6 w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}
    >
      <div className="flex justify-between items-center w-full mb-6">
        {/* Sort Buttons Container */}
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
            onClick={handleSortByAlphabet}
          >
            Sort by Name
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
            onClick={handleSortByDate}
          >
            Sort by Date
          </button>
        </div>

        {/* Add New Exam Button on the Right */}
        <button
          className={`flex items-center px-4 py-2 bg-black text-white rounded-md font-semibold border ${isDarkMode ? 'border-white text-white' : 'border-gray-500 text-gray-900'}`}
          onClick={handleAddExam} // Trigger modal to add a new exam
        >
          Add New Exam
        </button>
      </div>

      {/* Exams Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full table-auto border-collapse text-sm">
          <thead>
            <tr className={`bg-${isDarkMode ? 'gray-700' : 'gray-100'} text-left text-gray`}>
              <th className="px-6 py-3 font-semibold">Exam Name</th>
              <th className="px-6 py-3 font-semibold">Start Time</th>
              <th className="px-6 py-3 font-semibold">End Time</th>
              <th className="px-6 py-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedExams.map((exam) => (
              <tr key={exam.id} className={`hover:bg-${isDarkMode ? 'gray-800' : 'blue-50'} transition-all duration-200`}>
                <td className="px-6 py-4">{exam.examName}</td>
                <td className="px-6 py-4">{new Date(exam.startTime).toLocaleString()}</td>
                <td className="px-6 py-4">{new Date(exam.endTime).toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-semibold ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
                    onClick={() => handleEditExam(exam)}
                  >
                    Edit
                  </button>
                  <button
                    className={`ml-2 px-4 py-2 rounded-md text-sm font-semibold ${isDarkMode ? 'bg-red-500 text-white hover:bg-red-400' : 'bg-red-600 text-white hover:bg-red-500'}`}
                    onClick={() => handleDeleteExam(exam.id)}
                  >
                    Delete
                  </button>

                  {/* View Questions Button */}
                  <button
                    className={`ml-2 px-4 py-2 rounded-md text-sm font-semibold ${isDarkMode ? 'bg-purple-500 text-white hover:bg-purple-400' : 'bg-purple-600 text-white hover:bg-purple-500'}`}
                    onClick={() => handleViewQuestions(exam.id)} // Navigate to the View Questions page
                  >
                    View Questions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-500"
        >
          Previous
        </button>
        <span className="text-sm self-center">
          Page {page} of {Math.ceil(filteredExams.length / perPage)}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page * perPage >= filteredExams.length}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-500"
        >
          Next
        </button>
      </div>

      {/* Add Exam Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              onClick={() => setShowModal(false)} // Close the modal when cross icon is clicked
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <IoMdCloseCircle size={24} />
            </button>
            <AddExam courseId={courseId} courseName={courseName} setShowModal={setShowModal} selectExam={selectExam} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllExam;
