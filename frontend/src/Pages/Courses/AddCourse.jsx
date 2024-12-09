import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2 for success messages
import ReactQuill from "react-quill"; // Import Quill for rich text editing
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS

const AddCourse = ({ selectCourse, setShowModal }) => {
  const [course, setCourse] = useState({
    courseName: "",
    courseCode: "",
    description: "", // This will store HTML content from Quill editor
    startingDate: "",
    endDate: "",
    teacherId: "", // Initially empty, will be filled if the role is teacher
    students: [],
    notebook: [],
    video: [],
    review: [],
    image: null, // To store the uploaded image file
  });
  const [loading, setLoading] = useState(false); // Loading state
  const role = localStorage.getItem('role'); // Get the user's role
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const CurrentUserId = localStorage.getItem("CurrentUserId");

  useEffect(() => {
    // If role is teacher, set teacherId to the current user ID
    if (role === "teacher" && !course.teacherId) {
      setCourse((prevCourse) => ({
        ...prevCourse,
        teacherId: CurrentUserId, // Set teacherId to CurrentUserId if not already set
      }));
    }

    if (selectCourse) {
      setCourse({
        ...selectCourse,
        startingDate: selectCourse.startingDate || "",
        endDate: selectCourse.endDate || "",
        image: null, // Reset image to avoid pre-filling a file input
      });
    }
  }, [selectCourse, role, CurrentUserId, course.teacherId]);

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

  const handleDescriptionChange = (value) => {
    setCourse({
      ...course,
      description: value, // Update the description with Quill's HTML content
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const formData = new FormData();
    Object.keys(course).forEach((key) => {
      if (key === "image" && course[key]) {
        formData.append(key, course[key]); // Add image file to form data
      } else if (Array.isArray(course[key])) {
        // If the value is an array, you may want to handle it differently or serialize it
        formData.append(key, JSON.stringify(course[key]));
      } else {
        formData.append(key, course[key]);
      }
    });

    setLoading(true); // Start loading

    try {
      if (selectCourse) {
        console.log("Updating Course:", course);
        // Logic for updating the course
        await axios.put(`${BASE_URL}/api/course/${selectCourse.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        });
        Swal.fire({
          icon: "success",
          title: "Course Updated!",
          text: "The course was updated successfully.",
        });
      } else {
        console.log("Adding New Course:", course);
        // Logic for adding a new course
        await axios.post(`${BASE_URL}/api/course`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        });
        Swal.fire({
          icon: "success",
          title: "Course Added!",
          text: "The course was added successfully.",
        });
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error during course submission:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error submitting the course.",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container  p-4 w-full max-h-screen overflow-y-auto m-5">
      <h1 className="text-2xl font-bold mb-4">
        {selectCourse ? "Update Course" : "Add Course"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
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
          <div className="mb-4 w-full">
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

        </div>
        <div className="w-full">
          <label className="block text-sm font-medium mb-1" htmlFor="courseName">
            Description (Rich Text Editor)
          </label>
          <ReactQuill
            value={course.description}
            onChange={handleDescriptionChange}
            className="w-full"
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline'],
                ['link'],
                [{ 'align': [] }],
                ['image', 'video']
              ],
            }}
            formats={['header', 'font', 'list', 'bold', 'italic', 'underline', 'link', 'align', 'image', 'video']}
            placeholder="Enter course description..."
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 my-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading} // Disable button during loading
        >
          {loading ? "Processing..." : selectCourse ? "Update Course" : "Add Course"}
        </button>
      </form>
    </div>

  );
};

export default AddCourse;
