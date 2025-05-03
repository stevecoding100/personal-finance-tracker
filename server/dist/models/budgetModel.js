"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBudget = exports.updateBudget = exports.getBudgetById = exports.getBudgetsByUser = exports.createBudget = void 0;
const db_1 = require("../db/db");
const createBudget = async (budgetData) => {
    const [budget] = await (0, db_1.db)("budgets")
        .insert({
        ...budgetData,
        created_at: new Date(),
        updated_at: new Date(),
    })
        .returning("*");
    return budget;
};
exports.createBudget = createBudget;
const getBudgetsByUser = async (userId) => {
    return (0, db_1.db)("budgets").where({ user_id: userId });
};
exports.getBudgetsByUser = getBudgetsByUser;
const getBudgetById = async (id) => {
    return (0, db_1.db)("budgets").where({ id }).first();
};
exports.getBudgetById = getBudgetById;
const updateBudget = async (id, updates) => {
    const [updatedBudget] = await (0, db_1.db)("budgets")
        .where({ id })
        .update({ ...updates, updated_at: new Date() })
        .returning("*");
    return updatedBudget;
};
exports.updateBudget = updateBudget;
const deleteBudget = async (id) => {
    return (0, db_1.db)("budgets").where({ id }).del();
};
exports.deleteBudget = deleteBudget;
