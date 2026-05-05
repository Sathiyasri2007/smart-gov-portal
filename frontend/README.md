# Smart Government Scheme Portal - Frontend

React.js frontend application for the Smart Government Scheme Portal.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the frontend folder:
```env
VITE_API_URL=http://localhost:5000/api
```

### Development

```bash
npm run dev
```

Runs on: http://localhost:3000

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── SchemeCard.jsx
│   ├── SearchFilter.jsx
│   ├── ProtectedRoute.jsx
│   ├── Layout.jsx
│   ├── Loader.jsx
│   └── FloatingActionButton.jsx
│
├── context/         # Context providers
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   ├── LanguageContext.jsx
│   └── NotificationContext.jsx
│
├── pages/           # Page components
│   ├── public/      # Public pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ViewSchemes.jsx
│   │   ├── SchemeDetails.jsx
│   │   └── EligibilityChecker.jsx
│   │
│   ├── user/        # User dashboard pages
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── ApplyScheme.jsx
│   │   ├── ApplicationStatus.jsx
│   │   ├── RecommendedSchemes.jsx
│   │   ├── BookmarkedSchemes.jsx
│   │   └── CompareSchemes.jsx
│   │
│   └── admin/       # Admin dashboard pages
│       ├── Dashboard.jsx
│       ├── ManageSchemes.jsx
│       ├── ViewApplications.jsx
│       └── Analytics.jsx
│
├── services/        # API service modules
│   ├── api.js
│   ├── schemeService.js
│   ├── applicationService.js
│   └── bookmarkService.js
│
├── utils/           # Utility functions
│   └── pdfGenerator.js
│
├── App.jsx          # Main app component with routes
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## 🎨 Tech Stack

- **React 18** - UI library with Hooks
- **React Router DOM v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js & react-chartjs-2** - Data visualization
- **jsPDF & html2canvas** - PDF generation
- **React Icons** - Icon library
- **JWT Decode** - JWT token parsing
- **Vite** - Build tool and dev server

## 🔑 Key Features

### Authentication
- JWT-based authentication
- Protected routes
- Role-based access control
- Auto-redirect on unauthorized access

### User Features
- Browse and search schemes
- Eligibility checker
- Apply for schemes with document upload
- Track application status
- Download PDF receipts
- Bookmark favorite schemes
- Compare schemes side-by-side
- Personalized dashboard

### Admin Features
- Manage schemes (CRUD operations)
- Review and approve applications
- Analytics dashboard with charts
- User management

### UI/UX
- Dark/Light mode toggle
- Multi-language support (EN/HI)
- Responsive mobile-friendly design
- Professional purple & emerald theme
- Smooth animations
- Toast notifications
- Loading states
- Floating action button for quick navigation

## 🔌 API Integration

The frontend communicates with the backend API through Axios interceptors:

- **Base URL**: Configured via `VITE_API_URL` environment variable
- **Authentication**: JWT token automatically attached to requests
- **Error Handling**: Automatic redirect to login on 401 errors

## 🎯 Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security

- JWT tokens stored in localStorage
- Protected routes with authentication checks
- Role-based component rendering
- Input validation on forms
- File upload restrictions

## 📄 License

MIT

---

**Built with React + Vite + Tailwind CSS**
