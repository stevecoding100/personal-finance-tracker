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
exports.deleteBudget = exports.updateBudget = exports.getBudgetById = exports.getBudgetsByUser = exports.createBudget = void 0;
const budgetModel = __importStar(require("../models/budgetModel"));
// Create a new budget
const createBudget = async (budgetData) => {
    return await budgetModel.createBudget(budgetData);
};
exports.createBudget = createBudget;
// Get all budgets for a user
const getBudgetsByUser = async (userId) => {
    return await budgetModel.getBudgetsByUser(userId);
};
exports.getBudgetsByUser = getBudgetsByUser;
// Get a single budget by ID (optional if used in future)
const getBudgetById = async (id) => {
    return await budgetModel.getBudgetById(id);
};
exports.getBudgetById = getBudgetById;
// Update a budget
const updateBudget = async (id, updates) => {
    return await budgetModel.updateBudget(id, updates);
};
exports.updateBudget = updateBudget;
// Delete a budget
const deleteBudget = async (id) => {
    return await budgetModel.deleteBudget(id);
};
exports.deleteBudget = deleteBudget;
