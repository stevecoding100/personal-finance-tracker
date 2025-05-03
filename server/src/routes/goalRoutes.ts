import { Router } from "express";
import {
    createGoalController,
    getGoalsController,
    updateGoalController,
    deleteGoalController,
} from "../controllers/goalController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticateToken);

router.post("/create", createGoalController);
router.get("/goals", getGoalsController);
router.put("/update/:id", updateGoalController);
router.delete("/delete/:id", deleteGoalController);

export default router;
