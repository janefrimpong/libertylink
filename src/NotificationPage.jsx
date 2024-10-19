import React, { useState } from 'react';
import { FaHome, FaRobot, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';

const NotificationPage = () => {
    const navigate = useNavigate();

    // Sample notification data
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "New Event: Human Rights Conference",
            date: "October 12, 2024",
            description: "Join us for a global conference on human rights and advocacy."
        },
        {
            id: 2,
            title: "New Article Published",
            date: "October 15, 2024",
            description: "Check out the latest article on human rights in developing countries."
        },
        {
            id: 3,
            title: "Reminder: Complete Your Profile",
            date: "October 17, 2024",
            description: "Your profile is incomplete. Update your information to stay connected."
        }
    ]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="p-6 flex-grow">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Notifications</h2>
                
                <div className="space-y-4">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div key={notification.id} className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-800">{notification.title}</h3>
                                <p className="text-sm text-gray-500">{notification.date}</p>
                                <p className="mt-2 text-gray-700">{notification.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No new notifications.</p>
                    )}
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <BottomNav/>
        </div>
    );
};

export default NotificationPage;
