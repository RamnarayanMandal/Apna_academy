import React, { useState } from 'react';
import axios from 'axios';
import { IoMdCloseCircle } from 'react-icons/io';

const Registration = ({setShowModal}) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    type: "student",
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  // State for error messages
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Simple validation function
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid email is required";
    if (!formData.password || formData.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (!formData.phone || formData.phone.length < 10) errors.phone = "Phone number must be at least 10 digits";
    if (!formData.address) errors.address = "Address is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Sending data to the backend with role as a query parameter
      axios.post('http://localhost:8081/api/auth/register', formData, {
        params: {
          role: 'student'  // Adding the query parameter 'role'
        }
      })
        .then((response) => {
          console.log('Registration Successful:', response.data);
          // Handle success (e.g., redirect to login page or show success message)
        })
        .catch((error) => {
          console.error('Error during registration:', error);
        });
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg relative">
      <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          aria-label="Close modal"
        >
          <IoMdCloseCircle className="text-2xl" />
        </button>
        <h2 className="text-2xl font-semibold text-center mb-6">Student Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-6 ">
           
        
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Address Field */}
          <div className="form-group">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
