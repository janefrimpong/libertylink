import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Profile from './profile';
import Home from './home';
import Overview from './Overview'; // Placeholder for new page
import News from './News'; // Placeholder for new page
import Events from './Events'; // Placeholder for new page
import Resources from './Resources'; // Placeholder for new page
import ChatPage from './ChatPage'; // Import your ChatPage component
import Account from './Account'; // Import the Account component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/home" element={<Home />} />
                <Route path="/account" element={<Account />} /> {/* Add account route */}
                <Route path="/overview" element={<Overview />} />
                <Route path="/news" element={<News />} />
                <Route path="/events" element={<Events />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/chat" element={<ChatPage />} /> {/* Add chat route */}
            </Routes>
        </Router>
    );
};

export default App;
