# ⚡ Quick Step-by-Step Flow

## 🚀 When User First Opens Website

### Step 1: User Types URL
```
User types: http://localhost:3000
Browser sends request
```

### Step 2: Home Page Loads
**What User Sees:**
```
┌─────────────────────────────────────────┐
│  🎨 Purple Navbar                       │
│  [SG Logo] Smart Gov Portal             │
│  [Home] [Get Started] [Login]           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  💜 HERO SECTION (Purple Gradient)      │
│                                         │
│  Welcome to Smart Government            │
│  Scheme Portal                          │
│                                         │
│  Access government schemes, apply       │
│  online, and track applications         │
│                                         │
│  [Get Started] [Login]                  │
└─────────────────────────────────────────┘

┌──────────┬──────────┬──────────┐
│ ✅ Easy  │ ✅ Track │ ✅ Check │
│ Register │ Status   │ Eligible │
└──────────┴──────────┴──────────┘

┌─────────────────────────────────────────┐
│  🎯 Try Our Eligibility Checker!        │
│  [Register to Check Eligibility]        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  📧 Footer - Contact Info               │
└─────────────────────────────────────────┘
```

**User has 2 options:**
- Click "Get Started" → Goes to Register
- Click "Login" → Goes to Login

---

## 📝 Option 1: New User Registers

### Step 3: Click "Get Started"
```
User clicks → Redirects to /register
```

### Step 4: Registration Page
**Form Fields:**
```
┌─────────────────────────────────┐
│  Register                       │
├─────────────────────────────────┤
│  Name:     [____________]       │
│  Email:    [____________]       │
│  Password: [____________]       │
│  Phone:    [____________]       │
│  Address:  [____________]       │
│                                 │
│  [Register Button]              │
│                                 │
│  Already have account? Login    │
└─────────────────────────────────┘
```

### Step 5: User Fills & Submits
```
User enters:
- Name: Rahul Kumar
- Email: rahul@example.com
- Password: rahul123

Clicks [Register]
```

### Step 6: What Happens Behind
```
Frontend → Backend API
POST /api/auth/register
{
  name: "Rahul Kumar",
  email: "rahul@example.com",
  password: "rahul123"
}

Backend:
1. Validates data ✓
2. Hashes password ✓
3. Saves to MongoDB ✓
4. Creates JWT token ✓
5. Returns token ✓

Frontend:
1. Saves token to localStorage ✓
2. Updates AuthContext ✓
3. Redirects to /user/dashboard ✓
```

---

## 🏠 User Dashboard (After Login/Register)

### Step 7: Dashboard Loads
**What User Sees:**
```
┌─────────────────────────────────────────┐
│  Navbar: [Home][Schemes][Eligibility]   │
│  [Dashboard][Profile][Logout]           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  User Dashboard                         │
└─────────────────────────────────────────┘

┌──────────┬──────────┬──────────┐
│ 📄 Total │ ⏳ Pend  │ ✅ Appro │
│    0     │    0     │    0     │
└──────────┴──────────┴──────────┘

┌──────────┬──────────┐
│ Browse   │ Recom-   │
│ Schemes  │ mended   │
├──────────┼──────────┤
│ Book-    │ Compare  │
│ marked   │ Schemes  │
├──────────┴──────────┤
│ Eligibility Checker │
└─────────────────────┘
```

**User Options:**
1. Browse Schemes
2. Check Eligibility
3. View Bookmarks
4. Compare Schemes

---

## 🔍 User Checks Eligibility

### Step 8: Click "Eligibility Checker"
```
Redirects to /eligibility-checker
```

### Step 9: Fill Eligibility Form
```
┌─────────────────────────────────┐
│  Eligibility Checker            │
├─────────────────────────────────┤
│  Age:        [25]               │
│  Income:     [250000]           │
│  Category:   [General ▼]        │
│  Occupation: [Student ▼]        │
│  State:      [Maharashtra ▼]    │
│                                 │
│  [Check Eligibility]            │
└─────────────────────────────────┘
```

### Step 10: See Results
```
Backend checks MongoDB:
- Filters schemes by income range
- Filters by age limit
- Matches category/occupation

Returns: 3 eligible schemes

┌─────────────────────────────────┐
│  ✅ You're eligible for 3       │
│     scheme(s)!                  │
├─────────────────────────────────┤
│  1. National Scholarship        │
│     [View Details] [Apply Now]  │
├─────────────────────────────────┤
│  2. Ayushman Bharat            │
│     [View Details] [Apply Now]  │
├─────────────────────────────────┤
│  3. PM Kisan Samman Nidhi      │
│     [View Details] [Apply Now]  │
└─────────────────────────────────┘
```

---

## 📋 User Browses Schemes

### Step 11: Click "Browse Schemes"
```
Redirects to /schemes
```

### Step 12: View All Schemes
```
┌─────────────────────────────────┐
│  Available Schemes              │
├─────────────────────────────────┤
│  Search: [_______] 🔍           │
│  Category: [All ▼]              │
└─────────────────────────────────┘

┌──────────┬──────────┬──────────┐
│ 📄 Scheme│ 📄 Scheme│ 📄 Scheme│
│ Name 1   │ Name 2   │ Name 3   │
│ Category │ Category │ Category │
│ [Active] │ [Active] │ [Active] │
│ 🔖 ❤️    │ 🔖 ❤️    │ 🔖 ❤️    │
│ [Details]│ [Details]│ [Details]│
└──────────┴──────────┴──────────┘
```

**User can:**
- Search schemes
- Filter by category
- Bookmark (click ❤️)
- View details

---

## ⭐ User Bookmarks Scheme

### Step 13: Click Bookmark Icon
```
User clicks ❤️ on "National Scholarship"

Frontend → POST /api/bookmarks/toggle
Backend → Adds to user.bookmarkedSchemes[]
Backend → Returns success

Icon changes: ❤️ → 💜 (filled)
Toast shows: "Scheme bookmarked"
```

---

## 🔍 User Compares Schemes

### Step 14: Go to Compare
```
Click "Compare Schemes" from dashboard
Redirects to /user/compare
```

### Step 15: Select Schemes
```
┌─────────────────────────────────┐
│  Select Schemes (Max 3)         │
├─────────────────────────────────┤
│  [Scheme 1] [Scheme 2] [Scheme 3]│
│  [Scheme 4] [Scheme 5] [Scheme 6]│
└─────────────────────────────────┘

User clicks 3 schemes

┌──────────┬──────────┬──────────┐
│ Feature  │ Scheme 1 │ Scheme 2 │
├──────────┼──────────┼──────────┤
│ Category │ Edu      │ Health   │
│ Status   │ ✓        │ ✓        │
│ Deadline │ Dec 2024 │ Dec 2024 │
│ Benefits │ ₹20k     │ ₹5L      │
│ Action   │ [Apply]  │ [Apply]  │
└──────────┴──────────┴──────────┘
```

---

## 📝 User Applies for Scheme

### Step 16: Click "Apply Now"
```
Redirects to /user/apply/[scheme-id]
```

### Step 17: Fill Application
```
┌─────────────────────────────────┐
│  Apply for National Scholarship │
├─────────────────────────────────┤
│  Income:         [250000]       │
│  Family Members: [4]            │
│  Documents:      [Choose Files] │
│                                 │
│  [Submit Application]           │
└─────────────────────────────────┘
```

### Step 18: Upload & Submit
```
User uploads:
- Aadhaar.pdf
- Income_Certificate.pdf
- Marksheet.pdf

Clicks [Submit]

Frontend → POST /api/applications (with files)
Backend → Multer saves files
Backend → Creates application in DB
Backend → Creates notification
Backend → Returns success

Toast: "Application submitted successfully"
Redirects to /user/applications
```

---

## 📊 User Tracks Application

### Step 19: View Applications
```
┌─────────────────────────────────┐
│  My Applications                │
├─────────────────────────────────┤
│  National Scholarship Portal    │
│  Applied: Today                 │
│  ID: abc123                     │
│  Status: [Pending]              │
│  [Download Receipt]             │
└─────────────────────────────────┘
```

### Step 20: Download Receipt
```
User clicks [Download Receipt]

Frontend → generateApplicationReceipt()
jsPDF → Creates PDF with:
- Purple header
- Application details
- User info
- Timestamp

Browser downloads: Application_Receipt_abc123.pdf
```

---

## 👨‍💼 Admin Reviews Application

### Step 21: Admin Logs In
```
Email: admin@smartgov.in
Password: admin123

Redirects to /admin/dashboard
```

### Step 22: Admin Dashboard
```
┌─────────────────────────────────┐
│  Admin Dashboard                │
├─────────────────────────────────┤
│  📄 Schemes: 6                  │
│  📋 Applications: 1             │
│  ⏳ Pending: 1                  │
│  ✅ Approved: 0                 │
└─────────────────────────────────┘
```

### Step 23: View Applications
```
Click "View Applications"

┌─────────────────────────────────┐
│  National Scholarship           │
│  Applicant: Rahul Kumar         │
│  Applied: Today                 │
│  [Approve] [Reject]             │
└─────────────────────────────────┘
```

### Step 24: Approve Application
```
Admin clicks [Approve]

Frontend → PATCH /api/applications/[id]
Backend → Updates status to "approved"
Backend → Creates notification for user
Backend → Returns success

Status changes: Pending → Approved ✅
```

---

## 🔔 User Gets Notification

### Step 25: User Checks Status
```
User refreshes /user/applications

┌─────────────────────────────────┐
│  National Scholarship Portal    │
│  Status: [Approved] ✅          │
│  [Download Receipt]             │
└─────────────────────────────────┘

Toast notification appears:
"Application Status Updated"
```

---

## ⚡ Complete Flow Summary

```
1. User visits website
   ↓
2. Registers/Logs in
   ↓
3. Checks eligibility
   ↓
4. Browses schemes
   ↓
5. Bookmarks favorites
   ↓
6. Compares schemes
   ↓
7. Applies for scheme
   ↓
8. Uploads documents
   ↓
9. Tracks status
   ↓
10. Downloads receipt
    ↓
11. Admin reviews
    ↓
12. Admin approves
    ↓
13. User gets notification
    ↓
14. ✅ DONE!
```

---

## 🎯 Key Points

**For Users:**
- Register → Check Eligibility → Apply → Track → Download Receipt

**For Admins:**
- Login → View Applications → Approve/Reject → Manage Schemes

**Security:**
- Must login to see schemes
- JWT tokens for authentication
- Role-based access (User/Admin)

**Features:**
- Bookmark schemes
- Compare schemes
- Download PDF receipts
- Real-time notifications
- Dark/Light mode
- Multi-language

---

**That's it! Simple, fast, and complete! 🚀**
