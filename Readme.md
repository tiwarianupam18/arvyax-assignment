# 🌿 Arvyax Wellness Session Manager

A full-stack web application to help users manage their personalized wellness sessions like yoga or meditation flows. Built as part of the Arvyax Full Stack Developer Internship assignment.

The app allows users to register, log in, create/edit wellness sessions, auto-save their progress, and publish sessions when ready — with smooth visual feedback and a clean UI.

---

## 🔗 Live Demo

- 🔵 **Frontend**: https://your-frontend.onrender.com
- 🟢 **Backend API**: 
https://arvyax-assignment.onrender.com/api
> 📝 

---

## 🛠️ Tech Stack

### 🔹 Frontend:

- React + Vite
- Tailwind CSS
- React Router DOM
- React Toastify

### 🔹 Backend:

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt (Password hashing)

### 🔹 Deployment:

- Render (Frontend: Static Site, Backend: Web Service)

---

## ✨ Key Features

- 🔐 **Authentication**: Register/Login with JWT token
- 🧘 **Session Editor**: Add title, tags, and JSON file URL
- 🕒 **Auto-Save**: Saves after 5s of inactivity or every 30s
- 💾 **Draft & Publish**: Save drafts or publish finalized sessions
- 📋 **Dashboard**: View and edit all your sessions
- 🚫 **Protected Routes**: Only logged-in users can access dashboard and editor
- 📱 **Responsive UI**: Mobile-friendly design
- ✅ **Visual Feedback**: Toasts on every major action

---

## 📁 Project Structure

/arvyax
├── /backend # Node.js + Express API
│ ├── routes/
│ ├── models/
│ └── server.js
├── /frontend # React + Vite + Tailwind
│ ├── src/
│ │ ├── pages/
│ │ ├── utils/
│ │ └── App.jsx
├── .env.example # Combined frontend + backend env vars
└── README.md # This file

## ⚙️ Local Setup Instructions

### 1. Clone the repository

git clone https://github.com/your-username/arvyax.git
cd arvyax

2. Backend Setup
   cd backend
   npm install

3.Create a .env file in /backend with:
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
Run the server:
npm start

3. Frontend Setup
   cd ../frontend
   npm install

4.Create a .env file in /frontend with:
VITE_API_URL=https://your-backend.onrender.com/api
Run the React app:
npm run dev
