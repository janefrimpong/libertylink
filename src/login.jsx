import React, { useState } from 'react';
import { FaGithub, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error messages

        try {
            const response = await fetch('https://liberty-link-server.onrender.com/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed'); // Use the error message from the response
            }

            const data = await response.json();
            // Store the token and user ID (assuming the user ID is in the response)
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data._id); // Store user ID from login response

            // Navigate to the home page or account page
            navigate('/home');
        } catch (error) {
            setErrorMessage(error.message); // Set the error message to display
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Login</h2>
                <p className="text-gray-600 mb-6">Enter your credentials to access the portal</p>

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
                        {errorMessage}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleLogin}>
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
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                    >
                        Login with Email
                    </button>
                </form>

                <div className="flex items-center justify-between mt-6">
                    <span className="border-t w-1/5 lg:w-1/4"></span>
                    <span className="text-gray-500 text-xs">or continue with</span>
                    <span className="border-t w-1/5 lg:w-1/4"></span>
                </div>

                <div className="mt-4 space-y-2">
                    <a href="https://your-google-login-url.com" className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
                        <FaGoogle className="mr-2" /> Login with Google
                    </a>
                    <a href="https://your-github-login-url.com" className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
                        <FaGithub className="mr-2" /> Login with GitHub
                    </a>
                    <a href="https://your-microsoft-login-url.com" className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
                        <FaMicrosoft className="mr-2" /> Login with Microsoft
                    </a>
                </div>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Don't have an account? 
                    <button 
                        onClick={() => navigate('/signup')} 
                        className="text-blue-500 hover:underline focus:outline-none"
                    > 
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
