// ============================================================
//         SMART GOVERNMENT SCHEME PORTAL - BACKEND INDEX
//         All integrations exported from a single file
// ============================================================

// ─── 1. DATABASE CONNECTION ──────────────────────────────────
const connectDB = require('./config/db');
/*
  connectDB()
  → mongoose.connect(process.env.MONGODB_URI)
  → mongodb://localhost:27017/smart-government-portal
*/

// ─── 2. MODELS ───────────────────────────────────────────────
const User         = require('./models/User');
const Scheme       = require('./models/Scheme');
const Application  = require('./models/Application');
const Notification = require('./models/Notification');

/*
  USER MODEL FIELDS:
    name, email, password (bcrypt hashed)
    role: 'user' | 'admin'
    phone, address, state
    occupation: student | employed | self-employed | unemployed | retired | other
    dateOfBirth, income, familyMembers
    isActive: Boolean
    bookmarkedSchemes: [ObjectId → Scheme]

  SCHEME MODEL FIELDS:
    name (unique), description
    category: Education | Healthcare | Agriculture | Employment |
              Housing | Social Welfare | Infrastructure | Other
    eligibility: [String], benefits, requiredDocuments: [String]
    deadline: Date
    status: active | inactive | expired
    minIncome, maxIncome
    ageLimit: { min, max }
    createdBy: ObjectId → User

  APPLICATION MODEL FIELDS:
    user: ObjectId → User
    scheme: ObjectId → Scheme
    status: pending | approved | rejected | under_review
    documents: [{ filename, path, uploadedAt }]
    income, familyMembers, remarks
    reviewedBy: ObjectId → User, reviewedAt: Date
    statusHistory: [{ status, changedBy, remarks, timestamp }]

  NOTIFICATION MODEL FIELDS:
    user: ObjectId → User
    title, message
    type: info | success | warning | error
    isRead: Boolean (default: false)
    relatedApplication: ObjectId → Application
*/

// ─── 3. MIDDLEWARE ───────────────────────────────────────────
const { protect, authorize } = require('./middleware/auth');
const upload                 = require('./middleware/upload');
const errorHandler           = require('./middleware/errorHandler');

/*
  protect
  → reads Authorization: Bearer <token> from header
  → verifies JWT with JWT_SECRET
  → attaches user to req.user
  → blocks if user inactive or token invalid → 401

  authorize(...roles)
  → checks req.user.role is in allowed roles
  → e.g. authorize('admin') → blocks regular users → 403

  upload
  → multer diskStorage → saves to ./uploads/
  → allowed: jpeg, jpg, png, pdf, doc, docx
  → max size: 5MB per file
  → usage: upload.array('documents', 5)

  errorHandler
  → CastError       → 404 Resource not found
  → Code 11000      → 400 Duplicate field
  → ValidationError → 400 Mongoose validation failed
  → Default         → 500 Server Error
  → always returns: { success: false, message: "..." }
*/

// ─── 4. UTILS ────────────────────────────────────────────────
const generateToken = require('./utils/generateToken');

/*
  generateToken(id, role)
  → jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '7d' })
  → used in: register + login controllers
*/

// ─── 5. CONTROLLERS ──────────────────────────────────────────

// AUTH CONTROLLER
const {
  register,       // POST /api/auth/register
  login,          // POST /api/auth/login
  getMe,          // GET  /api/auth/me
  updateProfile   // PUT  /api/auth/profile
} = require('./controllers/authController');

/*
  register:
    → validates name, email, password
    → checks duplicate email
    → User.create() → password auto-hashed via pre-save hook
    → returns JWT token + user { id, name, email, role }

  login:
    → finds user by email (select +password)
    → bcrypt.compare(enteredPassword, hashedPassword)
    → checks isActive
    → returns JWT token + user { id, name, email, role }

  getMe:
    → User.findById(req.user.id)
    → returns full user object

  updateProfile:
    → updates: name, phone, address, dateOfBirth, income, familyMembers
*/

// SCHEME CONTROLLER
const {
  getAllSchemes,         // GET    /api/schemes
  getScheme,            // GET    /api/schemes/:id
  createScheme,         // POST   /api/schemes       [admin]
  updateScheme,         // PUT    /api/schemes/:id   [admin]
  deleteScheme,         // DELETE /api/schemes/:id   [admin]
  getRecommendedSchemes // GET    /api/schemes/recommended
} = require('./controllers/schemeController');

/*
  getAllSchemes → query filters:
    ?search=      → regex on name, description, benefits, eligibility
    ?category=    → exact match (Education, Healthcare, etc.)
    ?minIncome=   → income range filter
    ?maxIncome=
    ?ageGroup=    → youth(18-35) | adult(36-60) | senior(60+)
    ?state=       → state filter
    ?occupation=  → occupation filter
    ?sortBy=      → name | deadline | newest

  createScheme:
    → admin only
    → validates: name, description, category, benefits, deadline
    → sets createdBy = req.user.id

  getRecommendedSchemes:
    → filters active schemes by user's income range
    → returns top 10 matches
*/

// APPLICATION CONTROLLER
const {
  createApplication,      // POST  /api/applications
  getUserApplications,    // GET   /api/applications/user
  getAllApplications,      // GET   /api/applications        [admin]
  getApplication,         // GET   /api/applications/:id
  updateApplicationStatus // PATCH /api/applications/:id    [admin]
} = require('./controllers/applicationController');

/*
  createApplication:
    → upload.array('documents', 5) → Multer handles files
    → checks scheme exists
    → checks no duplicate (user + scheme compound index)
    → saves documents: [{ filename, path }]
    → creates initial statusHistory: [{ status: 'pending' }]
    → creates Notification: "Application Submitted" → type: success

  updateApplicationStatus (admin):
    → updates: status, remarks, reviewedBy, reviewedAt
    → pushes new entry to statusHistory[]
    → creates Notification for user:
        approved → type: success
        rejected → type: error
        other    → type: info
*/

// ELIGIBILITY CONTROLLER
const {
  checkEligibility // POST /api/schemes/check-eligibility
} = require('./controllers/eligibilityController');

/*
  checkEligibility:
    Input:  { age, income, category, occupation, state }
    Step 1: query active schemes matching income range
    Step 2: filter by age range (ageLimit.min / ageLimit.max)
    Step 3: filter by occupation/category keyword in scheme text
    Step 4: sort by relevance score
              → schemes with specific income range  → +2 score
              → schemes with specific age limit     → +2 score
    Output: sorted eligible schemes list + criteria used
*/

// BOOKMARK CONTROLLER
const {
  toggleBookmark,       // POST /api/bookmarks/toggle
  getBookmarkedSchemes  // GET  /api/bookmarks
} = require('./controllers/bookmarkController');

/*
  toggleBookmark:
    → finds user.bookmarkedSchemes[]
    → if schemeId exists → splice (remove) → bookmarked: false
    → if schemeId absent → push  (add)    → bookmarked: true

  getBookmarkedSchemes:
    → populate('bookmarkedSchemes') → returns full scheme objects
*/

// NOTIFICATION CONTROLLER
const {
  getNotifications, // GET   /api/notifications
  getUnreadCount,   // GET   /api/notifications/unread-count
  markAsRead,       // PATCH /api/notifications/:id/read
  markAllAsRead     // PATCH /api/notifications/mark-all-read
} = require('./controllers/notificationController');

/*
  getNotifications  → last 20, sorted newest first
                    → populates relatedApplication (scheme + status)
  getUnreadCount    → countDocuments({ user, isRead: false })
  markAsRead        → findOneAndUpdate isRead: true (user-scoped)
  markAllAsRead     → updateMany isRead: true for all user notifications
*/

// ADMIN CONTROLLER
const {
  getDashboardStats, // GET /api/admin/stats
  getAnalytics,      // GET /api/admin/analytics
  getAllUsers         // GET /api/admin/users
} = require('./controllers/adminController');

/*
  getDashboardStats:
    → totalUsers, totalSchemes, totalApplications
    → pendingApplications, approvedApplications, rejectedApplications

  getAnalytics (MongoDB Aggregation Pipelines):
    → applicationsByStatus   → group by status field
    → applicationsByScheme   → top 10 most applied schemes (lookup + sort)
    → applicationsByCategory → group by scheme.category (lookup + unwind)
    → monthlyApplications    → last 12 months trend (group by year+month)

  getAllUsers:
    → User.find({ role: 'user' }).select('-password')
*/

// ─── 6. ROUTES ───────────────────────────────────────────────

/*
  AUTH ROUTES          /api/auth
  ┌─────────────────────────────────────────────────────────┐
  │ POST   /register   → [validate] → register              │
  │ POST   /login      → [validate] → login                 │
  │ GET    /me         → [protect]  → getMe                 │
  │ PUT    /profile    → [protect]  → updateProfile         │
  └─────────────────────────────────────────────────────────┘

  SCHEME ROUTES        /api/schemes
  ┌─────────────────────────────────────────────────────────┐
  │ GET    /           →                  getAllSchemes      │
  │ GET    /recommended→ [protect]      → getRecommended    │
  │ GET    /:id        →                  getScheme         │
  │ POST   /           → [protect,admin]→ createScheme      │
  │ PUT    /:id        → [protect,admin]→ updateScheme      │
  │ DELETE /:id        → [protect,admin]→ deleteScheme      │
  └─────────────────────────────────────────────────────────┘

  ELIGIBILITY ROUTES   /api/schemes
  ┌─────────────────────────────────────────────────────────┐
  │ POST   /check-eligibility →          checkEligibility   │
  └─────────────────────────────────────────────────────────┘

  APPLICATION ROUTES   /api/applications
  ┌─────────────────────────────────────────────────────────┐
  │ POST   /           → [protect,upload]→ createApplication│
  │ GET    /user       → [protect]       → getUserApps      │
  │ GET    /           → [protect,admin] → getAllApps       │
  │ GET    /:id        → [protect]       → getApplication   │
  │ PATCH  /:id        → [protect,admin] → updateStatus     │
  └─────────────────────────────────────────────────────────┘

  BOOKMARK ROUTES      /api/bookmarks
  ┌─────────────────────────────────────────────────────────┐
  │ POST   /toggle     → [protect] → toggleBookmark         │
  │ GET    /           → [protect] → getBookmarkedSchemes   │
  └─────────────────────────────────────────────────────────┘

  NOTIFICATION ROUTES  /api/notifications
  ┌─────────────────────────────────────────────────────────┐
  │ GET    /           → [protect] → getNotifications       │
  │ GET    /unread-count→[protect] → getUnreadCount         │
  │ PATCH  /:id/read   → [protect] → markAsRead             │
  │ PATCH  /mark-all-read→[protect]→ markAllAsRead          │
  └─────────────────────────────────────────────────────────┘

  ADMIN ROUTES         /api/admin  [protect + authorize('admin')]
  ┌─────────────────────────────────────────────────────────┐
  │ GET    /stats      → getDashboardStats                  │
  │ GET    /analytics  → getAnalytics                       │
  │ GET    /users      → getAllUsers                        │
  └─────────────────────────────────────────────────────────┘
*/

// ─── 7. FRONTEND ↔ BACKEND CONNECTION ───────────────────────

/*
  frontend/src/services/api.js  (Axios Instance)
  ┌─────────────────────────────────────────────────────────┐
  │ baseURL: VITE_API_URL = http://localhost:5000/api        │
  │ Request  interceptor → auto-attach Bearer token         │
  │ Response interceptor → 401 → clear token → /login      │
  └─────────────────────────────────────────────────────────┘

  schemeService.js
    getAllSchemes(params)    → GET    /schemes?search=&category=...
    getSchemeById(id)        → GET    /schemes/:id
    createScheme(data)       → POST   /schemes
    updateScheme(id, data)   → PUT    /schemes/:id
    deleteScheme(id)         → DELETE /schemes/:id
    getRecommended()         → GET    /schemes/recommended

  applicationService.js
    applyForScheme(formData) → POST   /applications  [multipart/form-data]
    getUserApplications()    → GET    /applications/user
    getAllApplications(p)    → GET    /applications
    updateStatus(id, status) → PATCH  /applications/:id
    getApplicationById(id)   → GET    /applications/:id

  bookmarkService.js
    toggleBookmark(schemeId) → POST   /bookmarks/toggle
    getBookmarkedSchemes()   → GET    /bookmarks

  notificationService.js
    getNotifications()       → GET    /notifications
    getUnreadCount()         → GET    /notifications/unread-count
    markAsRead(id)           → PATCH  /notifications/:id/read
    markAllAsRead()          → PATCH  /notifications/mark-all-read
*/

// ─── 8. ENVIRONMENT VARIABLES ────────────────────────────────

/*
  backend/.env
  ┌─────────────────────────────────────────────────────────┐
  │ PORT=5000                                               │
  │ MONGODB_URI=mongodb://localhost:27017/smart-gov-portal  │
  │ JWT_SECRET=smart_gov_portal_secret_key_2024             │
  │ JWT_EXPIRE=7d                                           │
  │ NODE_ENV=development                                    │
  │ UPLOAD_PATH=./uploads                                   │
  └─────────────────────────────────────────────────────────┘

  frontend/.env
  ┌─────────────────────────────────────────────────────────┐
  │ VITE_API_URL=http://localhost:5000/api                  │
  └─────────────────────────────────────────────────────────┘
*/

// ─── 9. EXPORTS ──────────────────────────────────────────────
module.exports = {
  // DB
  connectDB,

  // Models
  User, Scheme, Application, Notification,

  // Middleware
  protect, authorize, upload, errorHandler,

  // Utils
  generateToken,

  // Controllers - Auth
  register, login, getMe, updateProfile,

  // Controllers - Schemes
  getAllSchemes, getScheme, createScheme,
  updateScheme, deleteScheme, getRecommendedSchemes,

  // Controllers - Applications
  createApplication, getUserApplications,
  getAllApplications, getApplication, updateApplicationStatus,

  // Controllers - Eligibility
  checkEligibility,

  // Controllers - Bookmarks
  toggleBookmark, getBookmarkedSchemes,

  // Controllers - Notifications
  getNotifications, getUnreadCount, markAsRead, markAllAsRead,

  // Controllers - Admin
  getDashboardStats, getAnalytics, getAllUsers
};
