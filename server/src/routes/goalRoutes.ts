import { Router } from "express";
import { createGoal, getGoals } from "../controllers/goalController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createGoal);
router.get("/goals", authMiddleware, getGoals);

export default router;
