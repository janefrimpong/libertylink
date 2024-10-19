import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [isLoading, setIsLoading] = useState(false); // State for loading
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error messages
        setSuccessMessage(''); // Clear any previous success messages
        setIsLoading(true); // Set loading state to true

        try {
            const response = await fetch('https://liberty-link-server.onrender.com/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Sign-up failed'); // Use the error message from the response
            }

            const data = await response.json();
            // Store the token (e.g., in local storage or context)
            localStorage.setItem('token', data.token);

            // Show success message and navigate after a delay
            setSuccessMessage('Sign-up successful! Redirecting to profile...');
            setTimeout(() => {
                navigate('/profile'); // Redirect to profile page
            }, 1500);
        } catch (error) {
            setErrorMessage(error.message); // Set the error message to display
        } finally {
            setIsLoading(false); // Stop loading when the process is complete
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Sign Up</h2>
                <p className="text-gray-600 mb-6">Enter your credentials below</p>

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
                        {errorMessage} {/* Display the error message */}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded">
                        {successMessage} {/* Display success message */}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSignUp}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your email" 
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your password" 
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading} // Disable the button when loading
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
