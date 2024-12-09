import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import AddExam from './AddExam'; // Assuming the AddExam component exists
import { IoMdCloseCircle } from 'react-icons/io';

const GetAllExam = ({ courseId ,courseName}) => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [exams, setExams] = useState([]);
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const [showModel, setShowModal] = useState(false);
  const [selectExam, setSelectExam] = useState(null);
  const navigate = useNavigate();

  // Fetch exams for a given course
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
    fetchExams(); // Fetch exams when component mounts
  }, [courseId]);

  // Sorting functions
  const handleSortByAlphabet = () => {
    const sortedExams = [...exams].sort((a, b) =>
      a.examName.localeCompare(b.examName)
    );
    setExams(sortedExams);
  };

  const handleSortByDate = () => {
    const sortedExams = [...exams].sort(
      (a, b) => new Date(a.startTime) - new Date(b.startTime)
    );
    setExams(sortedExams);
  };

  // Filter exams based on search term
  const filteredExams = exams.filter((exam) =>
    exam.examName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding exam
  const handleAddExam = () => {
    setShowModal(true);
  };

  // Handle editing exam
  const handleEditExam = (exam) => {
    setShowModal(true);
    setSelectExam(exam);
  };

  return (
    <div className={`p-6 w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}>
      {/* Search and Add Button */}
      <div className="flex justify-between flex-wrap gap-4 items-center w-full mb-6">
        <div className="flex items-center bg-white shadow-md rounded-md p-2 w-auto">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none bg-transparent w-full"
          />
        </div>
        <button
          className={`flex items-center px-4 py-2 rounded-md font-semibold border ${isDarkMode ? 'border-white text-white' : 'border-gray-500 text-gray-900'}`}
          onClick={handleAddExam}
        >
          Add New Exam
        </button>
      </div>

      {/* Sort Buttons */}
      <div className="flex justify-start gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
          onClick={handleSortByAlphabet}
        >
          Sort by Name
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
          onClick={handleSortByDate}
        >
          Sort by Date
        </button>
      </div>

      {/* Exam List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className={`p-4 font-serif shadow-lg rounded-md transform transition duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-blue-100 text-gray-900'}`}
          >
            <h2 className="text-xl font-bold mb-2">{exam.examName}</h2>
            <p className="text-sm mb-4">
              {isDarkMode ? '📘' : '📗'} {exam.instructions}
            </p>
            <div className="text-sm flex justify-between mb-4">
              <p>
                <span className="font-semibold">Start Time:</span> {new Date(exam.startTime).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">End Time:</span> {new Date(exam.endTime).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-center mb-4 mt-4 flex-wrap gap-4">
              {/* Update Button */}
              <button
                className={`flex items-center px-4 py-2 rounded-md font-semibold border ${isDarkMode ? 'border-white text-white hover:bg-white hover:text-gray-900' : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'}`}
                onClick={() => handleEditExam(exam)}
              >
                Update
              </button>

              {/* Delete Button */}
              <button
                className={`flex items-center px-4 py-2 rounded-md font-semibold border ${isDarkMode ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white' : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'}`}
                onClick={() => handleDeleteExam(exam.id)}
              >
                Delete
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
            <AddExam selectExam={selectExam} setShowModal={setShowModal} courseId={courseId} courseName={courseName} />
          </div>
        </div>
      )}

      {/* No Exams Found */}
      {filteredExams.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No exams found.</p>
      )}
    </div>
  );
};

export default GetAllExam;
