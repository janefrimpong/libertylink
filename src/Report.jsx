import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Report = () => {
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the report to your backend
        console.log('Report submitted:', { category, description });
        // After submission, navigate back to the home page or show a success message
        navigate('/home');
    };

    return (
        <div className="p-8 min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-10">Submit a Report</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Select Category:</label>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="Political Rights">Political Right</option>
                        <option value="Civil Rights">Civil Right</option>
                        <option value="Economic Rights"> Economic Right</option>
                        <option value="Cultural Rights">Cultural Right</option>
                        <option value="Digital Rights">Digital Right</option>
                        <option value="Social Rights">Social Right</option>
                        <option value="Cultural Rights">Cultural Right</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="border border-gray-300 rounded p-2 w-full h-32" 
                        placeholder="Describe the issue..." 
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Submit Report
                </button>
            </form>
        </div>
    );
};

export default Report;
