import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa'; // Importing a close icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ChatPage = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [messages, setMessages] = useState([]); // Chat messages
    const [input, setInput] = useState(''); // User input
    const [isBotTyping, setIsBotTyping] = useState(false); // Bot typing indicator
    const messagesEndRef = useRef(null); // Ref to scroll to the latest message

    const handleSendMessage = () => {
        if (input.trim() === '') return;

        // Add user message
        setMessages(prev => [...prev, { text: input, sender: 'user' }]);

        // Simulate bot response
        setIsBotTyping(true);
        setInput(''); // Clear input field

        setTimeout(() => {
            const botResponse = getBotResponse(input);
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
            setIsBotTyping(false);
            scrollToBottom(); // Scroll to bottom after new message
        }, 1000); // Simulate a delay for the bot response
    };

    const getBotResponse = (userMessage) => {
        // Simple keyword-based responses
        if (userMessage.toLowerCase().includes('help')) {
            return "I'm here to help! What do you need assistance with?";
        }
        if (userMessage.toLowerCase().includes('human rights')) {
            return "Human rights are fundamental rights that belong to every person.";
        }
        return "I'm not sure how to respond to that. Can you ask something else?";
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const clearChat = () => {
        setMessages([]); // Clear the messages
    };

    const handleCloseChat = () => {
        clearChat(); // Clear chat when closing
        navigate('/home'); // Navigate back to home page
    };

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom on initial render
    }, [messages]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white border border-gray-300 shadow-lg rounded-lg p-4 h-[500px] flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold">Chat with Us</h3>
                    <button onClick={handleCloseChat}>
                        <FaTimes className="text-gray-500 hover:text-gray-700" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto mb-2 p-2 border border-gray-200 rounded-lg">
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb-2 ${msg.sender === 'bot' ? 'text-blue-600' : 'text-green-600'}`}>
                            <strong>{msg.sender === 'bot' ? 'Bot' : 'You'}:</strong> {msg.text}
                        </div>
                    ))}
                    {isBotTyping && <div className="mb-2 text-gray-500">Bot is typing...</div>}
                    <div ref={messagesEndRef} /> {/* Anchor for scrolling */}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg w-full p-2"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown} // Handle keydown for Enter
                    />
                    <button 
                        className="bg-blue-600 text-white rounded-lg p-2 ml-2"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
