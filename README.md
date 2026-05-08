# ⚡ ProjectFlow — Project Management System

A modern full-stack **Project Management Application** built with **React + Node.js + Express + MongoDB**, designed to help teams and individuals manage projects, organize tasks, track progress, and streamline workflows efficiently.

ProjectFlow includes:

* 🔐 Secure JWT Authentication
* 📁 Project & Task Management
* 📊 Task Filtering & Pagination
* 🌙 Responsive Dark UI
* ⚡ Real-time User Experience
* 🐳 Docker Support

---

# 🚀 Live Demo

🌐 Live:
[ProjectFlow Frontend](https://project-flow-prototype.vercel.app/)

💻 GitHub Repository:
[ProjectFlow GitHub Repo](https://github.com/nikku1229/ProjectFlow)

---

# 📌 Features

## 🔐 Authentication System

* User Registration & Login
* JWT-based Authentication
* Secure Password Hashing with bcrypt
* Persistent User Sessions
* Protected API Routes

---

## 📁 Project Management

* Create new projects
* Edit project details
* Delete projects
* View all projects in dashboard grid layout
* Project-specific task organization

---

## ✅ Task Management

* Add, edit, and delete tasks
* Inline task status updates
* Task priority levels:

  * Low
  * Medium
  * High
* Task status filtering:

  * Todo
  * In Progress
  * Completed
* Paginated task management

---

## 🎨 UI/UX Features

* Responsive dark-themed interface
* Toast notifications
* Smooth dashboard workflow
* Reusable component architecture
* Modern card-based layouts

---

## ⚙️ Developer Features

* Docker & Docker Compose support
* RESTful API architecture
* Modular backend structure
* API service layer on frontend
* Context API state management

---

# 🛠️ Tech Stack

| Layer          | Technology                    |
| -------------- | ----------------------------- |
| Frontend       | React 18, Vite, Context API   |
| Backend        | Node.js, Express.js           |
| Database       | MongoDB, Mongoose             |
| Authentication | JWT, bcryptjs                 |
| Validation     | express-validator             |
| DevOps         | Docker, Docker Compose, Nginx |

---

# 📂 Project Structure

```bash
project-management/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── ProjectFlow.postman_collection.json
└── README.md
```

---

# ⚙️ Local Setup

## 📋 Prerequisites

Before running the project:

* Node.js v18+
* npm
* MongoDB Local Database or MongoDB Atlas

---

# 📥 Clone Repository

```bash
git clone https://github.com/nikku1229/ProjectFlow.git
cd ProjectFlow
```

---

# 🔧 Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🌐 Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/project-mgmt
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

For MongoDB Atlas:

```env
MONGO_URI=your_atlas_connection_string
```

---

## Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 🔌 API Reference

# 🔐 Authentication

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| POST   | `/api/auth/register` | Register User    |
| POST   | `/api/auth/login`    | Login User       |
| GET    | `/api/auth/me`       | Get Current User |

---

# 📁 Projects

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/api/projects`     | Get All Projects       |
| POST   | `/api/projects`     | Create Project         |
| GET    | `/api/projects/:id` | Get Single Project     |
| PUT    | `/api/projects/:id` | Update Project         |
| DELETE | `/api/projects/:id` | Delete Project & Tasks |

---

# ✅ Tasks

| Method | Endpoint                        | Description |
| ------ | ------------------------------- | ----------- |
| GET    | `/api/projects/:pid/tasks`      | Get Tasks   |
| POST   | `/api/projects/:pid/tasks`      | Create Task |
| PUT    | `/api/projects/:pid/tasks/:tid` | Update Task |
| DELETE | `/api/projects/:pid/tasks/:tid` | Delete Task |

---

# 🔎 Task Query Parameters

```bash
?page=1
&limit=10
&status=todo
&priority=high
```

### Status Filters

* `todo`
* `in-progress`
* `completed`

### Priority Filters

* `low`
* `medium`
* `high`

---

# 🧪 Postman Collection

Import:

```bash
ProjectFlow.postman_collection.json
```

Features:

* Auto-save JWT tokens
* Auto-save project/task IDs
* Sequential API testing workflow

---

# 🔐 Security Features

* JWT Authentication
* Password Hashing (bcrypt)
* Protected Routes
* Centralized Error Handling
* Request Validation
* Express Validator Middleware

---

# 📈 Performance & Architecture

* Paginated task loading
* Context-based global state
* Modular backend architecture
* Reusable frontend components
* Optimized REST API structure

---

# 🐳 Docker Support

Run with Docker:

```bash
docker-compose up --build
```

Includes:

* Frontend
* Backend
* MongoDB
* Nginx setup

---

# 🚀 Future Improvements

* Real-time collaboration
* Team workspaces
* Activity timeline
* File uploads
* Comments on tasks
* Drag & Drop Kanban board
* Email notifications
* Role-based permissions

---

# 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

# 👨‍💻 Author

**Nitesh Sharma**

* GitHub:
  [GitHub Profile](https://github.com/nikku1229)

* LinkedIn:
  [LinkedIn Profile](https://www.linkedin.com/in/nitish-sharma-648a581b2)

---

# ⭐ Support

If you like this project:

⭐ Star the repository
🔁 Share the project
🤝 Contribute to development

---

# 🔥 Built for Efficient Project & Task Management

ProjectFlow is designed to simplify workflows, improve productivity, and provide a clean modern experience for managing projects and tasks.
