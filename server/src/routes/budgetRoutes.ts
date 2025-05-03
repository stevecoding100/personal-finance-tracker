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

router.post("/create", createBudgetController);
router.get("/budgets", getBudgetsController);
router.put("/update/:id", updateBudgetController);
router.delete("/delete/:id", deleteBudgetController);

export default router;
