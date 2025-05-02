# 💰 Personal Finance Tracker

A full-stack personal finance tracker that helps users manage their income, expenses, savings goals, and budgets — all in one intuitive dashboard. Built with React, Node.js, PostgreSQL, and Docker.

---

## 🚀 Features

-   ✅ User Authentication (JWT)
-   💵 Track Income & Expenses
-   🧾 Categorize Spending (Food, Bills, Rent, etc.)
-   📊 Monthly Dashboard Overview
-   🎯 Set & Track Saving Goals
-   💸 Set Spending Budgets by Category
-   📅 Filter Financial Data by Month
-   📈 Visual Charts (Pie & Bar)
-   🔒 Secure & Responsive Design

---

## 🛠 Tech Stack

### Frontend

-   React.js + Redux Toolkit
-   Vite or Webpack
-   Recharts / Chart.js
-   Tailwind CSS
-   Jest + React Testing Library

### Backend

-   Node.js + Express
-   PostgreSQL + Knex.js
-   JWT Authentication
-   Jest + Supertest

### DevOps

-   Docker & Docker Compose
-   GitHub Actions (CI/CD)
-   Deployed with Vercel (frontend) + Render/AWS (backend)

---

## 📁 Folder Structure

```bash
personal-finance-tracker/
├── server/
│ ├── src/ # App logic (controllers, routes, models)
│ └── tests/ # Backend tests
├── client/
│ ├── src/ # Components, pages, Redux features
│ └── tests/ # Frontend tests
└── docker-compose.yml
```

---

## 🧪 Run Locally

### Prerequisites

-   Node.js
-   Docker & Docker Compose
-   PostgreSQL (optional if using Docker)

## Frontend Setup

-   cd client
-   npm install
-   npm run dev

## With Docker

-   docker-compose up --build

### Backend Setup

```bash
cd server
npm install
# Setup .env with DB credentials
npx knex migrate:latest
npm run dev
```
