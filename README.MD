# 🧠 Advertisement Campaign Platform

This is a full-stack project for managing advertisement campaigns with user authentication (traditional & OAuth2), Redis caching, and email-based OTP support.

---

## 🛠️ Tech Stack

- **Frontend**: Vite + React
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Cache**: Redis
- **Auth**: JWT & Google OAuth2.0
- **Email**: SMTP for OTP

---

## 📦 Project Setup

### 🔧 Backend

```bash
cd Ad_Backend
npm install
node server.js

### 🔧 Frontend
cd RTT-Frontend
npm install
npm run dev

Create a .env file in the root of the backend directory (Ad_Backend/.env) and add the following:
PORT=5000
MONGO_URI=mongodb://localhost:27017/Advdb
JWT_SECRET=hmyhyhyyhnhvyhtn

# JWT for Traditional Auth
JWT_ACCESS_SECRET=kjhghjkhkhjhhhhdsn
JWT_REFRESH_SECRET=gvgcyvbytvhnivtuuvujjuiuj
JWT_REFRESH_SECRET_EXP_DAY=30

# Redis Server
REDIS_URL=redis://localhost:6379

# Email SMTP - for generating OTP
EMAIL_USER=aroravrinda03@gmail.com
EMAIL_PASS=zxwrfgtqvqmjzofm

# OAuth2.0 Google Login
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK=http://localhost:5000/v1/user/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173/

