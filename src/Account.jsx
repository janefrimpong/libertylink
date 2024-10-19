import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';

const Account = () => {
    const [userData, setUserData] = useState({
        fullName: '',
        mobileNumber: '',
        nationality: '',
        profilePicture: '',
        preferredLanguage: '',
    });
    const [editing, setEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState(userData);
    const [idFile, setIdFile] = useState(null); // For file uploads
    const [profilePictureFile, setProfilePictureFile] = useState(null); // For file uploads
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/'); // Navigate to the login page
    };

    // Function to fetch user data
    const fetchUserData = async () => {
        const userId = localStorage.getItem('userId'); // Get the user ID from local storage
        const token = localStorage.getItem('token'); // Get the token from local storage

        try {
            const response = await fetch(`https://liberty-link-server.onrender.com/profile/fetch/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to fetch user data: ${response.status} - ${errorData.message}`);
            }

            const data = await response.json();
            setUserData(data);
            setUpdatedData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('Could not fetch user data. Please try again.');
        }
    };

    // Function to update user profile
    const updateUserProfile = async () => {
        const userId = localStorage.getItem('userId'); // Get the user ID from local storage
        const token = localStorage.getItem('token'); // Get the token from local storage

        const formData = new FormData(); // Create a FormData object

        // Append updated data to formData
        formData.append('fullName', updatedData.fullName);
        formData.append('mobileNumber', updatedData.mobileNumber);
        formData.append('nationality', updatedData.nationality);
        formData.append('preferredLanguage', updatedData.preferredLanguage);
        
        // Append files if they exist
        if (idFile) {
            formData.append('idFile', idFile);
        }
        if (profilePictureFile) {
            formData.append('profilePicture', profilePictureFile);
        }

        try {
            const response = await fetch(`https://liberty-link-server.onrender.com/profile/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to update user profile: ${response.status} - ${errorData.message}`);
            }

            const data = await response.json();
            setUserData(data);
            setEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating user profile:', error);
            alert('Could not update user profile. Please try again.');
        }
    };

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4 relative">
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

                <div className="mb-4">
                    <img 
                        src={userData.profilePicture || "https://via.placeholder.com/150"} 
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-2 border-gray-300"
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        {editing ? (
                            <input
                                type="text"
                                value={updatedData.fullName}
                                onChange={(e) => setUpdatedData({ ...updatedData, fullName: e.target.value })}
                                className="mt-1 w-full px-3 py-2 border rounded-md"
                            />
                        ) : (
                            <p className="mt-1 text-gray-800">{userData.fullName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile Phone Number</label>
                        {editing ? (
                            <input
                                type="tel"
                                value={updatedData.mobileNumber}
                                onChange={(e) => setUpdatedData({ ...updatedData, mobileNumber: e.target.value })}
                                className="mt-1 w-full px-3 py-2 border rounded-md"
                            />
                        ) : (
                            <p className="mt-1 text-gray-800">{userData.mobileNumber}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nationality</label>
                        {editing ? (
                            <input
                                type="text"
                                value={updatedData.nationality}
                                onChange={(e) => setUpdatedData({ ...updatedData, nationality: e.target.value })}
                                className="mt-1 w-full px-3 py-2 border rounded-md"
                            />
                        ) : (
                            <p className="mt-1 text-gray-800">{userData.nationality}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
                        {editing ? (
                            <input
                                type="text"
                                value={updatedData.preferredLanguage}
                                onChange={(e) => setUpdatedData({ ...updatedData, preferredLanguage: e.target.value })}
                                className="mt-1 w-full px-3 py-2 border rounded-md"
                            />
                        ) : (
                            <p className="mt-1 text-gray-800">{userData.preferredLanguage}</p>
                        )}
                    </div>
                </div>

                {editing ? (
                    <div className="flex justify-between mt-6">
                        <button onClick={updateUserProfile} className="bg-green-600 text-white py-2 px-4 rounded-md">
                            Save Changes
                        </button>
                        <button onClick={() => setEditing(false)} className="bg-red-600 text-white py-2 px-4 rounded-md">
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setEditing(true)} 
                        className="mt-6 w-full bg-gray-600 text-white py-2 rounded-md"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <BottomNav />
        </div>
    );
};

export default Account;
