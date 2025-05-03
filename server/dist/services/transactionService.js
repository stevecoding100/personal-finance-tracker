"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlySummary = exports.getTransactionById = exports.getTransactionsByUser = exports.addTransaction = void 0;
const db_1 = require("../db/db");
const addTransaction = async (transactionData) => {
    const [transaction] = await (0, db_1.db)("transactions")
        .insert({
        ...transactionData,
        created_at: new Date(),
        updated_at: new Date(),
    })
        .returning("*");
    return transaction;
};
exports.addTransaction = addTransaction;
const getTransactionsByUser = async (userId) => {
    return (0, db_1.db)("transactions")
        .where({ user_id: userId })
        .orderBy("date", "desc");
};
exports.getTransactionsByUser = getTransactionsByUser;
const getTransactionById = async (id) => {
    return (0, db_1.db)("transactions")
        .where({ id: id })
        .orderBy("date", "desc");
};
exports.getTransactionById = getTransactionById;
const getMonthlySummary = async (userId, month) => {
    return (0, db_1.db)("transactions")
        .select("type")
        .sum("amount as total")
        .where({ user_id: userId })
        .andWhere("date", "like", `${month}%`)
        .groupBy("type");
};
exports.getMonthlySummary = getMonthlySummary;
