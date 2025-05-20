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
import { config } from "./config/config";
import dotenv from "dotenv";

dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("combined"));

app.use(
    cors({
        origin: ["https://personal-finance-tracker-lemon-three.vercel.app"],
        credentials: true,
        // origin: "*", // Allow all origins
        methods: ["GET", "POST", "PUT", "DELETE"], // Allow all methods
        allowedHeaders: "Content-Type, Authorization",
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/goal", goalRoutes);
app.use("/api/transaction", transactionRoutes);

const PORT = config.app.port || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
export default app;
