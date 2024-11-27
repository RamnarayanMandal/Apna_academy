import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Import useParams and useNavigate
import { StudentSideBar } from './StudentSidebar';

const Question = () => {
    const [questions, setQuestions] = useState([]);  // Store questions for the current course
    const [selectedAnswers, setSelectedAnswers] = useState({});  // Store selected answers
    const { courseId } = useParams();  // Retrieve courseId from URL
    const BASE_URL = import.meta.env.VITE_API_URL; 
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); // Initialize useNavigate
    const studentId = localStorage.getItem('studentId');  // Assuming student ID is stored in localStorage

    // Fetch questions for the selected course ID
    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/questions/course/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setQuestions(response.data || []);  // Store questions by courseId
        } catch (error) {
            console.error('Error fetching questions for the course:', error);
        }
    };

    // Handle answer selection
    const handleAnswerChange = (questionId, selectedOption) => {
        setSelectedAnswers(prevState => ({
            ...prevState,
            [questionId]: selectedOption,
        }));
    };

    // Submit answers for the current course
    const handleSubmit = async () => {
        try {
            // Prepare the submitted answers in the correct format for the backend
            const submittedAnswers = {};
            questions.forEach(question => {
                // Only add answers that were selected
                if (selectedAnswers[question.id]) {
                    submittedAnswers[question.id] = selectedAnswers[question.id];
                }
            });

            const examId = "674577e380d6b443949d279b";  // Assuming courseId is the exam ID
            const response = await axios.post(`${BASE_URL}/api/submit/${examId}`, submittedAnswers, {
                params: { studentId },  // Include studentId as a query parameter
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log('Answers submitted successfully', response.data);
            alert('Your answers have been submitted!');
        } catch (error) {
            console.error('Error submitting answers:', error);
            alert('There was an error submitting your answers. Please try again.');
        }
    };

    // Handle cancel (navigate to the student dashboard)
    const handleCancel = () => {
        navigate('/student-exam');  // Redirect to the Student Dashboard
    };

    // Fetch questions once courseId is available
    useEffect(() => {
        if (courseId) {
            fetchQuestions();
        }
    }, [courseId]);  // Trigger when courseId changes

    return (
        <div className="flex min-h-screen bg-gray-200 text-gray-900">
            {/* Sidebar */}
            <div className="w-1/4 min-w-[250px]">
                <StudentSideBar />
            </div>

            {/* Main content area */}
            <div className="flex-1 p-6 w-full lg:mx-12 ml-0">
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Questions for Course ID: {courseId}</h1>

                {questions.length === 0 ? (
                    <p className="text-xl text-center text-gray-500">No questions available for this course.</p>
                ) : (
                    <div className="course-section bg-white shadow-lg rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Questions:</h2>
                        <ol className="list-decimal pl-5 space-y-4">
                            {questions.map((question, index) => (
                                <li key={question.id} className="space-y-2">
                                    <p className="text-lg font-medium text-gray-800">{index + 1}. {question.question}</p>
                                    <ul className="space-y-2">
                                        {['choice1', 'choice2', 'choice3', 'choice4'].map((choice, idx) => (
                                            <li key={idx}>
                                                <label className="flex items-center space-x-2 text-lg">
                                                    <input
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        value={question[choice]}
                                                        checked={selectedAnswers[question.id] === question[choice]}
                                                        onChange={() => handleAnswerChange(question.id, question[choice])}
                                                        className="h-5 w-5 text-blue-500"
                                                    />
                                                    <span>{question[choice]}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ol>

                        {/* Submit and Cancel Buttons */}
                        <div className="mt-6 flex justify-between">
                            <button
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={handleSubmit}
                            >
                                Submit Answers
                            </button>

                            {/* Cancel Button */}
                            <button
                                className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                onClick={handleCancel}  // Cancel action
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Question;
