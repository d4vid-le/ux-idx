# IDX Real Estate Solution

[![Next.js](https://img.shields.io/badge/Next.js-13.x-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.x-3ecf8e)](https://supabase.com/)

A modern web application that enables real estate professionals and clients to search, filter, and view property listings through REBNY's IDX data feed.

## 📋 Table of Contents

- [Features](#-features)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Development Workflow](#-development-workflow)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **Advanced Property Search** - Search by location, price range, property type, bedrooms, bathrooms, and other criteria
- **Interactive Map View** - Visualize property locations on an interactive map interface
- **Detailed Property Pages** - View comprehensive information about each property with photo galleries, virtual tours, and floor plans
- **Agent Profiles** - Connect with real estate agents and view their listings
- **Responsive Design** - Optimized for all devices from mobile to desktop
- **User Authentication** - Secure login and registration with saved searches and favorite properties
- **Real-Time Updates** - Property data synchronized with REBNY's IDX feed

## 🏗 Project Architecture

The IDX Real Estate Solution is built on a modern tech stack with a focus on performance, scalability, and developer experience:

### System Architecture

```
┌─────────────────┐     ┌───────────────────┐     ┌───────────────────┐
│                 │     │                   │     │                   │
│   Client Side   │◄───►│   Next.js API     │◄───►│   External APIs   │
│   (React/Next)  │     │   (Server/API)    │     │   (REBNY IDX)     │
│                 │     │                   │     │                   │
└─────────────────┘     └───────┬───────────┘     └───────────────────┘
                                │
                                ▼
                        ┌───────────────────┐
                        │                   │
                        │     Supabase      │
                        │  (DB/Auth/Storage)│
                        │                   │
                        └───────────────────┘
```

### Data Flow

1. **Client Requests**: User interactions trigger requests from the client-side React application
2. **API Processing**: Next.js API routes handle requests and process data
3. **Data Storage/Retrieval**: Supabase provides database, authentication, and storage services
4. **External Data**: Integration with REBNY IDX API for real-time property data
5. **Response Rendering**: Server-rendered or client-rendered responses displayed to the user

### Key Components

- **Frontend Layer**: Next.js with React and TypeScript for UI components
- **API Layer**: Next.js API routes for server-side logic and external API integration
- **Data Layer**: Supabase for database, user authentication, and file storage
- **Integration Layer**: REBNY IDX API client for property data

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/idx-real-estate-solution.git
   cd idx-real-estate-solution
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Setup

1. Copy the environment example file:
   ```bash
   cp .env.example .env.local
   ```

2. Update the `.env.local` file with your specific configuration values:
   - API keys for REBNY IDX
   - Supabase credentials
   - Google Maps API key
   - Other service credentials

## 💻 Development Workflow

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

3. Make changes to the code and see the updates in real-time thanks to Fast Refresh.

### Code Style and Linting

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

### Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

## 📚 API Documentation

API documentation is available via Swagger UI when running the development server:

- [Local API Documentation](http://localhost:3000/api-docs)

### Key Endpoints

- `/api/properties` - Search and filter properties
- `/api/properties/{id}` - Get details for a specific property
- `/api/agents` - List real estate agents
- `/api/agents/{id}` - Get details for a specific agent

## 🌐 Deployment

The project is configured for deployment on Vercel:

```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Deploy to production
vercel --prod
```

For other deployment options, see the [deployment documentation](./docs/deployment.md).

## 🔧 Tech Stack

### Frontend
- **Next.js** - React framework for server-rendered or statically-exported React applications
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Icon library

### Backend
- **Next.js API Routes** - API routes built into Next.js
- **Supabase** - Open source Firebase alternative with PostgreSQL database
- **PostgreSQL** - Advanced open-source relational database

### Authentication
- **Supabase Auth** - User authentication system

### Deployment
- **Vercel** - Platform for frontend frameworks and static sites

## 📁 Project Structure

```
├── /src                     # Source code
│   ├── /app                 # Next.js App Router pages and layouts
│   ├── /components          # React components
│   │   ├── /ui              # UI components
│   │   ├── /forms           # Form components
│   │   ├── /layout          # Layout components
│   │   └── /property        # Property-specific components
│   ├── /lib                 # Utility functions
│   ├── /services            # External service integrations
│   ├── /hooks               # Custom React hooks
│   ├── /types               # TypeScript type definitions
│   ├── /styles              # Global styles
│   └── /data                # Mock data and constants
│
├── /public                  # Static assets
├── /docs                    # Documentation
├── /tests                   # Test files
└── [Configuration Files]    # Various config files (next.config.js, etc.)
```

## 🤝 Contributing

We welcome contributions to the IDX Real Estate Solution! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information.

### Development Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by the IDX Development Team
