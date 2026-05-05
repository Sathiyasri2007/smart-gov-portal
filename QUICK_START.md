# ⚡ Quick Start Guide

Get the Smart Government Scheme Portal running in 5 minutes!

## 🎯 Prerequisites

- ✅ Node.js installed
- ✅ MongoDB running (or MongoDB Atlas account)

## 🚀 Steps

### 1️⃣ Start MongoDB

```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 2️⃣ Start Backend

```bash
cd backend
npm install
node utils/seedAdmin.js
npm run dev
```

✅ Backend running on: **http://localhost:5000**

### 3️⃣ Start Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running on: **http://localhost:3000**

### 4️⃣ Login

Open browser: **http://localhost:3000**

**Admin Login:**
- Email: `admin@smartgov.in`
- Password: `admin123`

**Or Register** a new user account!

## 📁 Project Structure

```
project-root/
├── frontend/    # React app (Port 3000)
└── backend/     # Node.js API (Port 5000)
```

## 🎉 That's It!

You're ready to explore all features:
- 📄 Browse Schemes
- ✅ Check Eligibility
- 📝 Apply for Schemes
- 🔖 Bookmark Favorites
- 🔍 Compare Schemes
- 📊 Admin Dashboard

## 📚 More Info

- [Complete Setup Guide](SETUP_GUIDE.md)
- [Features List](frontend/FEATURES_IMPLEMENTED.md)
- [Project Status](PROJECT_STATUS.md)

---

**Need help?** Check the troubleshooting section in [SETUP_GUIDE.md](SETUP_GUIDE.md)
