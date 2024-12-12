import React, { useEffect, useState } from "react";
import CommentComponent from "./CommentComponent";
import axios from "axios";
import { useTheme } from "../ThemeProvider";
import { formatDistanceToNow, parseISO } from "date-fns"; // Import date-fns for date formatting
import Swal from "sweetalert2";
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
        setComments(
          response.data.map((comment) => ({
            ...comment,
            createdAt: comment.createdAt ? parseISO(comment.createdAt) : new Date(),
          }))
        );
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

  console.log(comments);

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
        createdAt: new Date(), // Use the current date
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


  const getRelativeTime = (date) => {
    const now = new Date();
    const differenceInSeconds = Math.floor((now - date) / 1000);

    if (differenceInSeconds < 60) {
      return "just now";
    }
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handlDelete = async (id) => {
    // Show confirmation dialog using SweetAlert2
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This comment will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
    // If user confirms, proceed with deletion
    if (result.isConfirmed) {
      try {
        setLoading(true);
        await axios.delete(`${BASE_URL}/api/comment/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(comments.filter((comment) => comment.id !== id)); // Remove the deleted comment from state
        Swal.fire("Deleted!", "Your comment has been deleted.", "success"); // Show success alert
      } catch (err) {
        console.error("Error deleting comment:", err.message);
        Swal.fire("Error!", "Unable to delete the comment. Please try again.", "error"); // Show error alert
      } finally {
        setLoading(false);
      }
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
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100"
            }`}
          placeholder="Write a comment..."
          rows="3"
        />
        <button
          onClick={postComment}
          disabled={loading}
          className={`mt-2 px-4 py-2 rounded-md ${loading ? "bg-gray-400 text-gray-800" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
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
            timestamp={getRelativeTime(comment?.createdAt)} // Use the customized utility function
            isDarkMode={isDarkMode}
            userId={comment?.user?.id}
            commentId = {comment?.id}
            handlDelete={handlDelete}
          />

        ))}
    </div>
  );
};

export default CommentsSection;
