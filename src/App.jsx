import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Profile from './profile';
import Home from './home';
import Overview from './Overview'; // Placeholder for new page
import News from './News'; // Placeholder for new page
import Events from './Events'; // Placeholder for new page
import Resources from './Resources'; // Placeholder for new page

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/home" element={<Home />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/news" element={<News />} />
                <Route path="/events" element={<Events />} />
                <Route path="/resources" element={<Resources />} />
            </Routes>
        </Router>
    );
};

export default App;
