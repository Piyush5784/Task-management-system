# Project & Task Management System

## Overview
The Project & Task Management System is a web-based application that allows an Admin to manage multiple projects and assign tasks to Team Members. Team Members can update task statuses and comment on tasks.

## Features
### 1. User Authentication & Authorization
- JWT-based authentication using HTTP-only cookies.
- Role-based access control (Admin, Team Member).
- Secure API routes.

### 2. Project Management
- Admin can create projects.
- All users can view all projects (including Admins).
- Clicking on a project displays its task list.

### 3. Task Management
- Admin assigns tasks to specific users.
- Each task includes Title, Description, Assigned User, Status, and Priority.
- Task filtering: "Assigned to Me" or "All Tasks".
- Sorting by priority, status, and creation date.

### 4. Comments System
- Members can comment on tasks.
- Comments are stored with timestamps.

### 5. API Rate Limiting & Security
- JWT authentication (HTTP-only cookies).
- Role-based authorization.
- Rate-limiting middleware to prevent abuse.

### 6. Deployment
- **Frontend:** Netlify / Vercel.
- **Backend:** Render.

## Tech Stack
### Frontend (React.js)
- React with Context API / Redux Toolkit.
- React Router for navigation.
- Axios for API requests.
- TailwindCSS / Material UI for UI design.

### Backend (Node.js, Express.js)
- Express.js for API handling.
- JWT for authentication.
- Express-validator for input validation.
- Rate-limiting middleware.

### Database (MongoDB)
- Mongoose ORM for database modeling.
- MongoDB Atlas for cloud hosting.

## Installation & Setup
### Prerequisites
- Node.js & npm installed.
- MongoDB Atlas database setup.

### Setup Instructions
#### Clone the Repository
```sh
git clone https://github.com/Piyush5784/project-task-management.git
cd project-task-management
```

#### Backend Setup
```sh
cd server
pnpm install
pnpm dev
```

#### Frontend Setup
```sh
cd client
npm install
npm start
```

#### Environment Variables
- Add `.env` file in the `server` directory.
- Add `BACKEND_URL` in `client/src/config`.

## API Endpoints
### Authentication
- `POST /api/v1/auth/register` - Register a new user.
- `POST /api/v1/auth/login` - Login and receive JWT token.
- `GET /api/v1/auth/getUsers` - Get all members.
- `POST /api/v1/auth/logout` - Logout user.

### Projects
- `POST /api/v1/projects/create` - Create a new project (Admin only).
- `GET /api/v1/projects/getAll` - Get all projects.
- `GET /api/v1/projects/:id` - Get a specific project.

### Tasks
- `GET /api/v1/tasks/getAllTasks` - Get all tasks.
- `POST /api/v1/tasks/create` - Create a task (Admin only).
- `POST /api/v1/tasks/update` - Update task status.
- `POST /api/v1/tasks/comment` - Comment on a task.
- `Get /api/v1/tasks/getComments?projectId` - Get the latest comments.
  
**Note:** All routes are protected with rate limiting and middleware for role-based access control.

## Deployment
### Frontend
- Deployed on  Vercel.
- Live link:- https://task-management-system-six-beta.vercel.app

### Backend
- Deployed on Render.
- Live link:- [https://task-management-system-p8fk.onrender.com/api/v1](https://task-management-system-p8fk.onrender.com/api/v1)


