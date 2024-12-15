import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaArrowLeft, FaTrash, FaEdit, FaFilePdf } from 'react-icons/fa';  // Import icons
import { useTheme } from '../../ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { TeacherSideBar } from '../Teacher/TeacherSideBar';
import AddNotesForm from './AddNotes';
import Swal from 'sweetalert2';  // To show alerts for success/error

const GetAllNotes = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);  // State to hold the note to be updated
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const [notes, setNotes] = useState([]);
  const teacherId = localStorage.getItem('CurrentUserId');

  // Fetch notes on component mount
  const fetchAllNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/notes/teacher/${teacherId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  // Delete note
  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`${BASE_URL}/api/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter(note => note.id !== noteId));
      Swal.fire({
        title: 'Deleted!',
        text: 'The note has been deleted successfully.',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete note.',
        icon: 'error',
      });
    }
  };

  // Filter notes based on search term
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBackClick = () => {
    navigate(-1);  // Go back to the previous page
  };

  const handleUpdateNote = (note) => {
    setSelectedNote(note);  // Pass the note data to the AddNotes component
    setShowAddForm(true);  // Show the form
  };

  // Regex to match URLs (http:// or https://)
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Function to render content with clickable URLs
  const renderContentWithLinks = (content) => {
    const parts = content.split(urlRegex); // Split the content by URLs
    return parts.map((part, index) => {
      // If part matches a URL, wrap it with an <a> tag
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            {part}
          </a>
        );
      }
      // Otherwise, just render the part as plain text
      return part;
    });
  };

  // Function to handle opening the PDF in a new tab
  const handleViewPdf = (pdfUrl) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'No PDF available for this note.',
        icon: 'error',
      });
    }
  };

  return (
    <div className={`flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Sidebar */}
      <div className="w-64 min-h-screen">
        <TeacherSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className={`flex items-center mb-4 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'} p-2 border-2 rounded-md`}>
          <FaArrowLeft className="mr-2" /> {/* Back Arrow Icon */}
          Back
        </button>

        {/* Add Note Button */}
        <button
          onClick={() => setShowAddForm(true)}
          className={`absolute top-6 right-6 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-700'} ${isDarkMode ? 'hover:bg-blue-500' : 'hover:bg-blue-600'} text-white px-6 py-3 rounded-lg border-2 border-transparent transition duration-200 ease-in-out`}>
          Add Note
        </button>

        {/* Search Input */}
        <div className="mb-6 relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-4 pl-10 pr-4 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'} rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <FaSearch className={`absolute top-3 left-3 ${isDarkMode ? 'text-white' : 'text-gray-500'}`} />
        </div>

        {/* Title */}
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>All Notes</h1>

        {/* Notes Display */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div key={note.id} className={`p-5 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{note.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>{note.description}</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mt-4`}>
                  {renderContentWithLinks(note.content.substring(0, 100))}...
                </p>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleUpdateNote(note)}  // Trigger update with note data
                    className={`text-blue-500 hover:text-blue-700 flex items-center transition duration-200 ease-in-out`}>
                    <FaEdit className="mr-2" /> Update
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className={`text-red-500 hover:text-red-700 flex items-center transition duration-200 ease-in-out`}>
                    <FaTrash className="mr-2" /> Delete
                  </button>
                  {/* View PDF Button */}
                  {note.pdfFileUrl && (
                    <button
                      onClick={() => handleViewPdf(note.pdfFileUrl)}
                      className="text-blue-500 hover:text-blue-700 flex items-center transition duration-200 ease-in-out">
                      <FaFilePdf className="mr-2" /> View PDF
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-4`}>No notes found.</p>
          )}
        </div>

        {/* Add/Edit Note Modal */}
        {showAddForm && (
          <div className="fixed top-0 left-0 w-full h-screen z-50 bg-black opacity-90 flex items-center justify-center">
            <div className={`p-4 w-full max-w-sm mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md shadow-md relative`}>
              <button
                onClick={() => setShowAddForm(false)}
                className={`absolute top-3 right-3 ${isDarkMode ? 'text-white' : 'text-gray-500'} hover:${isDarkMode ? 'text-gray-200' : 'text-gray-700'} focus:outline-none focus:ring-2 focus:ring-gray-300 transition`}>
                <FaArrowLeft className="text-2xl" />
              </button>
              <AddNotesForm setShowAddForm={setShowAddForm} selectedNote={selectedNote} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllNotes;
