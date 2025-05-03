"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBudgetsByUser = exports.createBudget = void 0;
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
