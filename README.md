**AI-Driven Tour Planning Web Application**
**1. Project Description**

The AI-Driven Tour Planning Web Application is a modern web-based platform designed to help users plan and manage travel across Pakistan efficiently.

The system provides:

Smart destination recommendations

Hotel and vehicle booking

AI-generated travel itineraries

Emergency SOS support

This ensures a safe, smooth, and personalized travel experience.

The application is developed using Next.js for both frontend and backend, while MongoDB is used for data storage.

**2. Problem Statement**

Tour planning in Pakistan is often:

Manual

Time-consuming

Unreliable

Travelers face difficulties such as:

Finding trusted hotels and vehicles

Creating optimized travel itineraries

Accessing emergency help during trips

Managing bookings in one place

This project solves these issues by offering an AI-powered, centralized travel planning solution.

**3. Project Objectives**

The main objectives of this project are:

Automate tour planning using AI recommendations

Provide secure hotel and vehicle booking

Generate personalized itineraries based on user preferences

Ensure traveler safety through an Emergency SOS feature

Develop a scalable and user-friendly web application

**4. System Architecture**

The application follows a client–server architecture:

Frontend: Next.js (User Interface & Interaction)

Backend: Next.js API Routes (route.ts)

Database: MongoDB (via Mongoose ODM)

Authentication: JWT-based secure login system

**5. Technology Stack
Frontend**

Next.js 13 (App Router)

React.js

Tailwind CSS

TypeScript / JavaScript

Backend

Next.js API Routes

Node.js Runtime

MongoDB (Mongoose ODM)

JWT Authentication

bcrypt (Password Encryption)

Development Tools

Visual Studio Code

MongoDB Compass

Git & GitHub

Postman (API Testing)

Vercel (Deployment)

**6. Project Folder Structure
project-root/**
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signin/route.ts
│   │   │   └── signup/route.ts
│   │   ├── hotels/
│   │   ├── vehicles/
│   │   ├── itineraries/
│   │   └── emergency/
│   │
│   ├── auth/
│   │   ├── signin/page.tsx
│   │   └── signup/page.tsx
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── lib/
│   └── mongodb.ts
│
├── models/
│   └── User.ts
│
├── .env.local
├── package.json
└── README.md

**7. Core Functionalities
User Authentication**

Secure signup and login

Encrypted password storage

JWT-based session handling

Hotel Booking

View hotel listings

Check availability

Book rooms securely

Vehicle Booking

Book cars, vans, buses, and jeeps

Filter by capacity and price

AI Itinerary Generator

Auto-generate travel plans

Day-wise activity scheduling

Personalized suggestions

Destination Exploration

Explore tourist destinations across Pakistan

View attractions and best seasons

Emergency SOS

Quick SOS activation

Access to emergency services

Location-based assistance

**8. Frontend–Backend Integration Flow**

User interacts with frontend (page.tsx)

Frontend sends request using fetch()

API request is handled by backend (route.ts)

Backend communicates with MongoDB

Response is returned to frontend UI

**9. Database Design**

MongoDB collections include:

Users

Hotels

Vehicles

Bookings

Itineraries

Emergency Contacts

Reviews and Ratings

Each collection is designed for scalability and fast access.

**10. Security Implementation**

Password hashing using bcrypt

JWT token-based authentication

Input validation and sanitization

Protected API routes

HTTPS support in production

**11. Testing Strategy**

API testing using Postman

Manual UI testing

Boundary Value Testing

Selenium for automated UI testing (optional)

**12. Scalability & Performance**

Modular backend structure

Cloud deployment using Vercel

MongoDB flexible schema design

Optimized APIs for fast response

**13. Environment Setup**
Install Dependencies
npm install

Create .env.local
MONGODB_URI=mongodb://127.0.0.1:27017/ai-tour-app
JWT_SECRET=your_secret_key

Run Application
npm run dev

**14. Team Members**

Saim Ali Khan

Moheed Khan

Muzamil Khan

**15. Future Enhancements**

Online payment integration

Admin dashboard

Advanced AI chatbot

Mobile application support

**16. Feature Details Summary**

Authentication

Budget Optimizer

Buses

Dashboard

Destinations

Emergency Hotspots

Foods

Hotels

Scenic Routes

Traffic

Travel Diary

Vehicles

Weather Alerts

**17. Conclusion**

The AI-Driven Tour Planning Web Application provides a complete, smart, and secure solution for travelers.
It simplifies travel planning, improves safety, and enhances user experience through AI-based features and modern web technologies.
