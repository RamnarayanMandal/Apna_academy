import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const AssignTeacherModel = ({ setShowModal, selectCourse }) => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [assignedTeachers, setAssignedTeachers] = useState([]); // Track assigned teachers
  const token = localStorage.getItem('token');
  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchAllTeacher = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/teacher/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(response.data || []);
      setFilteredTeachers(response.data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  useEffect(() => {
    fetchAllTeacher();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setFilteredTeachers(
        teachers?.filter((teacher) =>
          teacher?.name?.toLowerCase().includes(query.toLowerCase()) ||
          teacher?.subjectSpecialization?.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredTeachers(teachers);
    }
  };

  // Handle assigning teacher
  const handleAssignTeacher = async (teacherId) => {
    // Check if the teacher is already assigned to a course
    const isAssigned = assignedTeachers.some((assigned) => assigned.teacherId === teacherId);

    if (isAssigned) {
      alert('This teacher is already assigned to a course.');
      return;
    }

    console.log(selectCourse)

    try {
      // API call to assign the teacher to the course
      const response = await axios.put(
        `${BASE_URL}/api/course/teacher/${teacherId}/${selectCourse.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Assuming the API response has a success message
      if (response.status === 200) {
        setAssignedTeachers((prev) => [
          ...prev,
          { teacherId, courseName: selectCourse.courseName },
        ]);

        // Show success alert using SweetAlert2
        Swal.fire({
          title: 'Success!',
          text: `Teacher ${response.data.name} has been successfully assigned to ${selectCourse.courseName}`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      // Handle error
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while assigning the teacher. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }

    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full md:w-1/2">
        <div className="mb-4">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setShowModal(false)}
          >
            X
          </button>
        </div>

        {/* Course Information */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Course: {selectCourse.courseName}</h2>
          <p className="text-gray-700">Course Code: {selectCourse.courseCode}</p>
          <p className="text-gray-700">Description: {selectCourse.description}</p>
        </div>

        {/* Teacher Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Teachers by Name or Specialization"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

        {/* Teacher List with Scrollable Area */}
        <div className="max-h-60 overflow-y-auto space-y-4">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <h3 className="font-semibold">{teacher.name}</h3>
                  <p className="text-sm text-gray-600">{teacher.subjectSpecialization}</p>
                  <p className="text-sm text-gray-600">Qualification: {teacher.qualification}</p>
                </div>
                <button
                  onClick={() => handleAssignTeacher(teacher.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Assign
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No teachers found</p>
          )}
        </div>
      </div>
    </div>
  );
};
