# Weather Application - Backend

This is the **backend API** for the Weather Application.  
It is built with **Node.js**, **Express**, and **MongoDB** (via Mongoose) and provides authentication, weather history management, and user account handling.

---

## 🚀 Features
- **User Authentication** (Login, Signup, Logout) using JWT and cookies
- **Weather Search History**
  - Add history when a weather search is performed
  - Paginated history fetching (25 records per request)
  - Remove a specific history record
  - Clear entire history
- **Secure API**
  - Cookie-based authentication
  - Environment-based configuration (dev/prod)

---

## 🛠️ Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose ODM)
- **JWT** for authentication
- **Bcrypt** for password hashing
