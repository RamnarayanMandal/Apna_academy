import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdCloseCircle } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_URL;

const UpdateStudent = ({ setShowModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    profilePicture: '', // Add additional fields if required
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/student/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data); // Set the form data with the fetched student data
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id, token]); // Re-run effect if `id` or `token` changes

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
      // Sending the updated data to the backend using PUT
      axios.put(`${BASE_URL}/api/student/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
        params: {
          role: 'student', // Pass role as query parameter (optional)
        },
      })
        .then((response) => {
          console.log('Update Successful:', response.data);
          navigate("/Student-Dashbord")
          setShowModal(false); // Close the modal after update
        })
        .catch((error) => {
          console.error('Error during update:', error);
          // Handle failure (e.g., show error message)
        });
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          aria-label="Close modal"
        >
          <IoMdCloseCircle className="text-2xl" />
        </button>
        <h2 className="text-2xl font-semibold text-center mb-6">Update Student Information</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}  
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

    
          <div className="form-group">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone || ''} 
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
              placeholder="Enter your address"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
            {loading ? 'Updating...' : 'Update Student'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudent;
