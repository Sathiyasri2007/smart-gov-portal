# Smart Government Scheme Portal

A modern, full-stack web application for managing government schemes with role-based access control, built with React.js and Node.js.

## 📁 Project Structure

```
smart-government-scheme-portal/
├── frontend/           # React.js Frontend Application
│   ├── src/           # Source files
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies
│
├── backend/           # Node.js Backend API
│   ├── config/        # Database configuration
│   ├── controllers/   # Route controllers
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   ├── utils/         # Utility functions
│   └── package.json   # Backend dependencies
│
└── README.md          # This file
```

## ✨ Features

- **Authentication & Authorization**: JWT-based with role-based access (User/Admin)
- **Scheme Management**: Browse, search, filter, and manage government schemes
- **Application System**: Apply for schemes with document upload and status tracking
- **Eligibility Checker**: Smart algorithm to match users with eligible schemes
- **Bookmark System**: Save favorite schemes for quick access
- **Scheme Comparison**: Compare up to 3 schemes side-by-side
- **PDF Receipts**: Download professional application receipts
- **Admin Dashboard**: Analytics, application review, scheme management
- **Dark/Light Mode**: Complete theme switching
- **Multi-language**: English & Hindi support
- **Responsive Design**: Mobile-friendly interface

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd smart-government-scheme-portal
```

2. **Setup Backend**
```bash
cd backend
npm install
```

Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-government-portal
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
UPLOAD_PATH=./uploads
```

3. **Setup Frontend**
```bash
cd frontend
npm install
```

Create `frontend/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

1. **Start MongoDB**
```bash
mongod
```

2. **Start Backend Server** (in backend folder)
```bash
npm run dev
```
Backend runs on: http://localhost:5000

3. **Start Frontend** (in frontend folder)
```bash
npm run dev
```
Frontend runs on: http://localhost:3000

### Seed Data

**Create Admin User:**
```bash
cd backend
node utils/seedAdmin.js
```
Admin credentials: `admin@smartgov.in` / `admin123`

**Add Sample Schemes:**
```bash
node utils/seedData.js
```

## 🛠️ Technology Stack

### Frontend
- React 18 with Hooks
- React Router DOM v6
- Axios for API calls
- Tailwind CSS
- Chart.js & react-chartjs-2
- jsPDF for PDF generation
- React Icons
- Vite

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- Multer for file uploads
- Bcrypt for password hashing
- Express Validator
- Helmet.js & CORS
- Rate Limiting

## 📖 Documentation

- [Setup Guide](SETUP_GUIDE.md) - Detailed installation instructions
- [Features List](frontend/FEATURES_IMPLEMENTED.md) - Complete feature documentation
- [User Journey](frontend/USER_JOURNEY.md) - Detailed user flow scenarios
- [Step-by-Step Flow](frontend/STEP_BY_STEP_FLOW.md) - Quick visual guide

## 🔐 Default Credentials

**Admin:**
- Email: admin@smartgov.in
- Password: admin123

**Test User:**
- Register a new account at `/register`

## 📱 Key Pages

### Public Pages
- Home (`/`)
- Login (`/login`)
- Register (`/register`)

### User Pages (Login Required)
- Browse Schemes (`/schemes`)
- Scheme Details (`/schemes/:id`)
- Eligibility Checker (`/eligibility-checker`)
- User Dashboard (`/user/dashboard`)
- Apply for Scheme (`/user/apply/:schemeId`)
- Application Status (`/user/applications`)
- Bookmarked Schemes (`/user/bookmarks`)
- Compare Schemes (`/user/compare`)
- Profile (`/user/profile`)

### Admin Pages
- Admin Dashboard (`/admin/dashboard`)
- Manage Schemes (`/admin/schemes`)
- View Applications (`/admin/applications`)
- Analytics (`/admin/analytics`)

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Schemes
- `GET /api/schemes` - Get all schemes
- `GET /api/schemes/:id` - Get scheme by ID
- `POST /api/schemes` - Create scheme (Admin)
- `PUT /api/schemes/:id` - Update scheme (Admin)
- `DELETE /api/schemes/:id` - Delete scheme (Admin)

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get user applications
- `GET /api/applications/:id` - Get application by ID
- `PATCH /api/applications/:id` - Update application status (Admin)

### Eligibility
- `POST /api/schemes/check-eligibility` - Check eligibility

### Bookmarks
- `POST /api/bookmarks/toggle` - Toggle bookmark
- `GET /api/bookmarks` - Get bookmarked schemes

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based authorization
- Input validation
- File upload restrictions
- CORS protection
- Rate limiting
- Security headers with Helmet.js

## 📊 Database Models

- **User**: User accounts with roles
- **Scheme**: Government schemes
- **Application**: Scheme applications
- **Notification**: User notifications

## 🤝 Contributing

This is an academic project. For improvements or suggestions, please contact the project maintainers.

## 📄 License

MIT License

## 👥 Support

For issues or questions:
- Email: info@smartgov.in
- Phone: 1800-XXX-XXXX

---

**© 2026 Smart Government Scheme Portal. All rights reserved.**

Built with ❤️ for Smart Government Services
