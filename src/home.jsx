import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaChevronLeft, FaChevronRight, FaRobot } from 'react-icons/fa'; // Add FaRobot for chatbot
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import photo1 from './assets/components/interior decors (2).jpg';
import photo2 from './assets/components/interior decors (22).jpg';
import photo3 from './assets/components/interior decors (3).jpg';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for next, -1 for previous

    const photos = [photo1, photo2, photo3];

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % photos.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* Overlay Sidebar */}
            <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar}></div>
            <aside className={`fixed left-0 top-0 w-64 bg-white shadow-lg p-6 transition-transform duration-300 ${isSidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Quick Links</h2>
                    <button onClick={toggleSidebar} className="text-gray-600">
                        <FaTimes />
                    </button>
                </div>
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="text-blue-600 hover:underline">Human Rights Overview</a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-600 hover:underline">Recent News</a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-600 hover:underline">Events</a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-600 hover:underline">Resources</a>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="p-8">
                <button onClick={toggleSidebar} className="mb-4 text-gray-600 focus:outline-none">
                    <FaBars className="text-2xl" />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome to the Human Rights Portal</h2>
                <p className="text-gray-600 mb-6">
                    Explore key information on human rights and engage with our community.
                </p>

                {/* Image Slider */}
                <div className="relative w-full mb-6 h-64 overflow-hidden rounded-lg">
                    {photos.map((photo, index) => (
                        <img
                            key={index}
                            src={photo}
                            alt={`Human Rights ${index + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out 
                                ${currentSlide === index ? 'translate-x-0' : currentSlide > index ? '-translate-x-full' : 'translate-x-full'}`}
                        />
                    ))}

                    {/* Left Arrow */}
                    <button 
                        onClick={prevSlide} 
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
                    >
                        <FaChevronLeft />
                    </button>

                    {/* Right Arrow */}
                    <button 
                        onClick={nextSlide} 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
                    >
                        <FaChevronRight />
                    </button>
                </div>

                <p className="text-gray-600 text-sm mt-6">
                    Join our community of human rights advocates and make a difference. Participate in discussions, attend webinars, and access valuable resources to further the cause of human rights in Africa.
                </p>
            </main>

            {/* Chatbot Link */}
            <Link
                to="/chat" // Link to your chat page
                className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500"
            >
                <FaRobot className="text-2xl" />
            </Link>
        </div>
    );
};

export default Home;
