# LocalHub - Neighborhood Services Platform

A modern web application for managing local service businesses, built with React, TypeScript, and Node.js.

## Features

- User authentication and authorization
- Business profile management
- Service booking system
- Customer management
- Google Maps integration
- M-Pesa payment integration
- Responsive dashboard interface

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/localhub.git
   cd localhub
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. Set up environment variables:
   ```bash
   # Frontend environment
   cp .env.example .env
   # Edit .env and add your Google Maps API key

   # Backend environment
   cd server
   cp .env.example .env
   # Edit .env and add your database credentials and JWT secret
   ```

4. Set up the database:
   ```bash
   # Create database and tables
   mysql -u your_username -p < server/database/schema.sql
   ```

5. Start the development servers:
   ```bash
   # Start backend server (from server directory)
   npm run dev

   # Start frontend development server (from project root)
   npm run dev
   ```

6. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Environment Variables

### Frontend (.env)
- `VITE_API_URL`: Backend API URL
- `VITE_GOOGLE_MAPS_API_KEY`: Google Maps API key
- `VITE_ENABLE_MAPS`: Enable/disable maps feature
- `VITE_ENABLE_PAYMENTS`: Enable/disable payments feature

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_USER`: Database username
- `DB_PASS`: Database password
- `DB_NAME`: Database name
- `JWT_SECRET`: JWT signing secret
- `JWT_EXPIRES_IN`: JWT expiration time
- `CORS_ORIGIN`: Allowed CORS origin

## Development

- Frontend built with React, TypeScript, and Tailwind CSS
- Backend built with Node.js, Express, and MySQL
- Authentication using JWT
- State management with Zustand
- Form handling with native FormData
- Styling with Tailwind CSS and clsx for conditional classes

## Security Notes

- Never commit .env files
- Keep API keys and secrets secure
- Use environment variables for sensitive data
- Regularly update dependencies
- Follow security best practices

## License

MIT License - see LICENSE file for details
