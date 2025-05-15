"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGoalAmount = exports.getGoalById = exports.getGoalsByUser = exports.createGoal = void 0;
const db_1 = require("../db/db");
const createGoal = async (goalData) => {
    const [goal] = await (0, db_1.db)("goals")
        .insert({
        ...goalData,
        created_at: new Date(),
        updated_at: new Date(),
    })
        .returning("*");
    return goal;
};
exports.createGoal = createGoal;
const getGoalsByUser = async (userId) => {
    return (0, db_1.db)("goals").where({ user_id: userId });
};
exports.getGoalsByUser = getGoalsByUser;
const getGoalById = async (id) => {
    return (0, db_1.db)("goals").where({ id: id });
};
exports.getGoalById = getGoalById;
const updateGoalAmount = async (goalId, amount) => {
    const [goal] = await (0, db_1.db)("goals")
        .where({ id: goalId })
        .update({ current_amount: amount, updated_at: new Date() }, ["*"]);
    return goal;
};
exports.updateGoalAmount = updateGoalAmount;
