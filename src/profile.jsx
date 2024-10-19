import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [nationality, setNationality] = useState('');
    const [preferredLanguage, setPreferredLanguage] = useState('');
    const [areasOfInterest, setAreasOfInterest] = useState([]);
    const [idFile, setIdFile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const navigate = useNavigate();

    const finishProfile = async () => {
        // Check for required fields
        if (!fullName || !phoneNumber || !nationality || !preferredLanguage || areasOfInterest.length === 0) {
            alert('Please fill all fields in Step 1 and Step 2.');
            return;
        }

        if (!idFile || !profilePicture) {
            alert('Please upload your ID and Profile Picture.');
            return;
        }

        const profileData = {
            fullName,
            phoneNumber,
            nationality,
            preferredLanguage,
            areasOfInterest,
            // Add any other relevant data
        };

        const token = localStorage.getItem('token'); // Retrieve token

        try {
            const response = await fetch('https://liberty-link-server.onrender.com/profile/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(profileData),
            });

            if (!response.ok) {
                throw new Error('Profile creation failed');
            }

            // Navigate to Home page
            navigate('/home');
        } catch (error) {
            console.error('Profile creation error:', error);
            // Show an error message and retry
            alert('Profile creation failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Set Up Your Profile</h2>

                <form className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Mobile Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile Phone Number</label>
                        <input
                            type="tel"
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                            placeholder="Enter your mobile phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                    {/* Nationality */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nationality</label>
                        <select
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            required
                        >
                            <option>Select your nationality</option>
                            <option>Ghana</option>
                            <option>Nigeria</option>
                            <option>Gambia</option>
                        </select>
                    </div>

                    {/* Preferred Language */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
                        <select
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                            value={preferredLanguage}
                            onChange={(e) => setPreferredLanguage(e.target.value)}
                            required
                        >
                            <option>Select your preferred language</option>
                            <option>English</option>
                            <option>French</option>
                        </select>
                    </div>

                    {/* Areas of Interest */}
                    <div >
                        <label className="block text-sm font-medium text-gray-700">Areas of Interest in Human Rights</label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {['Civil Rights', 'Economic Rights', 'Cultural Rights',  'Digital Rights', 'Social Rights', 'Political Rights'].map((interest) => (
                                <label key={interest} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        value={interest}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setAreasOfInterest((prev) => [...prev, interest]);
                                            } else {
                                                setAreasOfInterest((prev) => prev.filter((i) => i !== interest));
                                            }
                                        }}
                                    />
                                    {interest}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Upload ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload ID</label>
                        <input
                            type="file"
                            className="mt-1 w-full"
                            onChange={(e) => setIdFile(e.target.files[0])}
                            required
                        />
                    </div>

                    {/* Upload Profile Picture */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Profile Picture</label>
                        <input
                            type="file"
                            className="mt-1 w-full"
                            onChange={(e) => setProfilePicture(e.target.files[0])}
                            required
                        />
                    </div>

                    {/* Finish Button */}
                    <button type="button" onClick={finishProfile} className="w-full bg-gray-600 text-white py-2 rounded-md">
                        Finish
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
