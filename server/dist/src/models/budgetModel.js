"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBudget = exports.updateBudget = exports.getBudgetById = exports.getBudgetsByUser = exports.createBudget = void 0;
const db_1 = require("../db/db");
// Create a budget
const createBudget = async (budgetData) => {
    try {
        const newBudget = await (0, db_1.db)("budgets")
            .insert(budgetData)
            .returning("*");
        return newBudget[0];
    }
    catch (error) {
        throw new Error(`Error creating budget: ${error.message}`);
    }
};
exports.createBudget = createBudget;
// Get all budgets for a user
const getBudgetsByUser = async (userId) => {
    try {
        const budgets = await (0, db_1.db)("budgets").where("user_id", userId);
        return budgets;
    }
    catch (error) {
        throw new Error(`Error fetching budgets: ${error.message}`);
    }
};
exports.getBudgetsByUser = getBudgetsByUser;
// Get a single budget
const getBudgetById = async (id) => {
    try {
        const budget = await (0, db_1.db)("budgets").where("id", id).first();
        if (!budget) {
            throw new Error("No budget found");
        }
        return budget;
    }
    catch (error) {
        throw new Error(`Error fetching budget: ${error.message}`);
    }
};
exports.getBudgetById = getBudgetById;
// Update a goal
const updateBudget = async (id, budgetData) => {
    try {
        const updatedBudget = await (0, db_1.db)("budgets")
            .where("id", id)
            .update(budgetData)
            .returning("*");
        return updatedBudget[0];
    }
    catch (error) {
        throw new Error(`Error updating budget: ${error.message}`);
    }
};
exports.updateBudget = updateBudget;
// Delete a goal
const deleteBudget = async (id) => {
    try {
        await (0, db_1.db)("budgets").where("id", id).del();
        return { message: "Budget deleted successfully" };
    }
    catch (error) {
        throw new Error(`Error deleting budget: ${error.message}`);
    }
};
exports.deleteBudget = deleteBudget;
