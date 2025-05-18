"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.getTransactionById = exports.getTransactionsByUserId = exports.createTransaction = void 0;
const db_1 = require("../db/db");
// Create a transaction
const createTransaction = async (transactionData) => {
    try {
        const newTransaction = await (0, db_1.db)("transactions")
            .insert(transactionData)
            .returning("*");
        return newTransaction[0];
    }
    catch (error) {
        throw new Error(`Error creating transaction: ${error.message}`);
    }
};
exports.createTransaction = createTransaction;
// Get all transactions for a user
const getTransactionsByUserId = async (userId) => {
    try {
        const transactions = await (0, db_1.db)("transactions").where("user_id", userId);
        return transactions;
    }
    catch (error) {
        throw new Error(`Error fetching transactions: ${error.message}`);
    }
};
exports.getTransactionsByUserId = getTransactionsByUserId;
// Get transaction by Id
const getTransactionById = async (id) => {
    try {
        if (!id) {
            throw new Error("No transaction found");
        }
        const transactions = await (0, db_1.db)("transactions").where("id", id);
        return transactions;
    }
    catch (error) {
        throw new Error(`Error fetching transactions: ${error.message}`);
    }
};
exports.getTransactionById = getTransactionById;
// Update a transaction
const updateTransaction = async (id, transactionData) => {
    try {
        const updatedTransaction = await (0, db_1.db)("transactions")
            .where("id", id)
            .update(transactionData)
            .returning("*");
        return updatedTransaction[0];
    }
    catch (error) {
        throw new Error(`Error updating transaction: ${error.message}`);
    }
};
exports.updateTransaction = updateTransaction;
// Delete a transaction
const deleteTransaction = async (id) => {
    try {
        await (0, db_1.db)("transactions").where("id", id).del();
        return { message: "Transaction deleted successfully" };
    }
    catch (error) {
        throw new Error(`Error deleting transaction: ${error.message}`);
    }
};
exports.deleteTransaction = deleteTransaction;
