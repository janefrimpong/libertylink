import React, { useState } from 'react';

const Profile = () => {
    const [step, setStep] = useState(1); // Track the current step of the profile setup

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Set Up Your Profile</h2>
                <p className="text-gray-600 mb-6">Please provide your details to complete your profile setup.</p>

                {/* Step 1: Basic Information */}
                {step === 1 && (
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" className="mt-1 w-full px-3 py-2 border rounded-md" placeholder="Enter your full name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mobile Phone Number</label>
                            <input type="tel" className="mt-1 w-full px-3 py-2 border rounded-md" placeholder="Enter your mobile phone number" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nationality</label>
                            <select className="mt-1 w-full px-3 py-2 border rounded-md">
                                <option>Select your nationality</option>
                                {/* Add options here */}
                            </select>
                        </div>
                        <button type="button" onClick={nextStep} className="w-full bg-blue-600 text-white py-2 rounded-md">Next</button>
                    </form>
                )}

                {/* Step 2: Additional Information */}
                {step === 2 && (
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
                            <select className="mt-1 w-full px-3 py-2 border rounded-md">
                                <option>Select your preferred language</option>
                                {/* Add options here */}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Occupation</label>
                            <input type="text" className="mt-1 w-full px-3 py-2 border rounded-md" placeholder="Enter your occupation" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Organization</label>
                            <input type="text" className="mt-1 w-full px-3 py-2 border rounded-md" placeholder="Enter your organization" />
                        </div>
                        <button type="button" onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2">Back</button>
                        <button type="button" onClick={nextStep} className="bg-blue-600 text-white py-2 px-4 rounded-md">Next</button>
                    </form>
                )}

                {/* Step 3: Areas of Interest */}
                {step === 3 && (
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Areas of Interest in Human Rights</label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" /> Area of Interest 1
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" /> Area of Interest 2
                                </label>
                                {/* Add more options as needed */}
                            </div>
                        </div>
                        <button type="button" onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2">Back</button>
                        <button type="button" onClick={nextStep} className="bg-blue-600 text-white py-2 px-4 rounded-md">Next</button>
                    </form>
                )}

                {/* Step 4: File Uploads */}
                {step === 4 && (
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload ID</label>
                            <input type="file" className="mt-1 w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Profile Picture</label>
                            <input type="file" className="mt-1 w-full" />
                        </div>
                        <button type="button" onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2">Back</button>
                        <button type="button" onClick={nextStep} className="bg-blue-600 text-white py-2 px-4 rounded-md">Next</button>
                    </form>
                )}

                {/* Step 5: Completion */}
                {step === 5 && (
                    <div className="text-center space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">Profile Setup Complete!</h3>
                        <p className="text-gray-600">Thank you for completing your profile. You're all set!</p>
                        <button type="button" onClick={() => alert("Profile setup complete!")} className="w-full bg-green-600 text-white py-2 rounded-md">Finish</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
