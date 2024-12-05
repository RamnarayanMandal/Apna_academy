import React, { useState } from 'react';
import axios from 'axios';

const AddVideo = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const teacherId = localStorage.getItem('CurrentUserId'); // Retrieve teacherId from localStorage
  const token = localStorage.getItem('token');
  // State to manage form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: null,
    videoFile: null,
    isPublished: true,
    courseId: '',
    // You can also set a role if needed, or leave it for future use
  });
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
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

    // if (!title || !description || !thumbnail || !videoFile || !courseId) {
    //   setErrorMessage('All fields are required');
    //   return;
    // }

    setLoading(true);
    setErrorMessage(''); // Reset any previous error messages

    const form = new FormData();
    // Append the teacherId directly to the form data
    form.append('teacherId', teacherId);
    form.append('title', title);
    form.append('description', description);
    form.append('thumbnail', thumbnail);
    form.append('videoFile', videoFile);
    form.append('courseId', courseId);
    form.append('isPublished', isPublished);

    try {
      const response = await axios.post(`${BASE_URL}/api/videos/uploadVideo`, form, {
        headers: { 'Content-Type': 'multipart/form-data' , Authorization: `Bearer ${token}` },
      });
       setFormData({
        title: '',
        description: '',
        thumbnail: null,
        videoFile: null,
        isPublished: true,
        courseId: '',
      });
    } catch (error) {
      setErrorMessage('Error uploading video');
      console.error('Error uploading video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Upload New Video</h1>
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
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default AddVideo;
