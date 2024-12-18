import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; 
import { useTheme } from '../../ThemeProvider';
import Swal from 'sweetalert2'; 

const StudentResult = ({ courseId, token }) => {
  const { isDarkMode } = useTheme();
  const [studentResults, setStudentResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const BASE_URL = import.meta.env.VITE_API_URL;

  // Fetch student results by courseId
  const fetchStudentsByCourseId = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/results/student-results/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Flatten the data to get a list of all student exams
      const flattenedResults = response.data.reduce((acc, course) => {
        if (course.studentExams && Array.isArray(course.studentExams)) {
          course.studentExams.forEach(exam => {
            acc.push({
              id: exam.studentId,
              studentName: exam.studentName,
              courseName: course.courseName,
              examName: exam.examName,
              totalMarks: exam.totalMarks,
              isPassed: exam.isPassed,
              done: exam.done,
            });
          });
        }
        return acc;
      }, []);

      setStudentResults(flattenedResults); // Set the flattened data in state
    } catch (error) {
      console.error('Error fetching student results:', error);
      Swal.fire('Error', 'Failed to fetch student results.', 'error');
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchStudentsByCourseId(); // Fetch results when courseId changes
    }
  }, [courseId]);  // Re-fetch if courseId changes

  // Filter results based on searchTerm
  const filteredResults = studentResults.filter((result) =>
    result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Main Content */}
      <div className="flex-1 p-8 relative">

        

        {/* Table to display student results */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className={`text-left ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}>
              <tr>
                <th className="p-4 font-semibold border-b">Student Name</th>
                <th className="p-4 font-semibold border-b">Course Name</th>
                <th className="p-4 font-semibold border-b">Exam Name</th>
                <th className="p-4 font-semibold border-b">Total Marks</th>
                <th className="p-4 font-semibold border-b">Passed</th>
                <th className="p-4 font-semibold border-b">Completed</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <tr key={result.id} className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} hover:bg-blue-100`}>
                    <td className="p-4 border-b">{result.studentName}</td>
                    <td className="p-4 border-b">{result.courseName}</td>
                    <td className="p-4 border-b">{result.examName}</td>
                    <td className="p-4 border-b">{result.totalMarks}</td>
                    <td className="p-4 border-b">{result.isPassed ? 'Yes' : 'No'}</td>
                    <td className="p-4 border-b">{result.done ? 'Yes' : 'No'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentResult;
