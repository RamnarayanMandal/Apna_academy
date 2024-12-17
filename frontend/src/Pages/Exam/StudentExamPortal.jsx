import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Use useParams for examId from URL
import { StudentSideBar } from '../Student/StudentSidebar'; // Import StudentSidebar component
import { useTheme } from '../../ThemeProvider';

const StudentExamPortal = () => {
  const { courseId } = useParams(); // Get courseId from URL params
  const [exam, setExam] = useState(null); // State to store exam data
  const [loading, setLoading] = useState(false); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const navigate = useNavigate(); // useNavigate hook for navigation
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const { isDarkMode } = useTheme();
  const studentId = localStorage.getItem('CurrentUserId'); // Assuming you have studentId stored in localStorage
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Function to handle the button click
  const handleButtonClick = async (exam) => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      // First, make the PUT request to add the student to the exam
      const response = await axios.put(
        `${BASE_URL}/api/exams/exam/${exam.id}/student/${studentId}`,
        null,
        { headers }
      );

    
     
      navigate(`/student-questions/${courseId}/${exam.id}`,{
        replace: true, // Replace the current history entry with a new one
        state: {exam }, // Pass the examId as a state parameter for the new page

      }); // Navigate to /student-questions/:courseId

    } catch (error) {
      setError('An error occurred while adding the student to the exam.');
      console.error(error);
    } finally {
      setLoading(false); // Stop loading after the request is completed
    }
  };

  // Fetch the exam data when the component is mounted
  useEffect(() => {
    const fetchExamData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/api/exams/course/${courseId}`,
          { headers }
        );
        setExam(response.data);
        localStorage.setItem('examId', response.data.id);
        // Update state with the fetched exam data
      } catch (err) {
        setError('Failed to fetch exam details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [courseId]); // Re-run the fetch when the courseId changes

  console.log(exam);

  // Back button handler
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}> {/* Dark mode styling */}
      {/* Sidebar on the left, fixed width */}
      <div className="fixed z-40">
        <StudentSideBar />
      </div>

      {/* Main content area, takes remaining space */}
      <div className="flex-1 justify-center items-center p-6 lg:ml-64 ml-20 lg:mt-20">
        {loading && (
          <div className="flex justify-center items-center min-h-screen">
            <div className="loader"></div> {/* Spinner */}
          </div>
        )}

        {error && <div className="text-center text-lg text-red-500">{error}</div>}

        {exam && (
          <div className="flex items-center justify-center content-center flex-wrap gap-8">
            {exam.map((examItem) => (
              <div key={examItem.id} className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'} dark:bg-gray-800 p-6 rounded-lg shadow-md`}>
                <h2 className="text-3xl font-bold text-indigo-600 mb-6">{examItem.examName}</h2>
                <p className="text-lg mb-4"><strong>Instructions:</strong> {examItem.instructions}</p>
                <p className="text-lg mb-4"><strong>Exam Type:</strong> {examItem.examType}</p>
                <p className="text-lg mb-4"><strong>Duration:</strong> {examItem.duration} minutes</p>
                <p className="text-lg mb-4"><strong>Maximum Marks:</strong> {examItem.maximumMarks}</p>
                <p className="text-lg mb-4"><strong>Passing Score:</strong> {examItem.passingScore}</p>
                <p className="text-lg mb-4"><strong>Feedback:</strong> {examItem.feedback}</p>
                <p className="text-lg mb-4"><strong>Start Time:</strong> {new Date(examItem.startTime).toLocaleString()}</p>
                <p className="text-lg mb-4"><strong>End Time:</strong> {new Date(examItem.endTime).toLocaleString()}</p>

                <div className="mt-6 text-center">
                  <button
                    onClick={()=>handleButtonClick(examItem)}
                    className={`py-2 px-6 rounded-lg shadow-md ${isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
                  >
                    Start Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="fixed right-5 top-5">
          <button
            onClick={handleBackClick}
            className={`py-2 px-6 mt-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-500 hover:bg-gray-600' : 'bg-gray-700 hover:bg-gray-800'} text-white`}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentExamPortal;
