import React, { useState } from "react";
import { useTheme } from "../../ThemeProvider";
import { StudentSideBar } from "./StudentSidebar";

const StudyMaterials = () => {
    const materials = [
        {
            id: 1,
            course: "Web Development",
            title: "HTML Basics",
            description: "Learn the structure of a webpage with HTML.",
            link: "https://example.com/html-basics",
        },
        {
            id: 2,
            course: "Web Development",
            title: "CSS Fundamentals",
            description: "Understand styling and layout with CSS.",
            link: "https://example.com/css-fundamentals",
        },
        {
            id: 3,
            course: "JavaScript",
            title: "JavaScript Essentials",
            description: "Learn programming concepts with JavaScript.",
            link: "https://example.com/javascript-essentials",
        },
        {
            id: 4,
            course: "Responsive Design",
            title: "Responsive Design Basics",
            description: "Make your website look great on all devices.",
            link: "https://example.com/responsive-design",
        },
        {
            id: 5,
            course: "JavaScript",
            title: "Advanced JavaScript",
            description: "Deep dive into JavaScript concepts.",
            link: "https://example.com/advanced-js",
        },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const { isDarkMode } = useTheme();

    // Filter materials based on the search term
    const filteredMaterials = materials.filter(
        (material) =>
            material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            material.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            className={`min-h-screen flex lg:gap-20 w-full ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
                }`}
        >
              <div className="fixed z-40">
                    <StudentSideBar />
                </div>


            <div className="flex-1 p-6 w-full lg:ml-64 ml-16">

              

                <h1
                    className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? "text-blue-300" : "text-blue-600"
                        }`}
                >
                    Study Materials
                </h1>

                {/* Search Bar */}
                <div className="mb-6 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search by title or course..."
                        className={`w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isDarkMode
                            ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-300"
                            : "bg-white text-black border-gray-300 focus:ring-blue-500"
                            }`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table
                        className={`w-full table-auto rounded-lg shadow-md ${isDarkMode ? "bg-gray-800" : "bg-white"
                            }`}
                    >
                        <thead>
                            <tr className={`${isDarkMode ? "bg-blue-600" : "bg-blue-500"} text-white`}>
                                <th className="py-2 px-4 text-left">Course</th>
                                <th className="py-2 px-4 text-left">Title</th>
                                <th className="py-2 px-4 text-left">Description</th>
                                <th className="py-2 px-4 text-center">View</th>
                                <th className="py-2 px-4 text-center">Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMaterials.length > 0 ? (
                                filteredMaterials.map((material) => (
                                    <tr
                                        key={material.id}
                                        className={`hover:transition duration-200 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                            }`}
                                    >
                                        <td className="py-2 px-4">{material.course}</td>
                                        <td className="py-2 px-4">{material.title}</td>
                                        <td className="py-2 px-4">{material.description}</td>
                                        {/* View Button */}
                                        <td className="py-2 px-4 text-center">
                                            <a
                                                href={material.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`px-3 py-1 rounded-lg text-white transition duration-300 ${isDarkMode
                                                    ? "bg-green-600 hover:bg-green-500"
                                                    : "bg-green-500 hover:bg-green-600"
                                                    }`}
                                            >
                                                View
                                            </a>
                                        </td>
                                        {/* Download Button */}
                                        <td className="py-2 px-4 text-center">
                                            <a
                                                href={material.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                                className={`px-3 py-1 rounded-lg text-white transition duration-300 ${isDarkMode
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
                                    <td
                                        colSpan="5"
                                        className="text-center py-4 font-medium"
                                    >
                                        No study materials found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudyMaterials;
