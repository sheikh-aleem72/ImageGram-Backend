---
# 🖥️ ImageGram Backend

This repository contains the **backend** for ImageGram, a social media app built with the **MERN stack**.
It provides a **REST API** for user authentication, image uploads, posts, likes, comments, and real-time notifications.
---

## 🚀 Features

- 🔐 JWT-based Authentication & Authorization
- 👤 User management (register, login, profile)
- 🖼️ Post management (create, delete, like, comment)
- ☁️ Image upload with **Cloudinary**
- 🔔 Real-time notifications with **Socket.io**
- 📊 MongoDB schema for scalable data storage

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js** – REST API
- **MongoDB + Mongoose** – Database
- **Cloudinary** – Image hosting
- **Socket.io** – Real-time notifications
- **JWT + bcrypt** – Authentication & password hashing

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/sheikh_aleem72/ImageGram-Backend.git
cd imagegram-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Fill in values for MongoDB URI, JWT_SECRET, Cloudinary keys, etc.

# Start development server
npm run dev
```

## 📂 Folder Structure

src/
├── config/ # DB & cloudinary config
├── controllers/ # Request validation
├── middlewares/ # Auth, error handling
├── schema/ # Mongoose schemas
├── service/ # Business logic
├── routes/ # API routes
├── utils/ # Helpers
└── index.js # Entry point

## 📡 API Endpoints (Sample)

```
Method      Endpoint                    Description
POST        /api/v1/users/signup        Register new user
POST        /api/v1/users/signin        Login user
POST        /api/v1/posts/create-post   Create new post
GET         /api/v1/posts/get-post/:id  Get post by Id
POST        /api/like/                  Like/unlike a post
```
