import { Router } from "express";
import {
    createGoalController,
    getGoalsController,
    getGoalController,
    updateGoalController,
    deleteGoalController,
} from "../controllers/goalController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticateToken);

router.post("/create", authenticateToken, createGoalController);
router.get("/goals", authenticateToken, getGoalsController);
router.get("/goal/:id", authenticateToken, getGoalController);
router.put("/update/:id", authenticateToken, updateGoalController);
router.delete("/delete/:id", authenticateToken, deleteGoalController);

export default router;
