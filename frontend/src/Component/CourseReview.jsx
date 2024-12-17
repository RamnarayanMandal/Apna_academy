import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeProvider';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Import Autoplay module
import 'swiper/css';
import 'swiper/css/autoplay';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'; // Import SweetAlert2

export const CourseReview = ({ courseId }) => {
  const { isDarkMode } = useTheme();
  const [feedback, setFeedback] = useState('');
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0); // User-selected rating
  const [hover, setHover] = useState(0); // Hover effect for stars

  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('CurrentUserId');

  useEffect(() => {
    fetchReviewsByCourseId(courseId);
  }, [courseId]);

  const fetchReviewsByCourseId = async (courseId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/review/course/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(response.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim() || rating === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Please provide feedback and select a rating.',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/review/`,
        {
          userId,
          review: feedback,
          rating,
          courseId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviews((prevReviews) => [
        ...prevReviews,
        { feedback, rating, id: response.data.reviewId, user: { name: 'You', profilePicture: '' } },
      ]);
      setFeedback('');
      setRating(0);
      Swal.fire({
        icon: 'success',
        title: 'Feedback submitted successfully!',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to submit feedback. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to undo this action!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`${BASE_URL}/api/review/${reviewId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
          Swal.fire({
            icon: 'success',
            title: 'Review deleted successfully!',
            confirmButtonText: 'OK'
          });
        }
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to delete review. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className={`w-full flex flex-col-reverse`}>
      <div className={`shadow-md rounded-lg mt-4 p-8 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-slate-50 text-gray-900'}`}>
        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-lg font-semibold mb-2">
            Your Feedback:
          </label>
          <textarea
            id="feedback"
            rows="5"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={`w-full p-4 border border-gray-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-slate-50 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Write your feedback here..."
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Your Rating:</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-8 h-8 cursor-pointer ${(hover || rating) >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.429L24 9.664l-6 5.847 1.416 8.238L12 18.902 4.584 23.749 6 15.511 0 9.664l8.332-1.648z" />
              </svg>
            ))}
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={handleFeedbackSubmit}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Submit Feedback
          </button>
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Reviews</h3>
          <Swiper
            modules={[Autoplay]} // Use Autoplay module
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="w-full"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id || review.feedback}>
                <li className={`p-6 rounded-lg flex flex-col justify-center items-center shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300`}>
                  {/* Avatar Section */}
                  <div className="flex justify-center items-center mb-4">
                    <img
                      src={review.user?.profilePicture ||
                        (review.user?.gender === "female"
                          ? "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https://substack-post-media.s3.amazonaws.com/public/images/acb01540-db67-4bee-9517-5db99716f554_2048x2048.png"
                          : "https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png")}
                      alt="User Avatar"
                      className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600 object-cover"
                    />
                  </div>

                  {/* User Name */}
                  <p className="text-xl font-serif font-semibold text-gray-800 dark:text-gray-100 my-2">{review.user?.name || 'Anonymous'}</p>

                  {/* Review Text */}
                  <p className="text-base text-gray-600 dark:text-gray-300 my-2 text-center">{review.review || 'No feedback provided.'}</p>

                  {/* Rating Section */}
                  <div className="flex justify-center items-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-6 h-6 ${review.rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.429L24 9.664l-6 5.847 1.416 8.238L12 18.902 4.584 23.749 6 15.511 0 9.664l8.332-1.648z" />
                      </svg>
                    ))}
                  </div>
                  {
                    userId === review.userId && (
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none mt-4"
                      >
                        Delete
                      </button>
                    )}
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No reviews available for this course.</p>
      )}
    </div>
  );
};
