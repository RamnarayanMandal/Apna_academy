import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    type: "student",  // Default role is 'student'
    email: '',
    password: '',
  });

  // State for error messages
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle role change (Student / Teacher)
  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      type: e.target.value // Switch the type to either 'student' or 'teacher'
    });
  };

  // Simple validation function
  const validateForm = () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Please enter a valid email.';
    }
    if (!formData.password || formData.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    return '';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationError = validateForm();
    if (validationError) {
      setErrors(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', formData, {
        params: {
          role: formData.type, // Use formData.type to set role dynamically
        },
      });
      console.log('Login successful:', response.data);
      // Handle successful login (e.g., save token, redirect, etc.)
      setLoading(false);
    } catch (error) {
      console.error('Login error:', error);
      setErrors('Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">{formData.type === 'student' ? 'Student Login' : 'Teacher Login'}</h2>

        {/* Role Selection */}
        <div className="mb-4 flex justify-center space-x-6">
          <label>
            <input
              type="radio"
              value="student"
              checked={formData.type === 'student'}
              onChange={handleRoleChange}
              className="mr-2"
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              value="teacher"
              checked={formData.type === 'teacher'}
              onChange={handleRoleChange}
              className="mr-2"
            />
            Teacher
          </label>
        </div>

        {errors && <p className="text-red-500 text-center">{errors}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
