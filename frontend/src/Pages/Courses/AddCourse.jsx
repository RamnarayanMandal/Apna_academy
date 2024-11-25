import axios from "axios";
import React, { useEffect, useState } from "react";

const AddCourse = ({ selectCourse }) => {
  const [course, setCourse] = useState({
    courseName: "",
    courseCode: "",
    description: "",
    startingDate: "",
    endDate: "",
    teacher: "",
    students: [],
    notebook: [],
    video: [],
    review: [],
    image: null, // To store the uploaded image file
  });


  const BASE_URL = import.meta.env.VITE_API_URL; console.log(selectCourse);
  const token = localStorage.getItem('token');

 
  useEffect(() => {
    if (selectCourse) {
      setCourse({
        ...selectCourse,
        startingDate: selectCourse.startingDate || "",
        endDate: selectCourse.endDate || "",
        image: null, // Reset image to avoid pre-filling a file input
      });
    }
  }, [selectCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCourse({
      ...course,
      image: file, // Store the image file
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const formData = new FormData();
    Object.keys(course).forEach((key) => {
      if (key === "image" && course[key]) {
        formData.append(key, course[key]);
      } else {
        formData.append(key, JSON.stringify(course[key]));
      }
    });

    if (selectCourse) {
      console.log("Updating Course:", course);
      // Logic for updating the course, e.g., axios.put(`/api/courses/${selectCourse.id}`, formData)
    } else {
      console.log("Adding New Course:", course);
      // Logic for adding a new course, e.g., axios.post('/api/courses', formData)

      const resp = axios.post(`${BASE_URL}/api/courses`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )


    }
  };

  return (
    <div className="container mx-auto p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">
        {selectCourse ? "Update Course" : "Add Course"}
      </h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="courseName">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={course.courseName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="courseCode">
            Course Code
          </label>
          <input
            type="text"
            id="courseCode"
            name="courseCode"
            value={course.courseCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={course.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="startingDate">
            Starting Date
          </label>
          <input
            type="date"
            id="startingDate"
            name="startingDate"
            value={course.startingDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="endDate">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={course.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="image">
            Upload Course Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {selectCourse ? "Update Course" : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
