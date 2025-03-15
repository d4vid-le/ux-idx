# UX-IDX: User Management Dashboard

A modern dashboard interface for the IDX Real Estate Solution, featuring property management, user profiles, and agent communication tools.

## 🏠 Overview

This repository contains the user interface components and dashboard features for real estate agents and clients to interact with property listings, manage saved searches, and communicate with each other.

## ✨ Features

- **Dashboard Overview**: Personalized welcome, quick links, and recent activity
- **Saved Properties & Searches**: Track favorite listings and automated search alerts
- **Agent Communication**: Direct messaging and contact with assigned agents
- **Notification Center**: Central hub for updates and alerts
- **Profile Management**: Personal info, security settings, and notification preferences
- **Activity Tracking**: Monitor login history and account activity
- **Property Search**: Advanced filtering and results display
- **Schedule Property Viewings**: Allow users to schedule property tours with agents

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library with shadcn/ui patterns
- **State Management**: React hooks and context
- **Authentication**: JWT with Supabase Auth
- **API**: Next.js API routes
- **Data Storage**: LocalStorage (demo), API endpoints (production)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 📋 Project Structure

The dashboard components are organized as follows:

- `/src/components/dashboard/`: Dashboard-specific components
- `/src/app/(dashboard)/`: Dashboard pages and routes
- `/src/components/ui/`: Reusable UI components
- `/src/types/`: TypeScript type definitions

## 🔐 Demo Access

For testing the client-side dashboard, use:

**Email:** `demo@idxsolution.com`  
**Password:** `IDX@demo2023`

## 📊 Project Status

This project is actively under development as part of the IDX Real Estate Solution platform.

## 📝 License

[MIT](LICENSE)

## 📚 Feature Documentation

### Schedule a Viewing Feature

#### Data Flow & Management

The Schedule a Viewing feature allows users to request property tours with real estate agents. Here's how the data is managed throughout the application:

1. **Data Storage**:
   - In the demo/development environment, scheduled viewings are stored in `localStorage` with the following structure:
     - User viewings: Stored in `propertyViewings` key as an array of viewing objects
     - Agent viewings: Stored in `agentViewings` key as an object where keys are agent IDs and values are arrays of viewing objects

2. **Data Structure**:
   ```typescript
   interface Viewing {
     id: string;                           // Unique identifier
     propertyId: string;                   // Property being viewed
     agentId: string;                      // Agent conducting the viewing
     userId: string;                       // User who scheduled the viewing
     date: string;                         // Date of viewing (YYYY-MM-DD)
     timeSlot: string;                     // Time of viewing (HH:MM)
     status: 'pending'|'confirmed'|'cancelled'|'completed'; // Current status
     createdAt: string;                    // When viewing was scheduled
     message?: string;                     // Optional message from user
   }
   ```

3. **Component Interactions**:
   - `ScheduleViewingModal`: Creates new viewing requests and saves them to both user and agent storage
   - `ScheduledViewings`: Reads from storage to display viewings and handles status updates
   - When an agent confirms/cancels a viewing, both user and agent storage are updated

4. **Production Implementation Notes**:
   - In a production environment, replace localStorage with API calls to a backend service
   - Implement real-time updates using webhooks or websockets for status changes
   - Add email notifications for viewing confirmations and reminders
   - Integrate with calendar systems (Google Calendar, Outlook) for automatic scheduling

5. **Future Enhancements**:
   - Conflict detection for overlapping viewing times
   - Recurring availability settings for agents
   - Integration with property access systems for self-guided tours
   - Analytics on viewing conversion rates

This implementation provides a complete proof-of-concept that can be extended with actual backend services in production.
