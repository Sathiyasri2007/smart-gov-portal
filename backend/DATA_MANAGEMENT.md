# MongoDB Data Management Guide

## ✅ Current Database Status

**Database:** smart-government-portal  
**Collections:**
- users (1 admin user)
- schemes (6 sample schemes)
- applications (empty - will be filled when users apply)
- notifications (empty - will be filled on events)

## 3 Ways to Add Data

### Method 1: Through Web Application (Recommended) ✨

**Add Schemes:**
1. Login as admin: http://localhost:3000/login
   - Email: `admin@smartgov.in`
   - Password: `admin123`
2. Go to "Manage Schemes"
3. Click "Add Scheme" button
4. Fill the form and save

**Add Users:**
1. Go to: http://localhost:3000/register
2. Fill registration form
3. User is automatically created in database

**Add Applications:**
1. Login as user
2. Browse schemes
3. Click "Apply Now" on any scheme
4. Fill application form with documents
5. Submit

### Method 2: Using Seed Scripts ⚡

**Seed Sample Schemes:**
```bash
cd backend
node utils/seedData.js
```

**Create Admin User:**
```bash
cd backend
node utils/seedAdmin.js
```

**What the seed script adds:**
- ✅ Pradhan Mantri Awas Yojana (Housing)
- ✅ Ayushman Bharat (Healthcare)
- ✅ PM Kisan Samman Nidhi (Agriculture)
- ✅ National Scholarship Portal (Education)
- ✅ Pradhan Mantri Mudra Yojana (Employment)
- ✅ Beti Bachao Beti Padhao (Education)

### Method 3: Using MongoDB Compass (GUI Tool) 🖥️

**Install MongoDB Compass:**
1. Download from: https://www.mongodb.com/try/download/compass
2. Install and open
3. Connect to: `mongodb://localhost:27017`

**Add Data Manually:**
1. Select database: `smart-government-portal`
2. Select collection (users, schemes, etc.)
3. Click "Add Data" → "Insert Document"
4. Paste JSON and insert

**Example Scheme JSON:**
```json
{
  "name": "My New Scheme",
  "description": "Description here",
  "category": "Education",
  "eligibility": ["Requirement 1", "Requirement 2"],
  "benefits": "Benefits description",
  "requiredDocuments": ["Aadhaar", "Income Certificate"],
  "deadline": "2024-12-31T00:00:00.000Z",
  "status": "active",
  "createdBy": "YOUR_ADMIN_USER_ID_HERE"
}
```

## View Current Data

### Using Command Line:
```bash
# View all schemes
curl http://localhost:5000/api/schemes

# View specific scheme
curl http://localhost:5000/api/schemes/SCHEME_ID

# Health check
curl http://localhost:5000/api/health
```

### Using Browser:
- All schemes: http://localhost:5000/api/schemes
- Health check: http://localhost:5000/api/health

### Using MongoDB Compass:
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Browse collections

## Clear/Reset Data

**Clear all schemes:**
```javascript
// In backend/utils/clearSchemes.js
const mongoose = require('mongoose');
const Scheme = require('../models/Scheme');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Scheme.deleteMany({});
  console.log('All schemes deleted');
  process.exit();
});
```

**Reset entire database:**
```bash
# In MongoDB shell or Compass
use smart-government-portal
db.dropDatabase()
```

Then re-run seed scripts:
```bash
node utils/seedAdmin.js
node utils/seedData.js
```

## Database Schema Reference

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "user" | "admin",
  phone: String,
  address: String,
  dateOfBirth: Date,
  income: Number,
  familyMembers: Number,
  isActive: Boolean
}
```

### Scheme Schema
```javascript
{
  name: String (unique),
  description: String,
  category: "Education" | "Healthcare" | "Agriculture" | "Employment" | "Housing" | "Other",
  eligibility: [String],
  benefits: String,
  requiredDocuments: [String],
  deadline: Date,
  status: "active" | "inactive" | "expired",
  minIncome: Number,
  maxIncome: Number,
  ageLimit: { min: Number, max: Number },
  createdBy: ObjectId (User)
}
```

### Application Schema
```javascript
{
  user: ObjectId (User),
  scheme: ObjectId (Scheme),
  status: "pending" | "approved" | "rejected" | "under_review",
  documents: [{ filename: String, path: String }],
  income: Number,
  familyMembers: Number,
  remarks: String,
  reviewedBy: ObjectId (User),
  reviewedAt: Date
}
```

## Quick Commands

```bash
# Add sample data
cd backend && node utils/seedData.js

# Create admin
cd backend && node utils/seedAdmin.js

# Check API
curl http://localhost:5000/api/schemes

# View in browser
# Open: http://localhost:3000/schemes
```

## Current Data Summary

✅ **Users:** 1 admin user  
✅ **Schemes:** 6 government schemes  
✅ **Applications:** 0 (add by applying through UI)  
✅ **Notifications:** 0 (auto-created on events)

Everything is ready to use! 🎉
