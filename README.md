 
# QuirkyRoomie 🏠

A full-stack MERN web app to help flatmates manage shared responsibilities, raise complaints, and track karma through a gamified system.

Built for the InstaDot Analytics Full Stack Developer Machine Test.

---

## 🚀 Features

- 👥 **User Registration & Login**  
  Users can register and join a flat using a `flatCode`.

- 🧾 **Complaints System**  
  Flatmates can file complaints with title, description, type, and severity.

- 👍👎 **Voting System**  
  Users can upvote or downvote any complaint (except their own).  
  - A complaint with **10 or more upvotes** triggers a punishment:  
    - The creator of the complaint loses **10 karma** points.

- ✅ **Resolve Complaints**  
  The creator of a complaint can mark it as resolved.

- 📊 **Leaderboard**  
  Shows top karma earners, complaint stats, top complaint categories, and the "Flatmate Problem of the Week".

- 🔐 **Authentication & Protected Routes**  
  Users must be logged in to access complaints, leaderboard, and dashboard.

---

## 📂 Project Structure
quirkyroomie/
├── backend/ # Node.js + Express + MongoDB backend
├── frontend/ # React + Bootstrap frontend (Vite)

yaml
Copy
Edit

---

## 🧑‍💻 Tech Stack

| Layer        | Technology              |
|--------------|-------------------------|
| Frontend     | React, Bootstrap, Axios |
| Backend      | Node.js, Express        |
| Database     | MongoDB (Atlas)         |
| Auth         | JWT + Context API       |


---

## ⚙️ Installation & Running Locally

### 🔧 Prerequisites

- Node.js v20+  
- MongoDB Atlas account

---

### 🖥️ Backend Setup

```bash
cd backend
npm install
Create a .env file:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run backend:

bash
Copy
Edit
npm run dev
🌐 Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
Create .env file:

bash
Copy
Edit
VITE_API_URL=http://localhost:5000/api
Run frontend:

bash
Copy
Edit
npm run dev

