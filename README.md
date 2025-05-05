Project Title :- Zidio-Task-Management

Team Members:- 
1) Karishma Kumari
2) Girish Masade
3) Jay Jain
4) Nikhil Sharma

Local Installation Document
Project: MERN Stack Task Management System
Technology Stack: MongoDB, Express.js, React.js (Vite), Node.js

System Requirements
Before starting, ensure you have the following installed on your machine:
Node.js (v16 or higher)


MongoDB (local or use MongoDB Atlas)
Git (optional but helpful)
VS Code or any code editor
Internet connection for installing dependencies



Project Folder Structure
bash
CopyEdit
/project-root
  ├── /client      → React frontend (Vite)
  └── /server      → Express backend


Step-by-Step Installation Guide
1. Clone the Project (if from GitHub)
git clone https://github.com/Girishmasade/task-management-system.git
cd task-management-system


2. Install and Run Backend (Express + MongoDB)
cd server
npm install
This will install all required backend dependencies listed in package.json.
Start the Backend Server:
bash
CopyEdit
npm run start

Your backend server should now be running at: http://localhost:5000

3. Install and Run Frontend (React + Vite)
bash
CopyEdit
cd ../client
npm install

This installs all frontend packages required by your Vite + React app.
Start the Frontend App:
bash
CopyEdit
npm run dev

Your frontend app will run at: http://localhost:3000

Project Flow
Open http://localhost:3000 in your browser.


Register a new user.

Check email and verify with OTP.
Login and access the dashboard.
Admin can create and assign tasks.
Users can view tasks and update statuses (To-Do, In Progress, Completed, Deleted).
Navigate to Chat, Team, and Meet sections.
Dark Mode is enabled by default across the app.



