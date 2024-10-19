import React, { useState, useEffect } from 'react';
import { FaBars, FaChevronLeft, FaChevronRight, FaRobot, FaHome, FaUser, FaTimes, FaBell } from 'react-icons/fa';
import photo1 from './assets/components/1.jpg';
import photo2 from './assets/components/2.jpg';
import photo3 from './assets/components/3.jpg';
import photo4 from './assets/components/4.jpg';

import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [nationality, setNationality] = useState('');
    const photos = [photo1, photo2, photo3, photo4];
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
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        const fetchNationality = async () => {
            try {
                const response = await fetch('/api/user/nationality');
                const data = await response.json();
                setNationality(data.nationality);
            } catch (error) {
                console.error('Error fetching nationality:', error);
            }
        };

        fetchNationality();
    }, []);

    const getWhatsAppGroupLink = () => {
        switch (nationality) {
            case 'Ghana':
                return 'https://chat.whatsapp.com/examplelink1';
            case 'Nigeria':
                return 'https://chat.whatsapp.com/examplelink2';
            case 'South Africa':
                return 'https://chat.whatsapp.com/examplelink3';
            case 'Gambia':
                return 'https://chat.whatsapp.com/examplelink4';
            default:
                return '#';
        }
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
                        <button onClick={() => navigateTo('/overview')} className=" hover:underline">Human Rights Overview</button>
                    </li>
                    <li>
                        <button onClick={() => navigateTo('/news')} className="hover:underline">Recent News</button>
                    </li>
                    <li>
                        <button onClick={() => navigateTo('/events')} className="hover:underline">Events</button>
                    </li>
                    <li>
                        <button onClick={() => navigateTo('/resources')} className="hover:underline">Resources</button>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="p-8">
                <div className="flex justify-between items-center">
                    <button onClick={toggleSidebar} className="mb-4 text-gray-600 focus:outline-none" aria-label="Toggle Sidebar">
                        <FaBars className="text-2xl" />
                    </button>

                    {/* Notification Icon on the Right */}
                    <div className="relative">
                        <button 
                            onClick={() => navigateTo('/notifications')} 
                            className="relative  focus:outline-none"
                            aria-label="Notifications"
                        >
                            <FaBell className="text-2xl" />
                            {/* Notification Badge */}
                            <span className="absolute top-0 right-0 block h-2 w-2 bg-red-600 rounded-full"></span>
                        </button>
                    </div>
                </div>

                <h1 className="text-2xl  font-bold mb-10 text-gray-800">Welcome to LibertyLink</h1>
                <p className=" font-bold  mb-12"><i>Empowering Voices, Connecting Rights</i></p>
                
                

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

                {/* Horizontal Scrollable Carousel for Community Groups, Reports, and LibertyQuest */}
                <div className="flex space-x-4 mb-6 overflow-x-auto scrollbar-hide">
                    {/* Community Groups Section */}
                    <div className="min-w-[300px] max-w-sm">
    <h3 className="text-xl font-bold mb-4 text-center">Community Groups</h3>
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {/* Link to WhatsApp group */}
        <a 
            href="https://chat.whatsapp.com/HzCDP9euIag2vgAAdplcJm"  
            target="_blank"  
            rel="noopener noreferrer"  
            className="bg-white shadow-md rounded-lg overflow-hidden flex-shrink-0 w-full"
        >
            <img className="w-full h-32 object-cover" src={photo1} alt="Community Group" />
            <div className="p-4">
                <h4 className="text-lg font-bold hover:text-blue-600">{nationality} Group</h4>
                <p className="text-gray-600 text-center">Join the WhatsApp group {nationality}</p>
            </div>
        </a>
    </div>
</div>


                    {/* Reports Section */}
                    <div className="min-w-[300px] max-w-sm">
    <h3 className="text-xl font-bold mb-4 text-center">Right Violation</h3>
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        <button 
            onClick={() => navigateTo('/report')} 
            className="bg-white shadow-md rounded-lg overflow-hidden flex-shrink-0 w-full">
            <img className="w-full h-32 object-cover" src={photo3} alt="Report Issue" />
            <div className="p-4 flex flex-col items-center">
                <h4 className="text-lg font-bold hover:text-blue-600 text-center">Report Issue</h4>
                <p className="text-gray-600 text-center">Click here to report an issue</p>
            </div>
        </button>
    </div>
</div>

                   
                    {/* LibertyQuest Game Section */}
<div className="min-w-[300px] max-w-sm">
    <h3 className="text-xl font-bold mb-4 text-center">LibertyQuest Game</h3>
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        <button 
            onClick={() => navigateTo('/libertyquest')} 
            className="bg-white shadow-md rounded-lg overflow-hidden flex-shrink-0 w-full">
            <img className="w-full h-32 object-cover" src={photo3} alt="LibertyQuest Game" />
            <div className="p-4 flex flex-col items-center">
                <h4 className="text-lg font-bold hover:text-blue-600 text-center">Play LibertyQuest</h4>
                <p className="text-gray-600 text-center">Click to play the game</p>
            </div>
        </button>
    </div>
</div>
                </div>
            </main>

            {/* Bottom Navigation Bar */}
            <BottomNav/>
        </div>
    );
};

export default Home;
