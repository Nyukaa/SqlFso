# 📚 Full Stack Open – SQL & PostgreSQL Project

This repository contains my solutions for the **SQL and Sequelize part** of the Full Stack Open course.  
The project evolves from a simple blog API into a fully featured backend with authentication, relations, and database migrations.

---

## 🚀 Features

### 🗄️ Database & ORM

- PostgreSQL as the database
- Sequelize ORM for modeling and queries
- Database migrations managed with **Umzug**
- Proper relational schema design

### 👤 Users & Authentication

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Session management
- Account disabling & admin roles

### 📝 Blogs

- CRUD operations for blogs
- Blogs linked to users (one-to-many)
- Search functionality (`?search=`)
- Sorting by likes
- Year field with validation

### 📖 Reading Lists

- Many-to-many relationship between users and blogs
- Through table (`reading_lists`)
- Ability to mark blogs as read/unread
- Filtering by read status

### 🔐 Sessions

- Session-based login handling
- Logout functionality
- Middleware for session validation

---

## 🏗️ Database Structure

- `users` ← one-to-many → `blogs`
- `users` ← many-to-many → `blogs` (through `reading_lists`)
- `users` ← one-to-many → `sessions`

---

## ⚙️ Migrations

- Database schema is managed via migrations (no `sequelize.sync()` in production)
- Migrations include:
  - creating users and blogs
  - adding fields (year, password hash, disabled)
  - creating reading lists
  - creating sessions

---

## 🧪 Testing & CI

- GitHub Actions workflow for automated testing
- PostgreSQL service runs in CI
- Application is started and tested automatically
- Ensures migrations run before tests

---

## 🛠️ Tech Stack

- Node.js
- Express
- PostgreSQL
- Sequelize
- Umzug
- JWT
- bcrypt
- GitHub Actions

---

## 🧠 What I Learned

- Designing relational databases
- Managing schema changes with migrations
- Using Sequelize ORM for modeling and queries
- Handling many-to-many relationships
- Building secure authentication systems
- Debugging CI/CD pipelines
