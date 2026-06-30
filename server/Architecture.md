# SafeCircle Backend Architecture 🏛️

This document outlines the architectural design, data flows, and layer separation of the **SafeCircle** women's safety backend application.

---

## 🏗️ Layered Architecture

The application strictly adheres to the **Layered (3-Tier) Architecture** pattern, separating concerns into discrete, testable components:

```
[ HTTP Requests / React Frontend ]
               │
               ▼
   ┌──────────────────────┐
   │  Express Middlewares │  (Security Helmet, CORS, Rate Limiters, Request Logging)
   └───────────┬──────────┘
               │
               ▼
   ┌──────────────────────┐
   │      Routes Layer    │  (REST API routing & Input Validation via Express-Validator)
   └───────────┬──────────┘
               │
               ▼
   ┌──────────────────────┐
   │   Controllers Layer  │  (HTTP Request parsing, Business logic coordination, ResponseHelper formatting)
   └───────────┬──────────┘
               │
               ▼
   ┌──────────────────────┐
   │    Services Layer    │  (External integration placeholders: Voice AI, Maps, SMS, Push, Email)
   └───────────┬──────────┘
               │
               ▼
   ┌──────────────────────┐
   │     Models Layer     │  (Mongoose Schemas & TypeScript Document Interfaces)
   └───────────┬──────────┘
               │
               ▼
   [    MongoDB Database  ]
```

---

## 🔄 Core Data & Emergency Workflow Flow

### 1. SOS Trigger Workflow (`POST /api/sos/trigger`)
1. **Request Validation**: `validateRequest` verifies coordinates and trigger type (`SOS Button`, `Voice Trigger`, `Panic Detection`, `Geofence Exit`, or `Fake Call Trigger`).
2. **Database Logging**: `SOSController` records an active incident inside `EmergencyLog`.
3. **Multi-Channel Dispatch**:
   - `NotificationService.sendPushNotification()` records an in-app alert inside `Notification`.
   - `SMSService.sendEmergencySMS()` iterates through all contacts flagged with `isEmergency: true` and dispatches SMS alerts.
   - `EmailService.sendEmail()` notifies the user's primary emergency email address.
4. **Standardized Response**: `ResponseHelper.success()` returns HTTP `201 Created` with log details and total contacts notified.

---

## 🔒 Error Handling Strategy

All controllers use async/await wrapped in `try...catch` blocks forwarding errors to Express `next(error)`.
The **Global Error Handler** (`errorHandler.ts`) intercepts exceptions:
- Known operational errors (`AppError`) return appropriate status codes (`400`, `401`, `404`, `409`).
- Validation failures (`express-validator`) return detailed parameter errors with `400 Bad Request`.
- Stack traces are securely omitted when `NODE_ENV=production`.
