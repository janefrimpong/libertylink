import React from 'react';
import { FaBars, FaTimes, FaHome, FaRobot, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import photo5 from './assets/components/5.jpg';
import photo6 from './assets/components/6.jpg';
import photo7 from './assets/components/7.jpg';


const LibertyQuest = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const navigateTo = (path) => {
        navigate(path);
        setIsSidebarOpen(false);
    };

    return (
        <div className="relative min-w-screen min-h-screen bg-gray-100 flex flex-col">
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
                        <button onClick={() => navigateTo('/news')} className=" hover:underline">Recent News</button>
                    </li>
                    <li>
                        <button onClick={() => navigateTo('/events')} className=" hover:underline">Events</button>
                    </li>
                    <li>
                        <button onClick={() => navigateTo('/resources')} className=" hover:underline">Resources</button>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-8 overflow-auto">
                <div className="flex justify-between items-center">
                    <button onClick={toggleSidebar} className="mb-4 text-gray-600 focus:outline-none" aria-label="Toggle Sidebar">
                        <FaBars className="text-2xl" />
                    </button>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome to LibertyQuest!</h2>
                
                {/* Game Type Selection */}
                <div className="flex flex-col items-center space-y-6 mb-8 w-full">
                    {/* Trivia Game */}
                    <div className="bg-white rounded-xl shadow-md p-6 text-center w-full flex items-center justify-between">
                        <div className="flex flex-col flex-grow">
                            <h3 className="text-2XL font-bold mb-2">QUIZ ON AFRICAN UNION</h3>
                            <button 
                                onClick={() => navigateTo('/libertyquest/trivia')} 
                                className="mt-2  text-white px-4 py-1 rounded-xl bg-gray-700 transition duration-300 w-24 mx-auto"
                            >
                                Join
                            </button>
                        </div>
                        <img src={photo5} alt="AU" className="w-16 h-16 object-cover rounded" />
                    </div>

                    {/* Flashcards */}
                    <div className="bg-white rounded-xl shadow-md p-6 text-center w-full flex items-center justify-between">
                        <div className="flex flex-col flex-grow">
                            <h3 className="text-2XL font-bold mb-2">QUIZ ON ACHPR</h3>
                            <button 
                                onClick={() => navigateTo('/libertyquest/flashcards')} 
                                className="mt-2  text-white px-4 py-1 rounded-xl bg-gray-700 transition duration-300 w-24 mx-auto"
                            >
                                Join
                            </button>
                        </div>
                        <img src={photo6} alt="ACHPR" className="w-16 h-16 object-cover rounded" />
                    </div>

                    {/* Matching Game */}
                    <div className="bg-white rounded-xl shadow-md p-6 text-center w-full flex items-center justify-between">
                        <div className="flex flex-col flex-grow">
                            <h3 className="text-2XL font-bold mb-2">QUIZ ON CHARM AFRICA</h3>
                            <button 
                                onClick={() => navigateTo('/libertyquest/matching')} 
                                className="mt-2  text-white px-4 py-1 rounded-xl bg-gray-700 transition duration-300 w-24 mx-auto"
                            >
                                Join
                            </button>
                        </div>
                        <img src={photo7} alt="CHARM" className="w-16 h-16 object-cover rounded" />
                    </div>
                </div>
            </main>

            {/* Bottom Navigation Bar */}
           <BottomNav/>
        </div>
    );
};

export default LibertyQuest;
