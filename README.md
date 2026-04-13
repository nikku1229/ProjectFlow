# ⚡ ProjectFlow — Mini Project Management System

A full-stack project management application built with **Node.js + Express + MongoDB** (backend) and **Vite + React** (frontend).

---

## 🚀 Features

### Backend
- ✅ JWT-based authentication (register / login)
- ✅ Password hashing with bcrypt
- ✅ Full CRUD for Projects
- ✅ Full CRUD for Tasks per project
- ✅ Pagination & status filtering on tasks
- ✅ Centralized error handling
- ✅ Input validation with express-validator

### Frontend
- ✅ Login & Register pages with form validation
- ✅ Dashboard with all projects (card grid view)
- ✅ Create / Edit / Delete projects
- ✅ Open project → view & manage tasks
- ✅ Add / Edit / Delete tasks
- ✅ Change task status inline (dropdown)
- ✅ Filter tasks by status
- ✅ Pagination for tasks
- ✅ Context API for global state
- ✅ Toast notifications
- ✅ Responsive dark UI
- ✅ Docker support

---

## 🗂️ Folder Structure

```
project-management/
|
├── backend/
│   ├── src/
│   │   ├── config/         # DB connection
│   │   ├── controllers/    # Route logic
│   │   ├── middleware/     # Auth + error handler
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routers
│   │   └── app.js          # Entry point
│   └── package.json
|
|
├── frontend/
│   ├── src/
│   │   ├── components/     # Modal, Navbar, Toast, etc.
│   │   ├── context/        # AuthContext, ProjectContext
│   │   ├── pages/          # Login, Register, Dashboard, ProjectDetail
│   │   ├── services/       # API service layer
│   │   └── App.jsx
│   └── package.json
|
├── ProjectFlow.postman_collection.json
└── README.md
```

---

## ⚙️ Local Setup (Without Docker)

### Prerequisites
- Node.js v18+
- MongoDB running locally (or MongoDB Atlas URI)

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/projectflow.git
cd Project-Management
```

### 2. Setup Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on: `http://localhost:5000`

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 📡 API Reference

### Auth
| Method | Endpoint              | Description       | Auth |
|--------|-----------------------|-------------------|------|
| POST   | /api/auth/register    | Register user     | ❌   |
| POST   | /api/auth/login       | Login user        | ❌   |
| GET    | /api/auth/me          | Get current user  | ✅   |

### Projects
| Method | Endpoint              | Description            | Auth |
|--------|-----------------------|------------------------|------|
| GET    | /api/projects         | Get all projects       | ✅   |
| POST   | /api/projects         | Create project         | ✅   |
| GET    | /api/projects/:id     | Get single project     | ✅   |
| PUT    | /api/projects/:id     | Update project         | ✅   |
| DELETE | /api/projects/:id     | Delete project + tasks | ✅   |

### Tasks
| Method | Endpoint                                      | Description   | Auth |
|--------|-----------------------------------------------|---------------|------|
| GET    | /api/projects/:pid/tasks?page=1&status=todo   | Get tasks     | ✅   |
| POST   | /api/projects/:pid/tasks                      | Add task      | ✅   |
| PUT    | /api/projects/:pid/tasks/:tid                 | Update task   | ✅   |
| DELETE | /api/projects/:pid/tasks/:tid                 | Delete task   | ✅   |

### Query Params for Tasks
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 10)
- `status` — Filter by `todo` | `in-progress` | `completed`
- `priority` — Filter by `low` | `medium` | `high`

---

## 🧪 Postman Collection

Import `ProjectFlow.postman_collection.json` into Postman.

The collection auto-saves the JWT token and IDs after Register/Login/Create so you can run requests sequentially.

---

## 🌐 Environment Variables

### Backend `.env`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/project-mgmt || mongodb://srv+url:your_atlas_url
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Deploy

### Render (Backend)
Live Link: 

### Vercel (Frontend)
Live Link:

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, Vite, Context API         |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB, Mongoose                   |
| Auth      | JWT, bcryptjs                       |
| Validation| express-validator                   |
| DevOps    | Docker, Docker Compose, Nginx       |

---

Made with ❤️ — ProjectFlow
