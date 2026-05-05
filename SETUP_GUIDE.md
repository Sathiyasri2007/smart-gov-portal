# Smart Government Scheme Portal - Complete Setup Guide

## Prerequisites

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Choose one option:
   - **Option A**: Local MongoDB - [Download](https://www.mongodb.com/try/download/community)
   - **Option B**: MongoDB Atlas (Cloud) - [Sign up free](https://www.mongodb.com/cloud/atlas/register)

## Quick Start

### 1. Install MongoDB (Choose One)

#### Option A: Local MongoDB
1. Download and install MongoDB Community Server
2. Start MongoDB service:
   ```bash
   # Windows (run as Administrator)
   net start MongoDB
   
   # Or use MongoDB Compass GUI
   ```

#### Option B: MongoDB Atlas (Recommended for beginners)
1. Create free account at https://www.mongodb.com/cloud/atlas/register
2. Create a new cluster (free tier)
3. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. Update `backend/.env` with your connection string

### 2. Backend Setup

```bash
cd backend

# Install dependencies (already done)
npm install

# Update .env file with your MongoDB URI
# If using local MongoDB, keep: mongodb://localhost:27017/smart-government-portal
# If using Atlas, replace with your connection string

# Create admin user
node utils/seedAdmin.js

# Start backend server
npm run dev
```

Backend will run on: http://localhost:5000

### 3. Frontend Setup

```bash
# In a new terminal, from project root
cd frontend

# Install dependencies (if not already done)
npm install

# Create .env file (if not exists)
echo VITE_API_URL=http://localhost:5000/api > .env

# Start frontend
npm run dev
```

Frontend will run on: http://localhost:3000

## Default Login Credentials

After running the seed script:

**Admin Account:**
- Email: `admin@smartgov.in`
- Password: `admin123`

**Test User Account:**
- Register a new user at http://localhost:3000/register

## Project Structure

```
smart-government-scheme-portal/
├── frontend/            # React.js Frontend
│   ├── src/            # Source code
│   │   ├── components/ # Reusable components
│   │   ├── context/    # React context (Auth, Theme, etc.)
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   ├── utils/      # Utilities
│   │   └── App.jsx     # Main app
│   ├── public/         # Static assets
│   ├── .env            # Frontend environment variables
│   ├── package.json    # Frontend dependencies
│   └── vite.config.js  # Vite configuration
│
├── backend/            # Node.js/Express API
│   ├── config/         # Database config
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth, validation, error handling
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── utils/          # Helper functions
│   ├── uploads/        # Uploaded documents
│   ├── .env            # Backend environment variables
│   ├── package.json    # Backend dependencies
│   └── server.js       # Entry point
│
└── README.md           # Main documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Schemes (Public)
- `GET /api/schemes` - Get all schemes
- `GET /api/schemes/:id` - Get scheme details

### Schemes (Admin Only)
- `POST /api/schemes` - Create scheme
- `PUT /api/schemes/:id` - Update scheme
- `DELETE /api/schemes/:id` - Delete scheme

### Applications (User)
- `POST /api/applications` - Submit application
- `GET /api/applications/user` - Get my applications
- `GET /api/schemes/recommended` - Get recommended schemes

### Applications (Admin)
- `GET /api/applications` - Get all applications
- `PATCH /api/applications/:id` - Update status

### Admin Dashboard
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/analytics` - Analytics data
- `GET /api/admin/users` - Get all users

## Testing the Application

1. **Register a User**
   - Go to http://localhost:3000/register
   - Create a new account

2. **Login as User**
   - Browse schemes
   - Apply for schemes
   - Track application status

3. **Login as Admin**
   - Email: admin@smartgov.in
   - Password: admin123
   - Manage schemes
   - Review applications
   - View analytics

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
- Windows: `net start MongoDB`
- Or use MongoDB Atlas connection string

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in `backend/.env` to another port (e.g., 5001)

### CORS Error
**Solution**: Make sure backend is running and VITE_API_URL in frontend `.env` matches backend URL

### File Upload Error
**Solution**: Make sure `backend/uploads` directory exists (created automatically)

## Features Implemented

✅ JWT Authentication
✅ Role-based Access Control (User/Admin)
✅ Scheme Management (CRUD)
✅ Application Submission with Document Upload
✅ Application Status Tracking
✅ Search & Filter Schemes
✅ Admin Dashboard with Analytics
✅ Responsive Design
✅ Dark/Light Mode
✅ Multi-language Support (EN/HI)
✅ Notification System
✅ Input Validation
✅ Error Handling
✅ Security (Helmet, Rate Limiting, CORS)

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in .env
2. Use strong JWT_SECRET
3. Use MongoDB Atlas for database
4. Deploy to: Heroku, Railway, Render, or AWS

### Frontend
1. Build: `cd frontend && npm run build`
2. Deploy `dist` folder to: Vercel, Netlify, or AWS S3

## Support

For issues or questions, check:
- Main README: `README.md`
- Backend README: `backend/README.md`
- Frontend README: `frontend/README.md`
- Project Status: `PROJECT_STATUS.md`

## License

MIT
