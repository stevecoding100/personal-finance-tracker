import { Router } from "express";
import {
    registerController,
    loginController,
    getMeController,
} from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", authenticateToken, getMeController);

export default router;
