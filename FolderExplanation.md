# SafeCircle AI &bull; Project Folder Explanation

This document defines the folder structure of **SafeCircle AI** starter repository, ensuring developers find relevant code blocks and implement features systematically.

---

## 📁 Repository Overview

```
SafeCircle/
├── server/                     # BACKEND - Boilerplate Folder Structure
│   ├── config/                 # Server parameters, JWT secrets, Twilio keys
│   ├── controllers/            # Route controllers (SOS relays, CRUD actions)
│   ├── database/               # MongoDB Mongoose connector logs
│   ├── middlewares/            # Token authentications, Express rate limiters
│   ├── models/                 # MongoDB collections schemas (User, Contact, Alert)
│   ├── routes/                 # Express REST endpoint maps
│   ├── services/               # Third-party modules (Twilio, Maps APIs, WebSockets)
│   ├── types/                  # Backend TypeScript interfaces
│   └── utils/                  # Cryptography, response formatters, logging helpers
│
├── src/                        # FRONTEND - React Vite Codebase
│   ├── animations/             # Framer Motion custom transitions, curves
│   ├── assets/                 # SVGs, images, static logos
│   ├── components/             # Reusable UI widgets & placeholder cards
│   ├── constants/              # Fixed thresholds, regional helplines lists
│   ├── context/                # React state providers (Theme, Auth, Telemetry)
│   ├── hooks/                  # Custom hooks (e.g. useAccelerometer, useSpeech)
│   ├── layout/                 # Page wrappers (Dashboard Layout with Sidebar)
│   ├── mock/                   # Static arrays of contacts, locations, alerts
│   ├── pages/                  # Page modules
│   │   ├── dashboard/          # Dashboard subroutes (SOS, Maps, Analytics, etc.)
│   │   └── LandingPage.tsx     # Hero, How it works, FAQ public index
│   ├── routes/                 # Routing configurations
│   ├── services/               # Frontend network requests triggers (Axios boilerplate)
│   ├── styles/                 # Tailwind directives and custom variables
│   ├── types/                  # Global TypeScript type structures definitions
│   └── utils/                  # Local Storage helpers, GPS distance parsers
```

---

## 🏷️ Folder Work Guidelines

- **Need to add styling?**
  Go to [src/index.css](file:///c:/Users/A.YUVAN%20AVINASH/Downloads/SafeCircle/src/index.css) to add utility class declarations, or modify themes in [tailwind.config.js](file:///c:/Users/A.YUVAN%20AVINASH/Downloads/SafeCircle/tailwind.config.js).
- **Need to test dummy telemetry indices?**
  Modify data mock structures in [src/mock/dummyData.ts](file:///c:/Users/A.YUVAN%20AVINASH/Downloads/SafeCircle/src/mock/dummyData.ts).
- **Need to configure APIs hooks?**
  Create requests triggers under `src/services/` and import them to relevant pages under `src/pages/dashboard/`.
- **Need to build backend routers?**
  Add Express endpoint routes in `server/routes/` and corresponding controller parameters inside `server/controllers/`.
