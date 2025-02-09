"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Notification {
  title: string;
  message: string;
  diseaseName: string;
  district: string;
  village: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);

  const handleClearNotifications = () => {
    localStorage.removeItem("notifications");
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-600">No notifications available.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <Card key={index} className="bg-white p-4 shadow-lg rounded-lg">
              <CardContent>
                <h2 className="text-xl font-semibold text-red-600">
                  {notification.title}
                </h2>
                <p className="text-gray-700 mt-2">{notification.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Disease:</strong> {notification.diseaseName}
                  <br />
                  <strong>District:</strong> {notification.district}
                  <br />
                  <strong>Village:</strong> {notification.village}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <Button
          variant="destructive"
          onClick={handleClearNotifications}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Clear All Notifications
        </Button>
        <Button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}
