# SafeCircle Backend API & Integration MVP 🛡️⚡

A clean, scalable, production-ready REST API built for the **SafeCircle Women's Safety Application**. Designed using **Node.js, Express.js, TypeScript, and MongoDB (Mongoose)** with robust security, type-safety, and direct integration support for React frontends.

---

## 🌟 Key Features

- **🔐 Robust Security**: Protected with `helmet` security headers, custom rate limiters (`express-rate-limit`), and strict CORS policies.
- **🛡️ JWT-Ready Authentication**: Full JWT token generation and verification architecture with MVP fallback session handling so frontends can operate immediately without blocking workflows.
- **📍 Live Geotracking & Safe Routes**: Real-time GPS location logging, crowd-level classification, and route history persistence.
- **🚨 Multi-Channel SOS Broadcast**: Instant emergency trigger broadcasting across push notifications, SMS alerts, and email summaries.
- **🎙️ Voice AI Assistant Placeholder**: Live audio transcript analysis endpoint checking distress keywords and triggering automated actions.
- **📊 Real-Time Safety Analytics**: Rich aggregated metrics for safety scores, emergency counts, active contacts, and historical trends.
- **📚 OpenAPI Swagger Documentation**: Interactive API testing suite available at `/api/docs`.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js v20+
- **Framework**: Express.js v4
- **Language**: Strict TypeScript v5
- **Database**: MongoDB with Mongoose ODM v8
- **Validation**: `express-validator`
- **Logging**: `morgan` + Custom winston-style Logger
- **Environment**: `dotenv`

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or v20+ recommended)
- **MongoDB** running locally on port `27017` or a MongoDB Atlas URI

### 2. Installation
Navigate to the `server/` folder and install dependencies:
```bash
cd server
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your `.env` contains valid values:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/safecircle
JWT_SECRET=super_secret_jwt_key_placeholder_for_safecircle_app_2026
CORS_ORIGIN=http://localhost:5173
```

### 4. Database Seeding
Populate your MongoDB database with sample users, emergency contacts, locations, and SOS logs matching the frontend UI:
```bash
npm run seed
```

### 5. Running the Server
Start the development server with live reloading:
```bash
npm run dev
```

Server will start on `http://localhost:5000/api`.
Interactive Swagger docs: `http://localhost:5000/api/docs`.

---

## 📖 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/health` | Health check & MongoDB status |
| **POST** | `/api/users/register` | Register new user |
| **POST** | `/api/users/login` | Login and obtain JWT token |
| **GET** | `/api/users/profile` | Retrieve user profile |
| **PUT** | `/api/users/profile` | Update user profile |
| **GET** | `/api/contacts` | List emergency contacts |
| **POST** | `/api/contacts` | Add new emergency contact |
| **PUT** | `/api/contacts/:id` | Update emergency contact |
| **DELETE** | `/api/contacts/:id` | Delete emergency contact |
| **POST** | `/api/location/live` | Update user live coordinates |
| **GET** | `/api/location/current` | Get latest recorded location |
| **GET** | `/api/location/history` | Get GPS route history |
| **POST** | `/api/sos/trigger` | Trigger emergency SOS broadcast |
| **POST** | `/api/sos/stop` | Deactivate active SOS alert |
| **GET** | `/api/sos/history` | Get emergency SOS logs |
| **POST** | `/api/sos/voice-analyze` | Analyze voice text for distress |
| **GET** | `/api/emergencies` | List all emergency records |
| **POST** | `/api/emergencies` | Log an emergency incident |
| **GET** | `/api/analytics` | Retrieve safety dashboard metrics |

---

## 🔗 Frontend Integration

To connect your React frontend:
1. Ensure your frontend makes requests to `http://localhost:5000/api`.
2. When triggering SOS or loading analytics, the backend returns JSON responses formatted to match the frontend interfaces (`Contact`, `Location`, `AnalyticsData`, `EmergencyRecord`).
