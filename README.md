# CRUD_App
# 🎓 Student CRUD Web Application

A simple full-stack web application to **Create**, **Read**, **Update**, and **Delete** student records — including image uploads. Built using HTML5 + Bootstrap5 on the frontend, and Express.js with a flat JSON file as the backend "database".

---

## 🔧 Tech Stack

- **Frontend**: HTML5, Bootstrap 5
- **Backend**: Node.js, Express.js
- **Data Storage**: Flat JSON file (`data/students.json`)
- **Image Uploads**: Stored as files in `public/uploads/`
- **Authorization**: Simple bearer token protection

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/varunm-23/CRUD_App.git
cd CRUD_App
2. Install Dependencies
bash
npm install

3. Run the Server
bash
node server.js

Authorization
All API routes are protected with a basic token.
You need to send this header in API requests:

makefile
Authorization: Bearer mysecrettoken

Folder Structure
graphql
CRUD_App/
├── data/
│   └── students.json        # JSON file for student data
├── public/
│   ├── index.html           # Frontend UI
│   └── uploads/             # Uploaded student images
├── routes/
│   └── students.js          # API routes for CRUD
├── server.js                # Main Express server
└── README.md                # This file
