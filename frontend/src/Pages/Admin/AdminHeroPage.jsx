import React, { useEffect, useState } from 'react';
import { FaUsers, FaBook, FaChalkboardTeacher, FaCalendarAlt, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminHeroPage = () => {
  const [students, setStudents] = useState(1200);
  const [courses, setCourses] = useState(50);
  const [teachers, setTeachers] = useState(85);
  const [activeData, setActiveData] = useState({
    students: 800,
    teachers: 70,
    courses: 40,
  });
  const [loading, setLoading] = useState(true); // Loading state

  const { isDarkMode, toggleTheme } = useTheme();

  const token = localStorage.getItem('token');
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true); // Start loading
      const [teacher, student, course] = await Promise.all([
        axios.get(`${BASE_URL}/api/teacher/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${BASE_URL}/api/student/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${BASE_URL}/api/course`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setStudents(student.data.length);
      setCourses(course.data.length);
      setTeachers(teacher.data.length);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const chartData = {
    labels: ['Students', 'Teachers', 'Courses'],
    datasets: [
      {
        label: 'Active',
        data: [activeData.students, activeData.teachers, activeData.courses],
        backgroundColor: ['#4F46E5', '#10B981', '#8B5CF6'],
      },
      {
        label: 'Total',
        data: [students, teachers, courses],
        backgroundColor: ['#3B82F6', '#16A34A', '#9333EA'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#FFF' : '#000',
        },
      },
      title: {
        display: true,
        text: 'Platform Activity Overview',
        color: isDarkMode ? '#FFF' : '#000',
        font: { size: 20 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#FFF' : '#000',
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? '#FFF' : '#000',
        },
      },
    },
  };

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
        }`}
      >
        <div className="loader border-t-4 border-b-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div
      className={`p-6 min-h-screen lg:mx-20 ml-20 w-full ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Hero Section */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome, Admin</h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Here's an overview of your platform's performance today.
          </p>
        </div>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-200 rounded-full transition-colors duration-200 dark:bg-gray-800"
        >
          {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-600" />}
        </button>
      </header>

      {/* Analytics Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Students */}
        <div className={`shadow-lg rounded-lg p-6 flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaUsers className="text-4xl text-blue-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Total Students</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{students}</p>
          </div>
        </div>

        {/* Total Teachers */}
        <div className={`shadow-lg rounded-lg p-6 flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaChalkboardTeacher className="text-4xl text-green-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Total Teachers</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{teachers}</p>
          </div>
        </div>

        {/* Courses */}
        <div className={`shadow-lg rounded-lg p-6 flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaBook className="text-4xl text-purple-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Courses</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{courses}</p>
          </div>
        </div>

        {/* Classes Scheduled */}
        <div className={`shadow-lg rounded-lg p-6 flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaCalendarAlt className="text-4xl text-yellow-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Classes Scheduled</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>30 Today</p>
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className={`shadow-lg rounded-lg p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className="text-2xl font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-4">
          {/* Add recent activities here */}
        </ul>
      </section>

      {/* Chart Section */}
      <section className={`shadow-lg rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className="text-2xl font-semibold mb-4">Platform Activity Overview</h3>
        <Bar data={chartData} options={chartOptions} />
      </section>
    </div>
  );
};

export default AdminHeroPage;
