import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';

const Account = () => {
    const [userData, setUserData] = useState(null); // Start with null to indicate loading state
    const navigate = useNavigate();

    const fetchUserData = async () => {
        const userId = localStorage.getItem('userId'); // Get the user ID from local storage
        const token = localStorage.getItem('token'); // Get the token from local storage

        try {
            const response = await fetch(`https://liberty-link-server.onrender.com/profile/fetch/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the request
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUserData(data); // Set the fetched data to state
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('Could not fetch user data. Please try again.');
        }
    };

    useEffect(() => {
        fetchUserData(); // Call fetchUserData on component mount
    }, []);

    const handleLogout = () => {
        // Implement your logout logic here, if needed
        navigate('/'); // Navigate to the login page
    };

    // Show a loading state while fetching data
    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4 relative">
            {/* Logout button positioned absolutely at the top right corner */}
            <button 
                onClick={handleLogout}
                className="absolute top-10 right-4 border py-1 px-3 rounded-md hover:bg-black hover:text-white transition"
                aria-label="Logout"
            >
                Logout
            </button>

            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg mx-auto mt-16">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Account Information</h2>
                <p className="text-gray-600 font-semibold mb-4">Profile</p>

                {/* Profile Picture */}
                <div className="mb-4">
                    <img 
                        src={userData.profilePicture} 
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-2 border-gray-300"
                    />
                </div>

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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
                        <p className="mt-1 text-gray-800">{userData.preferredLanguage}</p>
                    </div>
                </div>

                <button 
                    onClick={() => navigate('/profile')} 
                    className="mt-6 w-full bg-gray-600 text-white py-2 rounded-md"
                >
                    Edit Profile
                </button>
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
};

export default Account;
