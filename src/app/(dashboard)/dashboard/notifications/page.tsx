'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Trash2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface Notification {
  id: number;
  message: string;
  date: string;
  read: boolean;
  type: 'price_drop' | 'new_listing' | 'saved_search' | 'system';
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  // Simulate fetching notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Mock data for demonstration
        const mockNotifications = [
          {
            id: 1,
            message: 'Price drop on Luxury Condo with Ocean View - Now $1,125,000',
            date: '2023-10-16',
            read: false,
            type: 'price_drop'
          },
          {
            id: 2,
            message: 'New properties matching your "Apartments in New York" search',
            date: '2023-10-15',
            read: false,
            type: 'saved_search'
          },
          {
            id: 3,
            message: 'Your saved property "Brownstone in Brooklyn Heights" has been sold',
            date: '2023-10-13',
            read: true,
            type: 'system'
          },
          {
            id: 4,
            message: 'New property listed in your favorite neighborhood: Upper West Side',
            date: '2023-10-12',
            read: true,
            type: 'new_listing'
          },
          {
            id: 5,
            message: 'Price drop on Modern Penthouse in Downtown - Now $1,750,000',
            date: '2023-10-10',
            read: true,
            type: 'price_drop'
          },
        ];
        
        setNotifications(mockNotifications);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);

  // Mark a notification as read
  const markAsRead = (notificationId: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  // Delete a notification
  const deleteNotification = (notificationId: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== notificationId)
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    if (confirm('Are you sure you want to delete all notifications?')) {
      setNotifications([]);
    }
  };

  // Filter notifications
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread'
      ? notifications.filter(notification => !notification.read)
      : notifications.filter(notification => notification.type === filter);

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-yellow-500 mr-2" />
          <div className="text-2xl font-bold">{unreadCount} unread</div>
        </div>
      </div>

      {/* Notification settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Control how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-gray-500">Receive daily email digests</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Price Drops</div>
                <div className="text-sm text-gray-500">Get notified when saved properties drop in price</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">New Matches</div>
                <div className="text-sm text-gray-500">Alerts for new properties matching your searches</div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Notification filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'} 
          onClick={() => setFilter('all')}
          className="text-sm"
        >
          All
        </Button>
        <Button 
          variant={filter === 'unread' ? 'default' : 'outline'} 
          onClick={() => setFilter('unread')}
          className="text-sm"
        >
          Unread
        </Button>
        <Button 
          variant={filter === 'price_drop' ? 'default' : 'outline'} 
          onClick={() => setFilter('price_drop')}
          className="text-sm"
        >
          Price Drops
        </Button>
        <Button 
          variant={filter === 'saved_search' ? 'default' : 'outline'} 
          onClick={() => setFilter('saved_search')}
          className="text-sm"
        >
          Saved Searches
        </Button>
        <Button 
          variant={filter === 'new_listing' ? 'default' : 'outline'} 
          onClick={() => setFilter('new_listing')}
          className="text-sm"
        >
          New Listings
        </Button>
      </div>
      
      {/* Actions */}
      <div className="flex justify-between">
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            className="text-blue-600 border-blue-200 hover:bg-blue-50 text-sm"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        )}
        <Button 
          variant="outline" 
          className="text-rose-600 border-rose-200 hover:bg-rose-50 text-sm ml-auto"
          onClick={clearAllNotifications}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-400">Loading notifications...</div>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-10 text-center">
          <div className="text-center py-10">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {filter === 'all' 
                ? 'No notifications' 
                : filter === 'unread' 
                  ? 'No unread notifications' 
                  : `No ${filter.replace('_', ' ')} notifications`}
            </h3>
          </div>
          <p className="text-gray-500 mb-6 max-w-md">
            {filter === 'all' 
              ? "You'll be notified about property updates and saved search results."
              : "Check back later for updates."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <li 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <Bell className={`h-5 w-5 ${!notification.read ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>
                    <p className="text-sm text-gray-500">{notification.date}</p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 