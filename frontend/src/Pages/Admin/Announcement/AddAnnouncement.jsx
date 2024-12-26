import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2

const BASE_URL = import.meta.env.VITE_API_URL;

const AddAnnouncement = ({ closeModal }) => {
  const adminId = localStorage.getItem('CurrentUserId');
  const [content, setContent] = useState('');
  const [roles, setRoles] = useState({
    student: false,
    teacher: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  // Handle checkbox state change for roles
  const handleRoleChange = (event) => {
    const { name, checked } = event.target;
    setRoles((prevRoles) => ({
      ...prevRoles,
      [name]: checked,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Construct roles array based on selected checkboxes
    const selectedRoles = [];
    if (roles.student) selectedRoles.push('student');
    if (roles.teacher) selectedRoles.push('teacher');

    // Create the new announcement object
    const newAnnouncement = { adminId,content, roles: selectedRoles };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/announcement`, // Assuming the correct endpoint
        newAnnouncement,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );    
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Announcement added successfully!',
        });
        closeModal(); // Close the modal after adding the announcement
      
    } catch (err) {
      console.error('Error adding announcement:', err);
      setError('Failed to add announcement. Please try again later.');

      // Show SweetAlert error notification
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error adding the announcement. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Announcement</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="content" className="block text-lg">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            rows="5"
            required
          />
        </div>

        {/* Role Selection (Checkboxes for Multiple Roles) */}
        <div className="mb-4">
          <label className="block text-lg">Select Role(s)</label>
          <div>
            <input
              type="checkbox"
              id="student"
              name="student"
              checked={roles.student}
              onChange={handleRoleChange}
            />
            <label htmlFor="student" className="ml-2">
              Student
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="teacher"
              name="teacher"
              checked={roles.teacher}
              onChange={handleRoleChange}
            />
            <label htmlFor="teacher" className="ml-2">
              Teacher
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Announcement'}
        </button>
      </form>
    </div>
  );
};

export default AddAnnouncement;
