# 💰 NeoBank Dashboard

A secure full-stack **NeoBank** application built with **React (frontend)** and **Spring Boot (backend)**.  
It enables users to register, log in, view their account balance, and perform credit/debit transactions with JWT-based authentication.

---

## 🛠️ Tech Stack

- ⚛️ Frontend: **React**, Tailwind CSS
- ☕ Backend: **Spring Boot**, Java
- 🐘 Database: **PostgreSQL**
- 🔐 Authentication: **JWT (JSON Web Token)**

---

## 🚀 Features

- ✅ User Registration & Login
- 🔐 JWT-based Secure Authentication
- 💳 View Account Balance
- ➕ Credit / ➖ Debit Transactions
- 📜 Transaction History with Timestamps
- ⚙️ REST API integration

---

## 📁 Project Structure

neo-bank-dashboard/
├── client/ # React frontend
├── demo/demo/ # Spring Boot backend
└── README.md

📦 How to Run Locally
To run the NeoBank Dashboard locally, follow these steps for both the backend (Spring Boot) and frontend (React).

🧩 Prerequisites
Make sure the following are installed:

Java 17+
Maven
Node.js & npm
PostgreSQL

1️⃣ Setup & Start PostgreSQL
1)Create a database named neobank
2)Update the credentials (username & password) in the file:

demo/demo/src/main/resources/application.properties

spring.datasource.url=jdbc:postgresql://localhost:5432/neobank
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update

2️⃣ Run the Backend (Spring Boot)
cd demo/demo         # Navigate to backend directory
mvn spring-boot:run  # Start Spring Boot backend

It will start the backend at:
http://localhost:8080

3️⃣ Run the Frontend (React)
Open another terminal and run:
cd client           # Navigate to frontend directory
npm install         # Install dependencies
npm start           # Start the React development server

The React app will run at:
http://localhost:3000

🧪 Test the App
-Register a new user
-Log in with the credentials
-Access the dashboard
-View balance, add credit/debit transactions
-See updated history and real-time balance







