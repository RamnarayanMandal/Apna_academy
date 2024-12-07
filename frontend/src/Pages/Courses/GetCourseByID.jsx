import React, { useEffect, useState } from 'react'
import { StudentSideBar } from '../Student/StudentSidebar'
import { useTheme } from '../../ThemeProvider';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GetCourseByID = () => {
  const { isDarkMode } = useTheme();
  const {id} = useParams();
  const [course, setCourse] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);


  const fetchCourseDetails = async() => {

    try {
      const resp = await axios.get(`${BASE_URL}/api/course/${id}`,{
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCourse(resp.data);
      
    } catch (error) {
      console.error('Error fetching course details:', error);
      
    }

  }




  return (
    <div className={`min-h-screen flex  lg:gap-20 w-full  ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'} transition-colors`}>
     
        <StudentSideBar />
      
           
      
    </div>
  )
}

export default GetCourseByID