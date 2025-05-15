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
exports.deleteBudgetController = exports.updateBudgetController = exports.getBudgetsController = exports.createBudgetController = void 0;
const budgetService = __importStar(require("../services/budgetService"));
const cache_1 = require("../utils/cache");
const createBudgetController = async (req, res) => {
    try {
        const budget = await budgetService.createBudget({
            ...req.body,
            user_id: req.user.id,
        });
        await (0, cache_1.invalidateCache)(`budgets:user:${req.user.id}`); // Invalidate cache
        res.status(201).json(budget);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createBudgetController = createBudgetController;
const getBudgetsController = async (req, res) => {
    const userId = req.user.id;
    const cacheKey = `budgets:user:${userId}`;
    try {
        const budgets = await (0, cache_1.getOrSetCache)(cacheKey, 3600, () => budgetService.getBudgetById(userId));
        res.status(200).json(budgets);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getBudgetsController = getBudgetsController;
const updateBudgetController = async (req, res) => {
    try {
        const updatedBudget = await budgetService.updateBudget(Number(req.params.id), req.body);
        await (0, cache_1.invalidateCache)(`budgets:user:${req.user.id}`); // Invalidate cache
        res.status(200).json(updatedBudget);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateBudgetController = updateBudgetController;
const deleteBudgetController = async (req, res) => {
    try {
        await budgetService.deleteBudget(Number(req.params.id));
        await (0, cache_1.invalidateCache)(`budgets:user:${req.user.id}`); // Invalidate cache
        res.status(200).json({ message: "Budget deleted successfully" });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.deleteBudgetController = deleteBudgetController;
