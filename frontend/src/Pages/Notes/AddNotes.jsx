import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTimes } from 'react-icons/fa';  // Import the cross icon

const AddNotes = ({ setShowAddForm, selectedNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [pdfFile, setPdfFile] = useState(null);  // State to store selected PDF file
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);  // State to store courses
  const [selectedCourseId, setSelectedCourseId] = useState('');  // State for the selected course
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const teacherId = localStorage.getItem('CurrentUserId');
   console.log("selectedNote     "+selectedNote)
  // Fetch all courses (for Teacher)
  const fetchAllCoursesOfTeacher = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/course/teacher/getAllCourses/${teacherId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      Swal.fire('Error', 'Failed to fetch courses.', 'error');
    }
  };

  // If selectedNote exists, we are editing an existing note
  useEffect(() => {
    if (selectedNote) {
      // Populate form fields with the existing note's data
      setTitle(selectedNote.title || '');
      setDescription(selectedNote.description || '');
      setContent(selectedNote.content || '');
      setSelectedCourseId(selectedNote.courseId || ''); // Set selected course for update
    }
    fetchAllCoursesOfTeacher();  // Fetch courses when the component mounts
  }, [selectedNote]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      Swal.fire('Error', 'Please select a valid PDF file.', 'error');
    }
  };

  // Function to handle the submit (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if all required fields are filled
    if (!title || !description || !content || !selectedCourseId) {
      Swal.fire('Error', 'Please fill in all fields.', 'error');
      setIsLoading(false);
      return;
    }

    // Form data including title, description, content, teacherId, and selected courseId
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('teacherId', teacherId);  // Add teacherId to formData
    formData.append('courseId', selectedCourseId);  // Add courseId to formData

    if (pdfFile) {
      formData.append('pdfFile', pdfFile);  // Attach PDF file
    }

    try {
      let response;
      if (selectedNote) {
        // Update the note
        response = await axios.put(
          `${BASE_URL}/api/notes/${selectedNote.id}`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        Swal.fire('Success', 'Note updated successfully!', 'success');
      } else {
        // Create a new note
        response = await axios.post(
          `${BASE_URL}/api/notes/upload`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        Swal.fire('Success', 'Note added successfully!', 'success');
      }

      setShowAddForm(false); // Close the form after submission
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'There was an error saving the note. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div
        className={`relative bg-white p-6 rounded-md shadow-md w-96 ${selectedNote ? 'bg-gray-800 ' : 'bg-white text-gray-900'}`}
      >
        {/* Close Button (Cross Icon) */}
        <button
          onClick={() => setShowAddForm(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-4">{selectedNote ? 'Update Note' : 'Add Note'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium mb-2">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Course Dropdown */}
          <div className="mb-4">
            <label htmlFor="courseId" className="block text-sm font-medium mb-2">Select Course</label>
            <select
              id="courseId"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {/* PDF File Upload */}
          <div className="mb-4">
            <label htmlFor="pdfFile" className="block text-sm font-medium mb-2">Upload PDF</label>
            <input
              type="file"
              id="pdfFile"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {isLoading ? 'Saving...' : selectedNote ? 'Update Note' : 'Add Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
