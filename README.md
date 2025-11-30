
#  **BACKEND README (storage-platform-backend)**

Create a file: **`backend/README.md`**

---

## 📁 Storage Platform – Backend (Node.js + Express + MongoDB)

This is the **backend service** of the Storage Platform project.
It handles:

* Authentication
* Folder & Subfolder management
* File metadata management
* Public sharing system
* Secure JWT-based access control

---

## 🚀 Features

### 🔐 Authentication

* Admin user model
* Register / login
* Password hashing using bcrypt
* JWT authentication middleware

### 📂 Folder System

* Create folders
* View all folders
* Nested folder support (parent → children)
* Rename folders
* Delete folders (with recursive delete support)

### 📄 File System

* Create file entry
* Rename file entry
* Delete file entry
* Link file to folder

### 🌍 Public Share System

* Generates a unique share ID using UUID v9
* Anyone with the link can view shared folder/file
* No authentication required
* Read-only access

---

## 🛠 Tech Stack

| Technology         | Purpose               |
| ------------------ | --------------------- |
| Node.js + Express  | Backend APIs          |
| MongoDB + Mongoose | Database models       |
| JSON Web Tokens    | Authentication        |
| bcryptjs           | Password hashing      |
| dotenv             | Environment variables |
| cors               | Cross-origin support  |

---

## 🗂 Folder Structure

```
src/
  controllers/
  models/
  routes/
  middleware/
  utils/
  index.ts
```

---

## 🔌 API Endpoints (Summary)

### Auth

```
POST /api/auth/register
POST /api/auth/login
```

### Folders

```
GET    /api/folders
POST   /api/folders
GET    /api/folders/:id
PUT    /api/folders/:id
DELETE /api/folders/:id
```

### Files

```
POST   /api/files
PUT    /api/files/:id
DELETE /api/files/:id
```

### Public Sharing

```
POST /api/shares
GET  /api/public/:shareId
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/storage-platform-backend.git
cd storage-platform-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create `.env` File

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/storage-platform
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### 4️⃣ Start Development Server

```bash
npm run dev
```

---

## 🧪 Testing with Postman

Import the included **Postman Collection**:

```
auth → register → login  
folders → CRUD  
files → CRUD  
shares → create + public link  
```

---

## 🔒 Security

* Passwords stored using bcrypt hashing
* JWT used for validating authenticated requests
* CORS restricted to client URL

---

## 📜 License

This backend service is open for customization and development use.

---

# 🎉 DONE!

Both README files are **polished, professional, and GitHub-ready**.

If you want:

✔ Auto-generated API docs using **Swagger**
✔ Preview GIFs for README
✔ Setup instructions for deployment (Render, Vercel, Railway)
✔ A zipped bundle
✔ A CI/CD GitHub Action

Just tell me — I can generate it!
