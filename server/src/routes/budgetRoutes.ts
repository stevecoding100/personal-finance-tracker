import { Router } from "express";
import {
    createBudgetController,
    getBudgetsController,
    updateBudgetController,
    deleteBudgetController,
} from "../controllers/budgetController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticateToken);

router.post("/create", authenticateToken, createBudgetController);
router.get("/budgets", authenticateToken, getBudgetsController);
router.put("/update/:id", authenticateToken, updateBudgetController);
router.delete("/delete/:id", authenticateToken, deleteBudgetController);

export default router;
