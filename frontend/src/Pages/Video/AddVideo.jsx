import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddVideo = ({ selectVideo, setShowModal }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const teacherId = localStorage.getItem('CurrentUserId');
  const token = localStorage.getItem('token');
  
  // State to manage form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: null,
    videoFile: null,
    isPublished: true,
    courseId: '', // This will be the course ID
  });
  
  // State for courses
  const [courses, setCourses] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch courses of a specific teacher
  const fetchAllCoursesOfTeacher = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/course/teacher/getAllCourses/${teacherId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data || []);  // Set fetched courses
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchAllCoursesOfTeacher();  // Fetch courses when the component mounts

    // If selectVideo is passed as a prop, set the courseId to it
    if (selectVideo) {
      setFormData({
        ...formData,
        title: selectVideo.title || '',
        description: selectVideo.description || '',
        courseId: selectVideo.courseId || '',
        isPublished: selectVideo.isPublished || true,
      });
    }
  }, [selectVideo]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, thumbnail, videoFile, courseId, isPublished } = formData;
    setLoading(true);
    setErrorMessage(''); // Reset any previous error messages

    const form = new FormData();
    form.append('teacherId', teacherId);
    form.append('title', title);
    form.append('description', description);
    form.append('thumbnail', thumbnail);
    form.append('videoFile', videoFile);
    form.append('courseId', courseId);  // Send courseId
    form.append('isPublished', isPublished);

    try {
      let response;
      if (selectVideo) {
        // If we're updating an existing video or course, send a PUT request
        response = await axios.put(`${BASE_URL}/api/videos/${selectVideo.id}`, form, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        });
      } else {
        // If we're adding a new video, send a POST request
        response = await axios.post(`${BASE_URL}/api/videos/uploadVideo`, form, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        });
      }
      
      setFormData({
        title: '',
        description: '',
        thumbnail: null,
        videoFile: null,
        isPublished: true,
        courseId: '', // Reset courseId
      });
      setShowModal(false); // Close modal on success
    } catch (error) {
      setErrorMessage('Error uploading video');
      console.error('Error uploading video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">
        {selectVideo ? 'Update Video' : 'Upload New Video'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title and description fields */}
        {['title', 'description'].map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="font-medium text-lg mb-1">
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={field === 'description' ? 'textarea' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        {/* Thumbnail field */}
        <div className="flex flex-col">
          <label htmlFor="thumbnail" className="font-medium text-lg mb-1">Thumbnail</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
            required
          />
        </div>

        {/* Video File field */}
        <div className="flex flex-col">
          <label htmlFor="videoFile" className="font-medium text-lg mb-1">Video File</label>
          <input
            type="file"
            id="videoFile"
            name="videoFile"
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="video/*"
            required
          />
        </div>

        {/* Course Selection Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="courseId" className="font-medium text-lg mb-1">Select Course</label>
          <select
            id="courseId"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName} {/* Display course name */}
              </option>
            ))}
          </select>
        </div>

        {/* Publish checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600"
          />
          <label htmlFor="isPublished" className="font-medium text-lg">Publish Video?</label>
        </div>

        {/* Error message */}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          disabled={loading}
        >
         {loading ? "Processing..." : selectVideo ? "Update Video" : "Add Video"}
        </button>
      </form>
    </div>
  );
};

export default AddVideo;
