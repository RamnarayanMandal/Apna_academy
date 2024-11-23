import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL;

const UpdateStudent = ({ studentData, setShowModal }) => {
  const [formData, setFormData] = useState(studentData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const { id } = useParams();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Simple validation function
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.phone || formData.phone.length < 10) errors.phone = 'Phone number must be at least 10 digits';
    if (!formData.address) errors.address = 'Address is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission for updating student data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      // Sending the updated data to the backend using PUT
      axios.put(`${BASE_URL}/api/student/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('Update Successful:', response.data);
          setShowModal(false); // Close the form after successful update
        })
        .catch((error) => {
          console.error('Error during update:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="update-student-form">
      <h2 className="text-2xl  font-bold text-center mb-6">Update Student Information</h2>

      <form onSubmit={handleSubmit} className="space-y-6 ">
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Address */}
        <div className="form-group">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          ></textarea>
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        <div className="flex space-x-4">
          {/* Update Student Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Student'}
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>

      </form>
    </div>
  );
};

export default UpdateStudent;
