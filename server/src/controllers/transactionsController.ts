import { Request, Response } from "express";
import * as transactionModel from "../models/transactionModel";

export const createTransactionController = async (
    req: Request,
    res: Response
) => {
    try {
        const transaction = await transactionModel.createTransaction({
            ...req.body,
            user_id: req.user!.id,
        });

        res.status(201).json(transaction);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getTransactionsController = async (
    req: Request,
    res: Response
) => {
    const userId = req.user!.id;
    const cacheKey = `transactions:user:${userId}`;

    try {
        const transactions = await transactionModel.getTransactionsByUserId(
            userId
        );

        res.status(200).json(transactions);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getTransactionController = async (req: Request, res: Response) => {
    try {
        const transactions = await transactionModel.getTransactionById(
            Number(req.params.id)
        );
        res.status(200).json(transactions);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateTransactionController = async (
    req: Request,
    res: Response
) => {
    try {
        const updatedTransaction = await transactionModel.updateTransaction(
            Number(req.params.id),
            req.body
        );

        res.status(200).json(updatedTransaction);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteTransactionController = async (
    req: Request,
    res: Response
) => {
    try {
        const result = await transactionModel.deleteTransaction(
            Number(req.params.id)
        );
        res.status(200).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};
