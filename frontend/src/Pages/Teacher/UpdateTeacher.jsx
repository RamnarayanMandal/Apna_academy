import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const UpdateTeacher = ({ profileData, setShowModal }) => {
  const [teacherData, setTeacherData] = useState({
    subjectSpecialization: profileData.subjectSpecialization || '',
    phoneNo: profileData.phoneNo || '',
    address: profileData.address || '',
    qualification: profileData.qualification || '',
    profilePicture: null, // Initially, no file selected
    dateOfBirth: profileData.dateOfBirth || '',
    gender: profileData.gender || 'male', // Default gender
  });
  
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input for profile picture
  const handleFileChange = (e) => {
    setTeacherData((prevData) => ({
      ...prevData,
      profilePicture: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', teacherData.name);
    formData.append('phoneNo', teacherData.phoneNo);
    formData.append('address', teacherData.address);
    formData.append('dateOfBirth', teacherData.dateOfBirth);
    formData.append('gender', teacherData.gender);

    // Append the profile picture if available
    if (teacherData.profilePicture) {
      formData.append('profilePicture', teacherData.profilePicture);
    }

    try {
      // Send the request to the backend to update the teacher data
      const response = await axios.put(`${BASE_URL}/api/teacher/${profileData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setShowModal(false); // Close the modal after successful update
      }
    } catch (err) {
      console.error('Error updating teacher:', err);
      setError('Failed to update teacher data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ensure that if profileData changes, teacherData is updated accordingly
    if (profileData) {
      setTeacherData({
        subjectSpecialization: profileData.subjectSpecialization || '',
        phoneNo: profileData.phoneNo || '',
        address: profileData.address || '',
        qualification: profileData.qualification || '',
        profilePicture: null, // Reset the profile picture on profile data update
        dateOfBirth: profileData.dateOfBirth || '',
        gender: profileData.gender || 'male',
      });
    }
  }, [profileData]); // Re-run this effect if profileData changes

  return (
    <div className="update-teacher-form">
      <h2 className="text-2xl font-bold mb-4">Update Teacher Profile</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-semibold">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={teacherData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Subject Specialization */}
        <div>
          <label htmlFor="subjectSpecialization" className="block font-semibold">Subject Specialization</label>
          <input
            type="text"
            id="subjectSpecialization"
            name="subjectSpecialization"
            value={teacherData.subjectSpecialization}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNo" className="block font-semibold">Phone Number</label>
          <input
            type="text"
            id="phoneNo"
            name="phoneNo"
            value={teacherData.phoneNo}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="10-15 digits"
            minLength="10"
            maxLength="15"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block font-semibold">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={teacherData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Qualification */}
        <div>
          <label htmlFor="qualification" className="block font-semibold">Qualification</label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            value={teacherData.qualification}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label htmlFor="profilePicture" className="block font-semibold">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dateOfBirth" className="block font-semibold">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={teacherData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block font-semibold">Gender</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={teacherData.gender === 'male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={teacherData.gender === 'female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={teacherData.gender === 'other'}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTeacher;
