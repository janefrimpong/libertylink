import React, { useState } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            setMessages([...messages, { text: inputValue, sender: 'user' }]);
            setInputValue('');
            // Simulate a bot response
            setTimeout(() => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: 'Bot: How can I assist you today?', sender: 'bot' }
                ]);
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
                <h1 className="text-lg font-bold">Chat with Us</h1>
                <button className="text-white" onClick={() => window.history.back()}>
                    <FaTimes />
                </button>
            </header>

            <div className="flex-1 p-4 overflow-y-auto h-64"> {/* Reduced height */}
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}>
                        <span className={`inline-block px-4 py-2 rounded-lg ${msg.sender === 'bot' ? 'bg-gray-200' : 'bg-blue-600 text-white'}`}>
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 flex bg-white border-t">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-500">Send</button>
            </form>
        </div>
    );
};

export default ChatPage;
