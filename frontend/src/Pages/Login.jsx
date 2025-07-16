import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoMdCloseCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';

const Login = ({ setShowModal }) => {
  const [formData, setFormData] = useState({
    type: 'student',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  const [error, setError] = useState(''); 
  const [token, setToken] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { isDarkMode, toggleTheme } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Please enter a valid email.';
    }
    if (!formData.password || formData.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: validationError,
      });
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        formData, 
        {
          params: { role: formData.type }, 
        }
      );
      //     // Check if the student account is blocked (backend should return this information)
      if (response.data === "Your account is blocked. Please contact the administrator.") {
        Swal.fire({
          icon: 'error',
          title: 'Account Blocked',
          text: 'Your account is blocked. Please contact the administrator.',
        });
        setLoading(false);
        return;
      }
      await localStorage.setItem("token", response.data);
      localStorage.setItem("role",formData.type)

     await fetchUserProfile();

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome back, ${formData.email}!`,
      });
       

       if (formData.type === 'student') {
        navigate('/Student-Dashbord');
      } else if (formData.type === 'teacher') {
        navigate('/Teacher-Dashbord');
      } else if (formData.type === 'admin') {
        navigate('/admin-dashboard');
      }
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check your credentials.',
      });
     
    } finally {
      setLoading(false);
    }
  };
  

  


  
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {        
        navigate('/login'); 
        return;
      }
      try {
       
        const response = await axios.get(`${BASE_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        

       localStorage.setItem("CurrentUserId", response.data.id)
       setUser(response.data);
      } catch (error) {
       
        setError('Failed to fetch profile. Please login again.');
        //console.error(error);
      }
    };

    
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} p-8 rounded-lg shadow-lg w-full max-w-md relative`}>
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          aria-label="Close modal"
        >
          <IoMdCloseCircle className="text-2xl" />
        </button>
        <h2 className="text-2xl font-semibold text-center mb-6">
          {formData.type === 'student'
            ? 'Student Login'
            : formData.type === 'teacher'
            ? 'Teacher Login'
            : 'Admin Login'}
        </h2>

        <div className="mb-4 flex justify-center space-x-6">
          {['student', 'teacher', 'admin'].map((role) => (
            <label key={role} className="flex items-center">
              <input
                type="radio"
                value={role}
                checked={formData.type === role}
                onChange={handleRoleChange}
                className="mr-2"
                aria-label={role}
              />
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </label>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] ${isDarkMode ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'}`}
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] ${isDarkMode ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'}`}
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
