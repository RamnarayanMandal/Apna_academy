import React, { useEffect, useState } from 'react';
import { StudentSideBar } from '../Student/StudentSidebar';
import { useTheme } from '../../ThemeProvider';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { parse, differenceInDays } from 'date-fns';
import AdminSidebar from '../Admin/AdminSidebar';
import { TeacherSideBar } from '../Teacher/TeacherSideBar';
import AddCourse from './AddCourse';
import { IoMdCloseCircle } from 'react-icons/io';
import Swal from 'sweetalert2';
import { CourseReview } from '../../Component/CourseReview';

const GetCourseByID = () => {
  const { isDarkMode } = useTheme(); // Using dark mode state from context or provider
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const token = localStorage.getItem('token');
  const [showModel, setShowModal] = useState(false);
  const [selectCourse, setSelectCourse] = useState(null);
  const [AllDetailscourse,setAllDetailscourse] = useState(null);
  const [myCourses, setMyCourses] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem('role');
  const studentId = localStorage.getItem('CurrentUserId');


  

  // Fetch course details
  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  // Fetch student's courses
  useEffect(() => {
    if (studentId) {
      fetchMyCourses(studentId);
    }
  }, [studentId]);


  const fetchCourseDetails = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/api/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(resp.data.course);
      setAllDetailscourse(resp.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const fetchMyCourses = async (studentId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/course/getAllCourses/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyCourses(response.data.course || []);
    } catch (error) {
      console.error('Error fetching student courses:', error);
    }
  };

  if (!course) return <div>Loading...</div>;

  const handleBackClick = () => {
    navigate(-1); // Navigate back in history
  };

  const calculateDuration = (startDateString, endDateString) => {
    console.log('Calculating duration', startDateString, endDateString);
    const startDate = parse(startDateString, 'dd/MM/yyyy', new Date());
    const endDate = parse(endDateString, 'dd/MM/yyyy', new Date());

    // Get the difference in days
    const duration = differenceInDays(endDate, startDate);

    return duration;
  };


  const handleDeleteCourse = async (id) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action will permanently delete the course!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      // Proceed if the user confirms
      if (result.isConfirmed) {
        await axios.delete(`${BASE_URL}/api/course/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Show success alert
        Swal.fire({
          title: 'Deleted!',
          text: 'The course has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }
    } catch (error) {
      console.error('Error deleting course:', error);

      // Show error alert
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while deleting the course. Please try again.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    }
  };

  const handleEditCourse = (course) => {
    setShowModal(true);
    setSelectCourse(course);
  };






  const isEnrolled = (courseId) => myCourses.some((course) => course.id === courseId);

  const handleEnrollNow = async (courseId) => {
    if (isEnrolled(courseId)) {
      alert('You are already enrolled in this course!');
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/api/course/${studentId}/${courseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert(`You have successfully enrolled in the course: ${response.data.courseName}`);
        setMyCourses([...myCourses, response.data]);
      } else {
        alert('Enrollment failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('An error occurred. Please try again later.');
    }
  };


 

  return (
    <div
      className={`min-h-screen flex lg:gap-20 w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}
        transition-colors`}
    >
      <div className="fixed z-40">
        {role === "admin" ? (
          <AdminSidebar />
        ) : role === "teacher" ? (
          <TeacherSideBar />
        ) : (
          <StudentSideBar />
        )}
      </div>

      <button
        onClick={handleBackClick}
        className={`back-button fixed right-5 top-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
      >
        Back
      </button>
      <div className="lg:flex lg:flex-row flex-row-reverse p-6 lg:ml-64 ml-16 gap-10 overflow-hidden">
        <div className='lg:w-[40%] w-full h-auto overflow-hidden'>
          <div
            className={`w-full shadow-md p-4 rounded-lg mt-8 transition-all ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}
          >
            {/* Course Image */}
            <img
              src={course.image}
              alt="Course"
              className="w-full h-96 object-cover rounded-t-lg"
            />

            {/* Course Title */}
            <h1 className="my-4 text-2xl font-semibold text-center px-4">
              {course.courseName}
            </h1>

            {/* Course Details */}
            <div className="flex justify-between items-center my-2 px-4 text-sm md:text-base">
              <p>
                <strong>Starting Date:</strong>{' '}
                <span className="text-gray-500">{course.startingDate}</span>
              </p>
              <p>
                <strong>End Date:</strong>{' '}
                <span className="text-gray-500">{course.endDate}</span>
              </p>
            </div>
            <div className="flex justify-center mb-4 mt-4 flex-wrap gap-4">
              {/* Update Button */}


              {role === "admin" || role === "teacher"  && (
                <>
                  <button
                    className={`flex items-center px-4 py-2 rounded-md font-semibold border ${isDarkMode
                      ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                      : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                      }`}
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`flex items-center px-4 py-2 rounded-md font-semibold border ${isDarkMode
                      ? 'border-white text-white hover:bg-white hover:text-gray-900'
                      : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                      }`}
                    onClick={() => handleEditCourse(course)}
                  >
                    Update
                  </button>
                </>
              )}

              {
                role === "student" && (
                  <button
                className={`flex items-center px-4 py-2 rounded-md font-semibold ${isDarkMode
                  ? 'bg-blue-500 text-white hover:bg-blue-400'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
                  } ${isEnrolled(course.id) ? 'bg-green-500 cursor-not-allowed' : ''}`}
                onClick={() => handleEnrollNow(course.id)}
                disabled={isEnrolled(course.id)}
              >
                {isEnrolled(course.id) ? 'Enrolled' : 'Enroll Now'}
              </button>
                )
              }



            </div>
          </div>


          <div
            className={`w-full shadow-md p-8 rounded-lg mt-8 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}
          >
            <h2 className="text-2xl font-semibold mb-6 border-b-2 pb-2 border-gray-300">
              Faculty
            </h2>

            <ul className="space-y-6">
              {course?.teacher?.map((teacher) => (
                <li
                  key={teacher.id}
                  className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                >
                  <p className="font-semibold text-lg">{teacher.name}</p>
                  <p className="text-sm text-gray-400">{teacher.email}</p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Subject:</span>{' '}
                    {teacher.subjectSpecialization}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Qualification:</span>{' '}
                    {teacher.qualification}
                  </p>
                </li>
              ))}
            </ul>
          </div>


          <div className={`w-full shadow-md p-8 rounded-lg mt-8 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className='text-2xl font-semibold mb-6 border-b-2  pb-2 '>Service</h2>
            <div className='space-y-4'>
              {/* Service Items */}
              <div className='flex justify-between items-center text-lg font-semibold'>
                <p className='text-left'>Videos</p>
                <p className='text-right text-blue-600'>{AllDetailscourse?.videos?.length || "0"}</p>
              </div>

              <div className='flex justify-between items-center text-lg font-semibold'>
                <p className='text-left'>Assignments</p>
                <p className='text-right text-blue-600'>{AllDetailscourse?.notebooks?.length || " 0"}</p>
              </div>

              <div className='flex justify-between items-center text-lg font-semibold'>
                <p className='text-left'>Test</p>
                <p className='text-right text-blue-600'>{AllDetailscourse?.exams?.length || " 0"}</p>
              </div>

              <div className='flex justify-between items-center text-lg font-semibold'>
                <p className='text-left'>Students</p>
                <p className='text-right text-blue-600'>{course?.students?.length || "0"}</p>
              </div>
              <div className='flex justify-between items-center text-lg font-semibold'>
                <p className='text-left'>Duration</p>
                <p className="text-right text-blue-600">
                  {
                    calculateDuration(course?.startingDate, course?.endDate)
                  } days
                </p>

              </div>

              <div className='flex justify-between items-center text-lg font-semibold'>
                <p className='text-left'>Class Notes</p>
                <p className='text-right text-blue-600'>Download</p>
              </div>

            </div>
          </div>




          <CourseReview courseId={id}/>
        </div>

        <div className={`w-full lg:w-[60%] shadow-md p-8 rounded-lg mt-8 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <div
            className="course-description mb-8"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
        </div>
      </div>
      {showModel && (
        <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black opacity-90 flex items-center justify-center">
          <div className="p-4 w-[90%]  bg-white rounded-md shadow-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-10 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
            >
              <IoMdCloseCircle className="text-2xl" />
            </button>
            <AddCourse selectCourse={selectCourse} setShowModal={setShowModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GetCourseByID;
