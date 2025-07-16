import React from "react";
import { useTheme } from "../../ThemeProvider";
import AdminSidebar from "../Admin/AdminSidebar";
import GetAllCourse from "./GetAllCourse";
import { TeacherSideBar } from "../Teacher/TeacherSideBar";

export const CourseHomePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const role = localStorage.getItem("role"); // Get the role from localStorage

  return (
    <div
      className={`flex flex-col lg:flex-row min-h-screen  ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } transition-colors`}
    >
     
      <div className="w-full lg:w-64 md:w-20 flex-shrink-0">
      {role === "teacher" ? (
        <TeacherSideBar />
      ) : role === "admin" ? (
        <AdminSidebar />
      ) : null}
      </div>
      <GetAllCourse role={role} />
    </div>
  );
};
