# 💰 Personal Finance Tracker

A full-stack personal finance tracker that helps users manage their income, expenses, savings goals, and budgets — all in one intuitive dashboard. Built with React, Node.js, PostgreSQL, and Docker.

---

## 🚀 Features

- ✅ User Authentication (JWT)
- 💵 Track Income & Expenses
- 🧾 Categorize Spending (Food, Bills, Rent, etc.)
- 📊 Monthly Dashboard Overview
- 🎯 Set & Track Saving Goals
- 💸 Set Spending Budgets by Category
- 📅 Filter Financial Data by Month
- 📈 Visual Charts (Pie & Bar)
- 🔒 Secure & Responsive Design

---

## 🛠 Tech Stack

### Frontend
- React.js + Redux Toolkit
- Vite or Webpack
- Recharts / Chart.js
- Tailwind CSS
- Jest + React Testing Library

### Backend
- Node.js + Express
- PostgreSQL + Knex.js
- JWT Authentication
- Jest + Supertest

### DevOps
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Deployed with Vercel (frontend) + Render/AWS (backend)

---

## 📁 Folder Structure

personal-finance-tracker/
├── backend/
│ ├── src/ # App logic (controllers, routes, models)
│ └── tests/ # Backend tests
├── frontend/
│ ├── src/ # Components, pages, Redux features
│ └── tests/ # Frontend tests
└── docker-compose.yml


---

## 🧪 Run Locally

### Prerequisites
- Node.js
- Docker & Docker Compose
- PostgreSQL (optional if using Docker)

### Backend Setup

```bash
cd backend
npm install
# Setup .env with DB credentials
npx knex migrate:latest
npm run dev

### Frontend Setup


cd frontend
npm install
npm run dev


### With Docker
docker-compose up --build

#Roadmap


 Auth flow (login/signup)

 Transaction CRUD

 Budgeting System

 Saving Goals Module

 Monthly Dashboard & Charts

 Test Coverage (Backend & Frontend)

 Dockerize & Deploy

 #Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss your idea.
Ensure tests pass and code is linted.

License
MIT License © 2025 Steve De La Rosa


