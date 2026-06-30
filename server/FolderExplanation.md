# Folder Structure Explanation 📁

Below is a detailed breakdown of each directory and file in the **SafeCircle** backend server repository.

---

## Directory Overview

```
server/
├── config/           # App configuration (environment variables, CORS, Helmet, Swagger)
├── controllers/      # HTTP request handlers coordinating business logic
├── database/         # MongoDB Mongoose connection and database seeding script
├── middlewares/      # Express middlewares (auth, validation, logging, errors)
├── models/           # Mongoose ODM schemas and document models
├── routes/           # Express REST API routes and endpoint declarations
├── services/         # External service abstractions (Voice AI, Maps, SMS, Email)
├── types/            # TypeScript interfaces and request/response type definitions
├── utils/            # Helper utilities (response formatter, logger, error class)
├── app.ts            # Express app initialization and middleware pipeline setup
└── server.ts         # Application entry point starting server and database
```

---

## Detailed File Descriptions

### `config/`
- **`env.ts`**: Loads and validates environment variables from `.env` with strict defaults.
- **`express.ts`**: Configures CORS origins, Helmet security policies, and API rate limiting.
- **`swagger.ts`**: OpenAPI 3.0 specification generator for `/api/docs`.
- **`index.ts`**: Central barrel export for configuration modules.

### `controllers/`
- **`UserController.ts`**: Handles user registration, JWT login placeholder, profile retrieval, and updates.
- **`EmergencyContactController.ts`**: CRUD operations for emergency contacts (`Add`, `Get`, `Update`, `Delete`).
- **`LocationController.ts`**: Records live GPS coordinates, retrieves current location, and fetches route history.
- **`SOSController.ts`**: Triggers multi-channel SOS broadcasts, stops active alerts, and fetches SOS history.
- **`EmergencyController.ts`**: Logs general safety events and retrieves historical records.
- **`AnalyticsController.ts`**: Aggregates safety scores, emergency statistics, weekly activity, and dashboard trends.

### `database/`
- **`connection.ts`**: Manages Mongoose lifecycle events (`connected`, `error`, `disconnected`) and graceful shutdowns.
- **`seed.ts`**: Standalone seeding script populating MongoDB with mock data formatted for React UI testing.

### `middlewares/`
- **`errorHandler.ts`**: Global Express error handler formatting error responses consistently.
- **`requestLogger.ts`**: HTTP traffic logger utilizing `morgan` piped into structured console logging.
- **`validateRequest.ts`**: Intercepts `express-validator` checks and halts invalid requests before reaching controllers.
- **`authMiddleware.ts`**: Verifies JWT bearer tokens with a fallback placeholder session for seamless UI testing.
- **`notFoundHandler.ts`**: Catches unrouted requests and returns a structured JSON `404 Not Found` response.

### `models/`
- **`User.ts`**: Mongoose model for user profiles, emergency messages, and geofence parameters.
- **`EmergencyContact.ts`**: Mongoose model for trusted contacts with relationship and priority flags.
- **`Location.ts`**: Mongoose model storing GPS coordinates, safety scores (`0-10`), and crowd levels.
- **`EmergencyLog.ts`**: Mongoose model recording trigger types, timestamps, and resolution status.
- **`Notification.ts`**: Mongoose model tracking system alerts and read statuses.

### `routes/`
- **`index.ts`**: Central router mounting all REST sub-routers and `/api/health`.
- **`userRoutes.ts`**, **`contactRoutes.ts`**, **`locationRoutes.ts`**, **`sosRoutes.ts`**, **`emergencyRoutes.ts`**, **`analyticsRoutes.ts`**: Specific route definitions mapping REST methods to controllers.

### `services/`
- **`VoiceAIService.ts`**: Analyzes audio transcripts for panic keywords (`help`, `police`, `save me`).
- **`MapsService.ts`**: Reverse geocoding and route safety score calculations.
- **`NotificationService.ts`**, **`SMSService.ts`**, **`EmailService.ts`**: Dispatchers for push, SMS, and email alerts.

### `types/`
- **`apiResponse.ts`**, **`request.ts`**, **`user.ts`**, **`contact.ts`**, **`location.ts`**, **`sos.ts`**, **`analytics.ts`**: Pure TypeScript interfaces ensuring strict typing across models, requests, and responses.

### `utils/`
- **`AppError.ts`**: Custom operational error class supporting HTTP status codes.
- **`logger.ts`**: Timestamped structured console logger.
- **`responseHelper.ts`**: Standardizes API responses into `{ success, message, data, timestamp }`.
- **`validators.ts`**: Validation schemas using `express-validator`.
- **`constants.ts`**: System-wide enums and HTTP status definitions.
