import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { StudentSideBar } from './StudentSidebar';
import { useTheme } from '../../ThemeProvider';
import Swal from 'sweetalert2';

const Question = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const { courseId, examId } = useParams();
    const BASE_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const studentId = localStorage.getItem('CurrentUserId');
    const { isDarkMode } = useTheme();
    const { state: exam } = useLocation();

    // Fetch questions for the selected course ID
    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/questions/course/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setQuestions(response.data || []);
        } catch (error) {
            console.error('Error fetching questions for the course:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There was an error fetching the questions. Please try again.',
            });
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
            const submittedAnswers = {};
            questions.forEach(question => {
                if (selectedAnswers[question.id]) {
                    submittedAnswers[question.id] = selectedAnswers[question.id];
                }
            });

            if (Object.keys(submittedAnswers).length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'Please answer at least one question before submitting.',
                });
                return;
            }

            const response = await axios.post(`${BASE_URL}/api/exams/submit/${examId}`, submittedAnswers, {
                params: { studentId },
                headers: { Authorization: `Bearer ${token}` },
            });

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your answers have been submitted!',
            });
            navigate('/student-exam');  // Redirect to the Student Dashboard after submission
        } catch (error) {
            console.error('Error submitting answers:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There was an error submitting your answers. Please try again.',
            });
        }
    };

    // Handle cancel (navigate to the student dashboard)
    const handleCancel = () => {
        navigate('/student-exam');  // Redirect to the Student Dashboard
    };

    // Handle timeout
    const handleExamTimeout = () => {
        Swal.fire({
            icon: 'info',
            title: 'Time is up!',
            text: 'Your exam time has expired.',
        }).then(() => {
            navigate('/student-exam');  // Navigate to the Student Dashboard after timeout
        });
    };

    // Fetch questions once courseId is available
    useEffect(() => {
        if (courseId) {
            fetchQuestions();
        }

        if (exam) {
            console.log("Exam loaded", exam.exam);

            const now = Date.now();  // Get the current time
            const endTime = exam.exam.endTime;  // Exam end time (in milliseconds)

            console.log("Exam end time", endTime);
            console.log("Current time", now);

            // Calculate time remaining until the exam ends
            const timeRemaining = endTime - now;  // Time left in milliseconds

            if (timeRemaining <= 0) {
                handleExamTimeout(); // If the time is already up, call the timeout function immediately
            } else {
                // Set a timeout to handle exam expiry when the time remaining reaches 0
                const timeout = setTimeout(handleExamTimeout, timeRemaining);

                // Cleanup timeout on component unmount or when exam data changes
                return () => clearTimeout(timeout);
            }
        }
    }, [courseId, exam]); // Only re-run when courseId or exam data changes

    return (
        <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}>
            {/* Sidebar */}
            <div className="fixed z-40">
                <StudentSideBar />
            </div>

            {/* Main content area */}
            <div className="flex-1 p-6 w-full lg:ml-64 ml-20 mt-20">
                <h1 className={`text-3xl font-semibold text-center ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-6`}>
                    Wishing You Success!
                </h1>

                {questions.length === 0 ? (
                    <p className={`text-xl text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No questions available for this course.
                    </p>
                ) : (
                    <div className={`course-section shadow-lg rounded-lg p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        <h2 className="text-2xl font-semibold mb-4">Questions:</h2>
                        <ol className="list-decimal pl-5 space-y-4">
                            {questions.map((question, index) => (
                                <li key={question.id} className="space-y-2">
                                    <p className="text-lg font-medium">{index + 1}. {question.question}</p>
                                    <ul className="space-y-2">
                                        {['choice1', 'choice2', 'choice3', 'choice4'].map((choice, idx) => (
                                            <li key={idx}>
                                                <label className={`flex items-center space-x-2 text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
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
                        <div className="mt-6 flex justify-between gap-2">
                            <button
                                className={`px-6 py-3 font-semibold rounded-md ${isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                                onClick={handleSubmit}
                            >
                                Submit Answers
                            </button>

                            <button
                                className={`px-6 py-3 font-semibold rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gray-500 hover:bg-gray-600'} text-white`}
                                onClick={handleCancel}
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
