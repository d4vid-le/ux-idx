'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Trash2, Settings, Users, Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface AgentNotification {
  id: number;
  message: string;
  date: string;
  read: boolean;
  type: 'client_inquiry' | 'property_update' | 'listing_status' | 'system';
}

export default function AgentNotificationsPage() {
  const [notifications, setNotifications] = useState<AgentNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  // Simulate fetching notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Mock data for demonstration
        const mockNotifications: AgentNotification[] = [
          {
            id: 1,
            message: 'New client inquiry about 123 Park Avenue property',
            date: '2023-10-16',
            read: false,
            type: 'client_inquiry'
          },
          {
            id: 2,
            message: 'Your listing at 456 Broadway has been approved',
            date: '2023-10-15',
            read: false,
            type: 'listing_status'
          },
          {
            id: 3,
            message: 'Price update required for 789 5th Avenue property',
            date: '2023-10-13',
            read: true,
            type: 'property_update'
          },
          {
            id: 4,
            message: 'Client John Smith scheduled a viewing for 123 Park Avenue',
            date: '2023-10-12',
            read: true,
            type: 'client_inquiry'
          },
          {
            id: 5,
            message: 'Your listing at 321 Madison Avenue has expired',
            date: '2023-10-10',
            read: true,
            type: 'listing_status'
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

  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'client_inquiry':
        return <Users className="h-5 w-5 text-blue-500" />;
      case 'property_update':
        return <Home className="h-5 w-5 text-green-500" />;
      case 'listing_status':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Agent Notifications</h1>
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-yellow-500 mr-2" />
          <div className="text-2xl font-bold">{unreadCount} unread</div>
        </div>
      </div>

      {/* Notification settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Control how you receive agent notifications</CardDescription>
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
                <div className="font-medium">Client Inquiries</div>
                <div className="text-sm text-gray-500">Get notified when clients contact you</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Listing Status Updates</div>
                <div className="text-sm text-gray-500">Alerts for changes to your property listings</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Property Updates</div>
                <div className="text-sm text-gray-500">Notifications about property information changes</div>
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
          variant={filter === 'client_inquiry' ? 'default' : 'outline'} 
          onClick={() => setFilter('client_inquiry')}
          className="text-sm"
        >
          Client Inquiries
        </Button>
        <Button 
          variant={filter === 'listing_status' ? 'default' : 'outline'} 
          onClick={() => setFilter('listing_status')}
          className="text-sm"
        >
          Listing Status
        </Button>
        <Button 
          variant={filter === 'property_update' ? 'default' : 'outline'} 
          onClick={() => setFilter('property_update')}
          className="text-sm"
        >
          Property Updates
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
              ? "You'll be notified about client inquiries, listing status changes, and property updates."
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
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <button 
                    className="ml-2 text-gray-400 hover:text-gray-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 