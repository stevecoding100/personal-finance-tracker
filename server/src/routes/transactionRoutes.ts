import { Router } from "express";
import {
    createTransactionController,
    getTransactionsController,
    updateTransactionController,
    deleteTransactionController,
} from "../controllers/transactionsController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticateToken);

router.post("/create", createTransactionController);
router.get("/transactions", getTransactionsController);
router.put("/update/:id", updateTransactionController);
router.delete("/delete/:id", deleteTransactionController);

export default router;
