import React from "react";
import { useTheme } from "../ThemeProvider";

const CommentComponent = ({ avatar, username, comment, timestamp }) => {
  const { isDarkMode } = useTheme(); 

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
        </div>

        {/* Comment Text */}
        <p className={`text-gray-300 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{comment}</p>
      </div>
    </div>
  );
};

export default CommentComponent;
