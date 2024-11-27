import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';  // Use useParams for examId from URL
import { StudentSideBar } from '../Student/StudentSidebar';  // Import StudentSidebar component

const GetExamByCourse = () => {
  const { courseId } = useParams();  // Get courseId from URL params
  const [exam, setExam] = useState(null);  // State to store exam data
  const [loading, setLoading] = useState(false);  // State to track loading
  const [error, setError] = useState(null);  // State to track errors
  const navigate = useNavigate();  // useNavigate hook for navigation
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const studentId = localStorage.getItem('CurrentUserId');  // Assuming you have studentId stored in localStorage
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Function to handle the button click
  const handleButtonClick = async () => {
    setLoading(true);
    setError(null);  // Reset error state

    try {
      // First, make the PUT request to add the student to the exam
      const response = await axios.put(
        `${BASE_URL}/api/exams/exam/${exam.id}/student/${studentId}`,
        null,
        { headers }
      );

      // Log the response from the PUT request (optional)
      console.log(response.data);

      // After the API call is successful, navigate to the exam questions page
      navigate(`/student-questions/${courseId}`);  // Navigate to /student-questions/:courseId

    } catch (error) {
      setError("An error occurred while adding the student to the exam.");
      console.error(error);
    } finally {
      setLoading(false);  // Stop loading after the request is completed
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
        setExam(response.data);  // Update state with the fetched exam data
      } catch (err) {
        setError('Failed to fetch exam details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [courseId]);  // Re-run the fetch when the courseId changes

  return (
    <div className="flex min-h-screen mt-6"> {/* Add margin-top for space from top */} 
      {/* Sidebar on the left, fixed width */}
      <div className="w-1/4 min-w-[250px] text-white p-4">
        <StudentSideBar /> {/* Render the sidebar */}
      </div>

      {/* Main content area, takes remaining space */}
      <div className="flex-1 bg-white p-8">
        {loading && <div className="text-center text-lg font-semibold">Loading...</div>}
        {error && <div className="text-center text-lg text-red-500">{error}</div>}
        {exam && (
          <div className="max-w-full mx-auto"> {/* Ensure content stretches full width */}
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">{exam.examName}</h2>
          <p className="text-lg mb-4"><strong>Instructions:</strong> {exam.instructions}</p>
          <p className="text-lg mb-4"><strong>Exam Type:</strong> {exam.examType}</p>
          <p className="text-lg mb-4"><strong>Duration:</strong> {exam.duration} minutes</p>
          <p className="text-lg mb-4"><strong>Maximum Marks:</strong> {exam.maximumMarks}</p>
          <p className="text-lg mb-4"><strong>Passing Score:</strong> {exam.passingScore}</p>
          <p className="text-lg mb-4"><strong>Feedback:</strong> {exam.feedback}</p>
          <p className="text-lg mb-4"><strong>Start Time:</strong> {new Date(exam.startTime).toLocaleString()}</p>
          <p className="text-lg mb-4"><strong>End Time:</strong> {new Date(exam.endTime).toLocaleString()}</p>
        </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={handleButtonClick}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetExamByCourse;
