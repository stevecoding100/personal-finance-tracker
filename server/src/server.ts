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
import redisTestRoutes from "./routes/test";
import dotenv from "dotenv";

dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("combined"));

app.use(
    cors({
        origin: "*", // Allow all origins
        methods: ["GET", "POST", "PUT", "DELETE"], // Allow all methods
        allowedHeaders: "Content-Type, Authorization",
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/goal", goalRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api", redisTestRoutes);

app.listen(3000, () => {
    console.log("App is running on port 3000");
});

export default app;
