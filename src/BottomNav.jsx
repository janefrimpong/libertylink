import React from 'react';
import { FaHome, FaRobot, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BottomNav = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around p-2">
            <button onClick={() => navigate('/home')} className="flex flex-col items-center">
                <FaHome className="text-xl" />
                <span className="text-sm">Home</span>
            </button>
            <button onClick={() => navigate('/chat')} className="flex flex-col items-center">
                <FaRobot className="text-xl" />
                <span className="text-sm">Chatbot</span>
            </button>
            <button onClick={() => navigate('/account')} className="flex flex-col items-center">
                <FaUser className="text-xl" />
                <span className="text-sm">Account</span>
            </button>
        </div>
    );
};

export default BottomNav;
