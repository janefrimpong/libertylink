import React, { useState, useEffect } from 'react';
import { FaBars, FaChevronLeft, FaChevronRight, FaRobot, FaHome, FaUser, FaTimes } from 'react-icons/fa'; // Importing close icon
import photo1 from './assets/components/1.jpg';
import photo2 from './assets/components/2.jpg';
import photo3 from './assets/components/3.jpg';
import photo4 from './assets/components/4.jpg'; // Added new image
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0); 
    const photos = [photo1, photo2, photo3, photo4]; // Added photo4 to the array
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % photos.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
    };

    const navigateTo = (path) => {
        navigate(path);
        setIsSidebarOpen(false); // Close sidebar when navigating
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
                    <button onClick={toggleSidebar} aria-label="Close Sidebar">
                        <FaTimes className="text-gray-600 hover:text-gray-800" />
                    </button>
                </div>
                <ul className="space-y-2">
                    <li>
                        <button onClick={() => navigateTo('/overview')} className="text-blue-600 hover:underline">Human Rights Overview</button>
                    </li>
                    <li>
                        <button onClick={() => navigateTo('/news')} className="text-blue-600 hover:underline">Recent News</button>
                    </li>
                    <li>
                        <button onClick={() => navigateTo('/events')} className="text-blue-600 hover:underline">Events</button>
                    </li>
                    <li>
                        <button onClick={() => navigateTo('/resources')} className="text-blue-600 hover:underline">Resources</button>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="p-8">
                <button onClick={toggleSidebar} className="mb-4 text-gray-600 focus:outline-none" aria-label="Toggle Sidebar">
                    <FaBars className="text-2xl" />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome to LibertyLink</h2>
                <p className="text-gray-600   mb-6"><i>Empowering Voices,Connecting Rights</i></p>

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
                        aria-label="Previous slide"
                    >
                        <FaChevronLeft />
                    </button>

                    {/* Right Arrow */}
                    <button 
                        onClick={nextSlide} 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
                        aria-label="Next slide"
                    >
                        <FaChevronRight />
                    </button>
                </div>
                <p className="text-gray-600 text-sm mt-6"> Join our community of human rights advocates and make a difference. Participate in discussions, attend webinars, and access valuable resources to further the cause of human rights in Africa.
                </p>
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around p-2">
                <button onClick={() => navigateTo('/home')} className="text-blue-600" aria-label="Home">
                    <FaHome className="text-2xl" />
                </button>
                <button onClick={() => navigateTo('/chat')} className="text-blue-600" aria-label="Chat">
                    <FaRobot className="text-2xl" />
                </button>
                <button onClick={() => navigateTo('/account')} className="text-blue-600" aria-label="Account">
                    <FaUser className="text-2xl" />
                </button>
               
            </nav>
        </div>
    );
};

export default Home;
