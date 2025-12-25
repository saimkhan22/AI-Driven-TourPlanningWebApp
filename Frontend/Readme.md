🚀 AI-Driven Tour Planning Web Application
📌 Project Overview

This project is an AI-Driven Tour Planning Web Application designed to help users plan trips across Pakistan easily and smartly.
The system allows users to explore destinations, book hotels and vehicles, generate AI-based itineraries, and use emergency SOS services.

The application is built using Next.js for both frontend and backend with MongoDB as the database.

🎯 Objectives

Provide smart tour planning using AI recommendations

Allow users to book hotels and vehicles online

Generate personalized travel itineraries

Offer emergency SOS support for travelers

Build a scalable and secure web application

🧑‍💻 Technologies Used
Frontend

Next.js 13 (App Router)

React.js

Tailwind CSS

JavaScript / TypeScript

Backend

Next.js API Routes (route.ts)

Node.js runtime

MongoDB with Mongoose

JWT Authentication

bcrypt for password hashing

Tools & Services

Visual Studio Code

MongoDB Compass

Git & GitHub

Postman (API Testing)

Vercel (Deployment)

🗂️ Project Structure
project-root/
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signin/
│   │   │   │   └── route.ts
│   │   │   └── signup/
│   │   │       └── route.ts
│   │   ├── hotels/
│   │   ├── vehicles/
│   │   ├── itineraries/
│   │   └── emergency/
│   │
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
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

🔐 Authentication Flow

User registers using email and password

Password is encrypted using bcrypt

Login verifies user credentials from MongoDB

JWT token is generated for session management

🌟 Core Features
✅ User Authentication

Signup & Login

Secure password hashing

JWT-based authentication

🏨 Hotel Booking

Browse hotels

Check availability

Book rooms

🚗 Vehicle Booking

Book cars, vans, jeeps, and buses

Filter by passengers and price

🧠 AI Itinerary Generator

Generate day-wise travel plans

Personalized recommendations

🌍 Destination Planning

Explore tourist destinations

View attractions and best seasons

🚨 Emergency SOS

One-click SOS feature

Access emergency contacts (Police, Rescue)

🔄 Frontend–Backend Workflow

User interacts with UI (page.tsx)

Frontend calls API using fetch()

API route (route.ts) processes request

MongoDB handles data storage

Response is sent back to frontend

🧪 Testing

API tested using Postman

Manual UI testing

Boundary value testing for inputs

Selenium can be used for automated UI testing

⚙️ Environment Setup
1️⃣ Install Dependencies
npm install

2️⃣ Create .env.local
MONGODB_URI=mongodb://127.0.0.1:27017/ai-tour-app
JWT_SECRET=your_secret_key

3️⃣ Run Project
npm run dev

🔒 Security Measures

Encrypted passwords

JWT authentication

Input validation

Protected API routes

HTTPS support in production

📈 Scalability

Modular folder structure

Cloud deployment (Vercel)

MongoDB for flexible data storage

Easy addition of new features

📦 Deliverables

Complete frontend UI

Backend APIs

Database integration

Project documentation

GitHub repository

Deployment-ready application

👨‍👩‍👧 Team Members

Saim Ali Khan

Moheed Khan

Muzamil Khan

📌 Future Enhancements

Payment gateway integration

Admin dashboard

AI chatbot improvements

Mobile application

📜 License

This project is developed for academic purposes (FYP).