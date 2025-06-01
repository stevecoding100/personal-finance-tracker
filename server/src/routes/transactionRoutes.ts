import { Router } from "express";
import {
    createTransactionController,
    getTransactionsController,
    updateTransactionController,
    getTransactionController,
    deleteTransactionController,
} from "../controllers/transactionsController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticateToken);

router.post("/create", authenticateToken, createTransactionController);
router.get("/transactions", authenticateToken, getTransactionsController);
router.get("/transaction/:id", authenticateToken, getTransactionController);
router.put("/update/:id", authenticateToken, updateTransactionController);
router.delete("/delete/:id", authenticateToken, deleteTransactionController);

export default router;
