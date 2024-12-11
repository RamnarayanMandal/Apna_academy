import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdTrash, IoMdCreate } from 'react-icons/io'; // Importing icons for delete and edit
import { useParams } from 'react-router-dom'; 
import { useTheme } from '../../ThemeProvider';// Import useTheme to access the theme context
import { TeacherSideBar } from '../Teacher/TeacherSideBar';
import AddQuestions from './AddQuestions'; // Import AddQuestions component
import Swal from 'sweetalert2';

const GetAllQuestion = () => {
  const { examId } = useParams();
  const { isDarkMode } = useTheme(); // Get the current theme
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [questionsPerPage] = useState(5); // Number of questions per page
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false); // Track visibility of AddQuestions form
  const [editingQuestion, setEditingQuestion] = useState(null); // Track the question being edited
  const [token] = useState(localStorage.getItem('token'));
  const BASE_URL = import.meta.env.VITE_API_URL;

  // Fetch all questions when the component mounts or examId/token changes
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/exams/${examId}/questions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(response.data || []);
      } catch (error) {
        console.error('Error fetching questions:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an error fetching the questions.',
        });
      }
    };

    fetchQuestions();
  }, [examId, token]);

  // Pagination Logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle deleting a question
  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`${BASE_URL}/api/questions/${questionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The question was deleted successfully.',
      });
      // Re-fetch questions after deletion
      setQuestions(questions.filter((question) => question.id !== questionId));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error deleting the question.',
      });
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Sidebar */}
      <TeacherSideBar />

      {/* Main Content Area */}
      <div
        className={`flex-1 p-6 overflow-y-auto lg:ml-64 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-900'}`}
      >
        {/* Button to show the Add Questions form */}
        <button
          className={`px-4 py-2 rounded-md mb-4 ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
          onClick={() => setShowAddQuestionForm(true)} // Show the Add Questions form
        >
          Add New Question
        </button>

        {/* Questions Table */}
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white mb-6">
          <table className={`min-w-full table-auto border-collapse text-sm ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
            <thead>
              <tr className={`text-left ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <th className="px-6 py-3 font-semibold">S/N</th>
                <th className="px-6 py-3 font-semibold">Question</th>
                <th className="px-6 py-3 font-semibold">Choice 1</th>
                <th className="px-6 py-3 font-semibold">Choice 2</th>
                <th className="px-6 py-3 font-semibold">Choice 3</th>
                <th className="px-6 py-3 font-semibold">Choice 4</th>
                <th className="px-6 py-3 font-semibold">Correct Answer</th>
                <th className="px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentQuestions.map((question, index) => (
                <tr
                  key={question.id}
                  className={`${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  } transition duration-300 ease-in-out`}
                >
                  <td className="px-6 py-4">{index + 1}</td> {/* Serial number */}
                  <td className="px-6 py-4">{question.question}</td>
                  <td className="px-6 py-4">{question.choice1}</td>
                  <td className="px-6 py-4">{question.choice2}</td>
                  <td className="px-6 py-4">{question.choice3}</td>
                  <td className="px-6 py-4">{question.choice4}</td>
                  <td className="px-6 py-4">{question.correctAnswer}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center space-x-3">
                      {/* Edit Icon */}
                      <button
                        onClick={() => {
                          setEditingQuestion(question); // Set the question being edited
                          setShowAddQuestionForm(true); // Open the AddQuestions form for editing
                        }}
                        className={`p-2 border-2 ${isDarkMode ? 'border-yellow-500 text-yellow-500' : 'border-blue-500 text-blue-500'} rounded-full hover:${isDarkMode ? 'bg-yellow-100' : 'bg-blue-100'} transition-all duration-300`}
                      >
                        <IoMdCreate size={20} />
                      </button>

                      {/* Delete Icon */}
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className={`p-2 border-2 ${isDarkMode ? 'border-red-500 text-red-500' : 'border-red-500 text-red-500'} rounded-full hover:bg-red-100 transition-all duration-300`}
                      >
                        <IoMdTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-6">
          <nav className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${
                isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-900'
              } px-4 py-2 border border-gray-300 rounded-l-md`}
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastQuestion >= questions.length}
              className={`${
                isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-900'
              } px-4 py-2 border border-gray-300 rounded-r-md`}
            >
              Next
            </button>
          </nav>
        </div>

        {/* Render AddQuestions form only if showAddQuestionForm is true */}
        {showAddQuestionForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <AddQuestions
              examId={examId}
              question={editingQuestion} // Pass the question data if editing
              onClose={() => setShowAddQuestionForm(false)} // Close the form
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllQuestion;
