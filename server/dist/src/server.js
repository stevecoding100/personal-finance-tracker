"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const budgetRoutes_1 = __importDefault(require("./routes/budgetRoutes"));
const goalRoutes_1 = __importDefault(require("./routes/goalRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("combined"));
app.use(cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow all methods
    allowedHeaders: "Content-Type, Authorization",
}));
app.use("/api/auth", authRoutes_1.default);
app.use("/api/budget", budgetRoutes_1.default);
app.use("/api/goal", goalRoutes_1.default);
app.use("/api/transaction", transactionRoutes_1.default);
app.listen(3000, () => {
    console.log("App is running on port 3000");
});
exports.default = app;
