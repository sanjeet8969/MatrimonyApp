
# 💍 Matrimonial MERN App



A modern full-stack matrimonial web application built using the MERN stack (MongoDB, Express.js, React, Node.js). This platform allows users to create detailed profiles, search for partners based on advanced criteria, express interest, and communicate in real-time through a built-in chat system. It also includes a comprehensive admin panel for moderation and management.

---

## ✨ Key Features

- 👤 **User Authentication**: Secure login/register using JWT, email verification, and password reset.
- 📝 **Detailed Profile Management**: Multi-step form to input personal, family, education, and career info.
- 🖼️ **Photo Gallery**: Upload and manage photos using Cloudinary with cropping support.
- 💘 **Advanced Matching Algorithm**: Intelligent match suggestions based on preferences.
- 🔍 **Smart Search & Filtering**: Search using filters like age, religion, location, etc.
- 💬 **Real-Time Chat**: Instant messaging with typing indicators and read receipts via Socket.io.
- ❤️ **Interest Management**: Send, accept, reject interest requests with notifications.
- 🛡️ **Admin Dashboard**: Manage users, moderate content, view analytics.
- 📱 **Fully Responsive UI**: Built using Tailwind CSS and React for great UX on all devices.
- 🔔 **Notifications**: Real-time toasts for new interests, messages, profile views.

---

## 🚀 Tech Stack

### Frontend
- **React 18.3.1**
- **Vite 6.0.1**
- **Tailwind CSS 3.4.15**
- **React Router 6.28.0**
- **Axios 1.7.9**
- **Socket.io Client 4.8.1**
- **Lucide React**
- **React Hot Toast**

### Backend
- **Node.js**
- **Express.js 4.18.2**
- **MongoDB + Mongoose 7.5.0**
- **Socket.io 4.7.2**
- **JWT (JSON Web Token)**
- **bcryptjs**
- **Cloudinary**
- **Nodemailer**

### Development Tools
- **ESLint**
- **Prettier**
- **Vitest (Frontend Testing)**
- **Jest (Backend Testing)**

---

## 📁 Folder Structure

```bash
matrimony-app/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # React Context for state management
│   │   ├── services/        # API call services
│   │   ├── utils/           # Utility functions
│   │   └── ...
│   └── package.json
├── backend/
│   ├── config/            # Database and app configuration
│   ├── controllers/       # Logic for handling requests
│   ├── middleware/        # Custom middleware (auth, error handling)
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API route definitions
│   ├── utils/             # Backend utilities
│   ├── server.js          # Main entry point
│   └── package.json
└── README.md
````

---

## 🔧 Getting Started

### Prerequisites

* Node.js v18+
* npm or yarn
* MongoDB (local or Atlas)

### Installation & Setup

#### 1. Clone the repository

```bash
git clone https://github.com/sanjeet8969/MatrimonyApp
cd matrimony-app
```

#### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_super_secret_jwt_key>
CORS_ORIGIN=http://localhost:5173

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

# Nodemailer Credentials (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<your_email@gmail.com>
EMAIL_PASS=<your_gmail_app_password>
```

#### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create `.env` file inside `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### Start Backend

```bash
cd backend
npm run dev
```

Backend will run on: [http://localhost:5000](http://localhost:5000)

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will open at: [http://localhost:5173](http://localhost:5173)

---

## ✅ Running Tests

### Backend (Jest)

```bash
cd backend
npm test
```

### Frontend (Vitest)

```bash
cd frontend
npm test
```

---

## 📄 API Endpoints

<details>
<summary><strong>Click to expand API Routes</strong></summary>

### 🔐 Authentication (`/api/auth`)

```http
POST /register      → Register a new user
POST /login         → Login and receive JWT
GET /me             → Get current user info
POST /logout        → Logout
```

### 👤 Profiles (`/api/profiles`)

```http
GET /me             → Get current profile
PUT /               → Update profile
GET /search         → Filtered profile search
GET /:id            → Get profile by ID
POST /photos        → Upload photos
```

### 💘 Matches & Interests (`/api/matches`)

```http
GET /find                   → Get suggested matches
POST /interest              → Send interest
PUT /interest/:id           → Accept/Decline interest
GET /interests              → View sent/received interests
```

### 💬 Messaging (`/api/messages`)

```http
POST /send                  → Send message
GET /conversations          → Get conversations
GET /:conversationId        → Get messages from a conversation
```

</details>
