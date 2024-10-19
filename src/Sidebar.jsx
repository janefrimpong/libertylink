import React, { useState } from 'react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsOpen(!isOpen);

        // Disable scrolling when sidebar is open
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    return (
        <div>
            {/* Button to toggle sidebar */}
            <button 
                onClick={toggleSidebar} 
                className="p-2 text-white bg-gray-800 fixed top-4 left-4 z-50"
            >
                {isOpen ? 'Close' : 'Open Sidebar'}
            </button>

            {/* Sidebar */}
            <div 
                className={`fixed top-0 left-0 w-64 h-screen bg-gray-100 p-6 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-40`}
            >
                <ul className="space-y-2">
                    <li>
                        <button onClick={() => navigateTo('/overview')} className="hover:underline">Human Rights Overview</button>
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
            </div>

            {/* Overlay when sidebar is open */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-30"
                    onClick={toggleSidebar}
                />
            )}
        </div>
    );
};

export default Sidebar;
