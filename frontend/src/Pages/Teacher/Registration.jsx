import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../ThemeProvider';

const Registration = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    type: "teacher",
    name: '',
    email: '',
    password: '',
    subjectSpecialization: '',
    phoneNo: '',
    address: '',
    qualification: '',
    courses: [''], // Initially with one empty course field
  });

  // State for error messages
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;

  const { isDarkMode } = useTheme();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle changes for courses (dynamically adding/removing fields)
  const handleCourseChange = (index, e) => {
    const updatedCourses = [...formData.courses];
    updatedCourses[index] = e.target.value;
    setFormData({
      ...formData,
      courses: updatedCourses,
    });
  };

  // Add a new empty course field
  const addCourseField = () => {
    setFormData({
      ...formData,
      courses: [...formData.courses, ''],
    });
  };

  // Remove a course field
  const removeCourseField = (index) => {
    const updatedCourses = formData.courses.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      courses: updatedCourses,
    });
  };

  // Simple validation function
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid email is required";
    if (!formData.password || formData.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (!formData.phoneNo || formData.phoneNo.length < 10) errors.phoneNo = "Phone number must be at least 10 digits";
    if (!formData.subjectSpecialization) errors.subjectSpecialization = "Subject specialization is required";
    if (!formData.qualification) errors.qualification = "Qualification is required";
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors, false otherwise
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submit triggered');
    
    // Validate form data
    const validationError = validateForm();
    if (!validationError) {
      console.log('Validation failed', errors);
      return; // Early return if validation fails
    }

    setLoading(true); // Show loading indicator
    console.log('Sending data to server:', formData);

    try {
      // Send data to the backend API
      const response = await axios.post(`${BASE_URL}/api/auth/register`, formData, {
        params: {
          role: formData.type,  // Use the formData.type (which could be 'student' or 'teacher')
        }
      });
      
      console.log('Registration successful:', response.data);
      setLoading(false);

      // Optional: Reset form or redirect to another page
      // setFormData({ ...formData, name: '', email: '', password: '', ... })

    } catch (error) {
      console.error('Error during registration:', error);
      setErrors({ form: 'Registration failed. Please try again.' });
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} p-8 rounded-lg shadow-lg w-full max-w-md`}>
        <h2 className="text-2xl font-semibold text-center mb-6">Teacher Registration</h2>
        
        {/* Display general error message */}
        {errors.form && <p className="text-red-500 text-center">{errors.form}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Subject Specialization */}
          <div className="form-group">
            <label htmlFor="subjectSpecialization" className="block text-sm font-medium text-gray-700">Subject Specialization</label>
            <input
              type="text"
              id="subjectSpecialization"
              name="subjectSpecialization"
              value={formData.subjectSpecialization}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.subjectSpecialization && <p className="text-red-500 text-sm">{errors.subjectSpecialization}</p>}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.phoneNo && <p className="text-red-500 text-sm">{errors.phoneNo}</p>}
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* Qualification */}
          <div className="form-group">
            <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">Qualification</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
          </div>

          {/* Courses (dynamic fields) */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Courses</label>
            {formData.courses.map((course, index) => (
              <div key={index} className="flex space-x-2 items-center">
                <input
                  type="text"
                  value={course}
                  onChange={(e) => handleCourseChange(index, e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeCourseField(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addCourseField} className="text-blue-500 mt-2">Add Course</button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
