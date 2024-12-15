import React, { useEffect, useState } from "react";
import { useTheme } from "../../ThemeProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { StudentSideBar } from "../Student/StudentSidebar";

const GetNoteByCourse = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Hook to navigate back
    const materials = location.state.materials || [];

    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const { isDarkMode } = useTheme();

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredMaterials = materials.filter((material) =>
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMaterials = filteredMaterials.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= Math.ceil(filteredMaterials.length / itemsPerPage)) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div
            className={`min-h-screen flex lg:gap-20 w-full ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
        >
            {/* Sidebar */}
            <div className="fixed z-40">
                <StudentSideBar />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 w-[80%] lg:ml-64 ml-20">
                {/* Back Button */}
                <div className="mb-4">
                    <button
                        onClick={() => navigate(-1)} // Navigate to the previous page
                        className={`px-4 py-2 rounded-lg ${isDarkMode
                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                            : "bg-gray-300 hover:bg-gray-400 text-black"
                        }`}
                    >
                        &larr; Back
                    </button>
                </div>

                {/* Header */}
                <h1
                    className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? "text-blue-300" : "text-blue-600"}`}
                >
                    Study Materials
                </h1>

                {/* Search Bar */}
                <div className="mb-6 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search by title or course..."
                        aria-label="Search materials"
                        className={`w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isDarkMode
                            ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-300"
                            : "bg-white text-black border-gray-300 focus:ring-blue-500"
                        }`}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Loader */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        {/* Table */}
                        <table
                            className={`w-full table-auto rounded-lg shadow-md ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
                        >
                            <thead>
                                <tr className={`${isDarkMode ? "bg-blue-600" : "bg-blue-500"} text-white`}>
                                    <th className="py-2 px-4 text-left">Title</th>
                                    <th className="py-2 px-4 text-left">Description</th>
                                    <th className="py-2 px-4 text-center">View</th>
                                    <th className="py-2 px-4 text-center">Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentMaterials.length > 0 ? (
                                    currentMaterials.map((material) => (
                                        <tr
                                            key={material.id}
                                            className={`hover:transition duration-200 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                                }`}
                                        >
                                            <td className="py-2 px-4">{material.title}</td>
                                            <td className="py-2 px-4">{material.description}</td>
                                            <td className="py-2 px-4 text-center">
                                                <button
                                                    onClick={() => window.open(material.content, "_blank")}
                                                    className={`px-3 py-1 rounded-lg text-white transition duration-300 ${isDarkMode
                                                        ? "bg-green-600 hover:bg-green-500"
                                                        : "bg-green-500 hover:bg-green-600"
                                                    }`}
                                                >
                                                    View
                                                </button>
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                <a
                                                    href={material.pdfFileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    download
                                                    className={`px-3 cursor-pointer py-1 rounded-lg text-white transition duration-300 ${isDarkMode
                                                        ? "bg-blue-600 hover:bg-blue-500"
                                                        : "bg-blue-500 hover:bg-blue-600"
                                                    }`}
                                                >
                                                    Download
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4 font-medium">
                                            No study materials found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination Controls */}
                <div className="flex justify-center mt-6 items-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 mx-2 rounded-lg ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                            }`}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">
                        {`Page ${currentPage} of ${Math.ceil(filteredMaterials.length / itemsPerPage)}`}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === Math.ceil(filteredMaterials.length / itemsPerPage)}
                        className={`px-4 py-2 mx-2 rounded-lg ${currentPage === Math.ceil(filteredMaterials.length / itemsPerPage)
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GetNoteByCourse;
