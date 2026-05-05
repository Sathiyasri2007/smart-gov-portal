# Smart Government Scheme Portal - Backend API

Secure and scalable Node.js/Express/MongoDB backend for the Smart Government Scheme Portal.

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Secure password hashing with bcrypt

- **User Management**
  - User registration and login
  - Profile management
  - User dashboard

- **Scheme Management**
  - CRUD operations for schemes
  - Search and filter schemes
  - Category-based organization
  - Eligibility checking
  - Recommended schemes based on user profile

- **Application Management**
  - Submit applications with document upload
  - Track application status
  - Admin review and approval workflow
  - Application history

- **Admin Dashboard**
  - Analytics and statistics
  - User management
  - Application review
  - Scheme management

- **Security Features**
  - Helmet.js for security headers
  - Rate limiting
  - Input validation with express-validator
  - File upload validation
  - CORS configuration

## Tech Stack

- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- Multer for file uploads
- Express Validator
- Helmet.js & CORS
- Rate Limiting

## Installation

```bash
cd backend
npm install
```

## Configuration

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-government-portal
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
UPLOAD_PATH=./uploads
```

## Database Setup

Make sure MongoDB is running:

```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Schemes
- `GET /api/schemes` - Get all schemes (with search/filter)
- `GET /api/schemes/:id` - Get single scheme
- `GET /api/schemes/recommended` - Get recommended schemes
- `POST /api/schemes` - Create scheme (Admin)
- `PUT /api/schemes/:id` - Update scheme (Admin)
- `DELETE /api/schemes/:id` - Delete scheme (Admin)

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications/user` - Get user applications
- `GET /api/applications` - Get all applications (Admin)
- `GET /api/applications/:id` - Get single application
- `PATCH /api/applications/:id` - Update application status (Admin)

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/analytics` - Analytics data
- `GET /api/admin/users` - Get all users

## Project Structure

```
backend/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── utils/           # Utility functions
├── uploads/         # Uploaded files
├── server.js        # Entry point
└── package.json
```

## Security Best Practices

- Passwords are hashed using bcrypt
- JWT tokens for stateless authentication
- Input validation on all endpoints
- File upload restrictions (type & size)
- Rate limiting to prevent abuse
- Helmet.js for security headers
- CORS configuration
- Environment variables for sensitive data

## Default Admin Account

Create manually in MongoDB or via seed script:
```javascript
{
  name: "Admin",
  email: "admin@smartgov.in",
  password: "admin123", // Will be hashed
  role: "admin"
}
```

## License

MIT
