import { Router } from "express";
import { createBudget, getBudgets } from "../controllers/budgetController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createBudget);
router.get("/budgets", authMiddleware, getBudgets);

export default router;
