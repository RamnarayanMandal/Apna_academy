import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL;

const UpdateStudent = ({ profileData, setShowModal }) => {
  const [formData, setFormData] = useState({
    name: profileData?.name || '',
    email: profileData?.email || '',
    phone: profileData?.phone || '',
    address: profileData?.address || '',
    profilePicture: profileData?.profilePicture || '',
    dateOfBirth: profileData?.dateOfBirth || '',
    gender: profileData?.gender || '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(profileData?.profilePicture || ''); 
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

  // Handle profile picture file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected File:", file); // Debug the selected file
    if (file) {
      setFormData({
        ...formData,
        profilePicture: file,
      });
  
      // Show image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  // Simple validation function
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.phone || formData.phone.length < 10) errors.phone = 'Phone number must be at least 10 digits';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.profilePicture) errors.profilePicture = 'Profile picture is required';
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) errors.gender = 'Gender is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

 // Ensure the profile picture is appended properly
 const handleSubmit = (e) => {
  e.preventDefault();

  if (validateForm()) {
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('dateOfBirth', formData.dateOfBirth);
    formDataToSend.append('gender', formData.gender);

    if (formData.profilePicture) {
      formDataToSend.append('profilePicture', formData.profilePicture);
    }

    // Log FormData entries for debugging
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }

    // Sending the updated data to the backend using PUT
    axios.put(`${BASE_URL}/api/student/${id}`, formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
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
      <h2 className="text-2xl font-bold text-center mb-6">Update Student Information</h2>

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

        {/* Profile Picture */}
        <div className="form-group">
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture}</p>}

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Profile Preview" className="w-24 h-24 object-cover rounded-md" />
            </div>
          )}
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div className="flex justify-center items-center space-x-4">
          {/* Update Student Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudent;
