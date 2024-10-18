import React from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    // Sample user data; replace this with actual user data from your state management or context
    const userData = {
        fullName: "John Doe",
        mobileNumber: "+233 123 456 789",
        nationality: "Ghana"
    };

    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleLogout = () => {
        // Implement your logout logic here, if needed
        navigate('/'); // Navigate to the login page
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 relative">
            {/* Logout button positioned absolutely at the top right corner */}
            <button 
                onClick={handleLogout}
                className="absolute top-10 right-4 border border-blue-600 text-blue-600 py-1 px-3 rounded-md hover:bg-blue-600 hover:text-white transition"
                aria-label="Logout"
            >
                Logout
            </button>

            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Account Information</h2>
                <p className="text-gray-600 mb-6">Here are your account details.</p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <p className="mt-1 text-gray-800">{userData.fullName}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile Phone Number</label>
                        <p className="mt-1 text-gray-800">{userData.mobileNumber}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nationality</label>
                        <p className="mt-1 text-gray-800">{userData.nationality}</p>
                    </div>
                </div>

                <button 
                    onClick={() => navigate('/profile')} 
                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Account;
