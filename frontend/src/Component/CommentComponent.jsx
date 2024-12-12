import React, { useState } from "react";
import { useTheme } from "../ThemeProvider";
import { MdDelete } from "react-icons/md";

const CommentComponent = ({commentId, avatar, username, comment, timestamp, userId,handlDelete }) => {
  const { isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle dropdown menu

  const CurrentUserId = localStorage.getItem('CurrentUserId');

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  

  return (
    <div
      className={`flex items-start space-x-4 p-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"} ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      {/* Avatar */}
      <img
        src={avatar}
        alt={username}
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Comment Details */}
      <div className="flex-1">
        {/* Username and Timestamp */}
        <div className="flex justify-between items-center mb-1">
          <h3 className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>{username}</h3>
          <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{timestamp}</span>
          {"   "}
          {
            CurrentUserId === userId && (
              <MdDelete onClick={()=>handlDelete(commentId)} className="cursor-pointer text-xl text-red-500" />
            )
          }
        </div>

        {/* Comment Text */}
        <p className={`text-gray-300 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{comment}</p>

      </div>

      {/* Like and Menu Buttons */}






    </div>
  );
};

export default CommentComponent;
