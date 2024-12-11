import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoMdCloseCircle } from 'react-icons/io'; // Close icon

const AddQuestions = ({ examId, question, onClose }) => {
  const [token] = useState(localStorage.getItem('token')); // Token for Authorization
  const [questions, setQuestions] = useState([
    {
      question: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
      correctAnswer: '',
    },
  ]);

  const [isEditMode, setIsEditMode] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;
  // Effect to handle if the form is in edit mode or add mode
  useEffect(() => {
    if (question) {
      setQuestions([
        {
          question: question.question,
          choice1: question.choice1,
          choice2: question.choice2,
          choice3: question.choice3,
          choice4: question.choice4,
          correctAnswer: question.correctAnswer,
        },
      ]);
      setIsEditMode(true); // Edit mode
    } else {
      setIsEditMode(false); // Add mode
    }
  }, [question]);

  // Handle form input change (for each question in the list)
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  // Handle adding a new question form
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        correctAnswer: '',
      },
    ]);
  };

  // Handle form submission for adding or updating questions
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Make sure content-type is JSON
      };

      // Add questions to the exam (whether in add or edit mode)
      await axios.post(`${BASE_URL}/api/exams/${examId}/questions`, questions, { headers });

      Swal.fire({
        icon: 'success',
        title: isEditMode ? 'Updated!' : 'Added!',
        text: isEditMode
          ? 'The questions were updated successfully.'
          : 'The new questions were added successfully.',
      });

      onClose(); // Close the modal form after successful submission
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error saving the question(s).',
      });
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-900"
        >
          <IoMdCloseCircle size={30} />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-center">
          {isEditMode ? 'Edit Question' : 'Add New Question(s)'}
        </h2>
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Question</label>
                <input
                  type="text"
                  name="question"
                  value={question.question}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Choice 1</label>
                  <input
                    type="text"
                    name="choice1"
                    value={question.choice1}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Choice 2</label>
                  <input
                    type="text"
                    name="choice2"
                    value={question.choice2}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Choice 3</label>
                  <input
                    type="text"
                    name="choice3"
                    value={question.choice3}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Choice 4</label>
                  <input
                    type="text"
                    name="choice4"
                    value={question.choice4}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium">Correct Answer</label>
                <input
                  type="text"
                  name="correctAnswer"
                  value={question.correctAnswer}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Remove this question */}
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Question {index + 1}
                </button>
              )}

              <hr className="my-4" />
            </div>
          ))}

          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              Add Another Question
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isEditMode ? 'Update Questions' : 'Add Questions'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestions;
