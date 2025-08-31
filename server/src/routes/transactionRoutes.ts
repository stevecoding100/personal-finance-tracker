import { Router } from "express";
import {
    createTransaction,
    getTransactions,
} from "../controllers/transactionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createTransaction);
router.get("/transactions", authMiddleware, getTransactions);

export default router;
