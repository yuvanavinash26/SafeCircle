# SafeCircle AI &bull; AI Safety Companion for India

[![Hackathon Project](https://img.shields.io/badge/Hackathon-Starter--Kit-blueviolet?style=for-the-badge)](https://github.com)
[![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
[![Tailwind CSS v3](https://img.shields.io/badge/Tailwind_CSS-v3-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)

SafeCircle AI is an intelligent safety companion application designed to deliver real-time personal safety guardrails across India. This is a complete, production-quality hackathon starter project blueprint containing all routing, layout navigation elements, modular Glassmorphic components, high-fidelity mock datasets, and complete folder structures for concurrent frontend and backend collaboration.

---

## 🚀 Key Features Simulated

- **Landing Page Suite**: Incorporates beautiful visual representations, testimonials, FAQ dropdowns, stats counters, and roadmap features.
- **One-Tap SOS Dispatch**: Main emergency button simulating active coordinates broadcasting with countdown triggers.
- **Live Safety Maps**: Local neighborhood safe zone indices grids mapped with crowd scoring parameters.
- **AI Voice Assistant**: Ambient acoustic listener mockup with bouncing soundwaves animation.
- **AI Panic Detection**: Biometric sensors tracking heart-rate jumps and acceleration decel impacts.
- **Fake Call Simulator**: Excuses user from uncomfortable spaces by calling back with customizable timers.
- **Safety Analytics & Incident Logs**: Comprehensive analytics summaries and incident auditing log timelines.

---

## 📁 Technical Architecture & Collaboration

The project has been separated into clean, standalone layers so that a team of 3 developers can work independently:

- **Developer Alpha (Frontend UX/UI)**: Coordinates folders under `src/components`, `src/pages`, `src/layout`, `src/styles` using React, TypeScript, and Tailwind CSS.
- **Developer Beta (Biometrics & Edge AI)**: Integrates speech models and accelerometer DeviceMotion logs inside `src/pages/dashboard/VoiceAssistant.tsx`, `src/pages/dashboard/AIPanicDetection.tsx`, and connects Web Audio / Smartwatch BLE APIs.
- **Developer Gamma (Backend & Databases)**: Manages boilerplate folders under `server/` configuring Express controllers, MongoDB schemas, and socket relays.

For a full explanation of directories, review [FolderExplanation.md](file:///c:/Users/A.YUVAN%20AVINASH/Downloads/SafeCircle/FolderExplanation.md). For architecture specifications, check [Architecture.md](file:///c:/Users/A.YUVAN%20AVINASH/Downloads/SafeCircle/Architecture.md).

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation & Run

1. Clone or download this repository.
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Run Vite local dev server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

---

## 📜 License

This project is licensed under the MIT License. See [LICENSE](file:///c:/Users/A.YUVAN%20AVINASH/Downloads/SafeCircle/LICENSE) for more details.
