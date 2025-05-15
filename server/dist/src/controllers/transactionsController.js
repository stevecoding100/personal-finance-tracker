"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransactionController = exports.updateTransactionController = exports.getTransactionController = exports.getTransactionsController = exports.createTransactionController = void 0;
const transactionModel = __importStar(require("../models/transactionModel"));
const cache_1 = require("../utils/cache");
const createTransactionController = async (req, res) => {
    try {
        const transaction = await transactionModel.createTransaction({
            ...req.body,
            user_id: req.user.id,
        });
        await (0, cache_1.invalidateCache)(`transactions:user:${req.user.id}`);
        res.status(201).json(transaction);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createTransactionController = createTransactionController;
const getTransactionsController = async (req, res) => {
    const userId = req.user.id;
    const cacheKey = `transactions:user:${userId}`;
    try {
        const transactions = await (0, cache_1.getOrSetCache)(cacheKey, 3600, () => transactionModel.getTransactionsByUserId(userId));
        res.status(200).json(transactions);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getTransactionsController = getTransactionsController;
const getTransactionController = async (req, res) => {
    try {
        const transactions = await transactionModel.getTransactionById(Number(req.params.id));
        res.status(200).json(transactions);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getTransactionController = getTransactionController;
const updateTransactionController = async (req, res) => {
    try {
        const updatedTransaction = await transactionModel.updateTransaction(Number(req.params.id), req.body);
        await (0, cache_1.invalidateCache)(`transactions:user:${req.user.id}`);
        res.status(200).json(updatedTransaction);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateTransactionController = updateTransactionController;
const deleteTransactionController = async (req, res) => {
    try {
        const result = await transactionModel.deleteTransaction(Number(req.params.id));
        await (0, cache_1.invalidateCache)(`transactions:user:${req.user.id}`);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.deleteTransactionController = deleteTransactionController;
