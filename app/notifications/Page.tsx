"use client";

import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  // Fetch notifications from localStorage
  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Disease Notifications</h1>
        {notifications.length > 0 ? (
          <ul className="text-left list-disc list-inside">
            {notifications.map((notification, index) => (
              <li key={index} className="text-gray-700">
                <strong>{notification.title}</strong>: {notification.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No notifications available.</p>
        )}
      </div>
    </div>
  );
}