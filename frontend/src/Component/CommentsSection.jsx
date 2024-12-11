import React, { useEffect, useState } from "react";
import CommentComponent from "./CommentComponent";
import axios from "axios";
import { useTheme } from "../ThemeProvider";

const CommentsSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();

  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("CurrentUserId");

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/comment/video/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        setComments(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setError("Unexpected response format from the server.");
        setComments([]);
      }
    } catch (err) {
      console.error("Error fetching comments:", err.message);
      setError("Unable to load comments.");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const postComment = async () => {
    if (newComment.trim() === "") {
      alert("Comment cannot be empty!");
      return;
    }

    const commentData = {
      videoId,
      userId,
      comment: newComment,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/comment/`, commentData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newCommentObj = {
        id: response.data.id,
        avatar: "https://via.placeholder.com/150", // Default avatar
        username: "User", // Replace with actual user info if available
        comment: newComment,
        timestamp: "Just now",
      };

      setComments([newCommentObj, ...comments]);
      setNewComment("");
      setError("");
    } catch (err) {
      console.error("Error posting comment:", err.message);
      setError("Unable to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`mt-6 rounded-lg shadow-md ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      <h2 className={`text-xl font-semibold px-4 py-2 ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>Comments</h2>
      <div className={`p-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100"}`}
          placeholder="Write a comment..."
          rows="3"
        />
        <button
          onClick={postComment}
          disabled={loading}
          className={`mt-2 px-4 py-2 rounded-md ${loading ? "bg-gray-400 text-gray-800" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </div>

      {!loading && comments.length === 0 && (
        <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
      )}

      {Array.isArray(comments) &&
        comments.map((comment) => (
          <CommentComponent
            key={comment?.id}
            avatar={
              comment?.user?.profilePicture ||
              (comment?.user?.gender === "female"
                ? "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https://substack-post-media.s3.amazonaws.com/public/images/acb01540-db67-4bee-9517-5db99716f554_2048x2048.png"
                : "https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png")
            }
            username={comment?.user?.name || "Anonymous"}
            comment={comment?.comment}
            timestamp={comment?.timestamp || "Just now"}
            isDarkMode={isDarkMode} // Pass dark mode info to CommentComponent if needed
          />
        ))}
    </div>
  );
};

export default CommentsSection;
