const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");
import authRoutes from "./routes/authRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import goalRoutes from "./routes/goalRoutes";
import transactionRoutes from "./routes/transactionRoutes";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/transactions", transactionRoutes);

app.listen(3000, () => {
    console.log("App is running on port 3000");
});

export default app;
