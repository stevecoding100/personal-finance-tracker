import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/transactions", transactionRoutes);

// // Database connection
// connectDB();

// Default route
app.get("/", (req, res) => {
    res.send("Personal Finance Tracker API");
});

export default app;
