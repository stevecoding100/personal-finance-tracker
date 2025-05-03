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

router.post("/create", createTransactionController);
router.get("/transactions", getTransactionsController);
router.get("/transaction/:id", getTransactionController);
router.put("/update/:id", updateTransactionController);
router.delete("/delete/:id", deleteTransactionController);

export default router;
