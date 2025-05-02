import { db } from "../db/db";

export interface Transaction {
    id: number;
    user_id: number;
    amount: number;
    description: string;
    category: string;
    created_at: Date;
    updated_at: Date;
}

// Create a transaction
export const createTransaction = async (
    transactionData: Omit<Transaction, "id" | "created_at" | "updated_at">
) => {
    try {
        const newTransaction = await db<Transaction>("transactions")
            .insert({
                ...transactionData,
                created_at: new Date(),
                updated_at: new Date(),
            })
            .returning("*");
        return newTransaction[0];
    } catch (error: any) {
        throw new Error(`Error creating transaction: ${error.message}`);
    }
};

// Get all transactions for a user
export const getTransactionsByUserId = async (userId: number) => {
    try {
        const transactions = await db<Transaction>("transactions").where(
            "user_id",
            userId
        );
        return transactions;
    } catch (error: any) {
        throw new Error(`Error fetching transactions: ${error.message}`);
    }
};

// Update a transaction
export const updateTransaction = async (
    id: number,
    transactionData: Partial<Transaction>
) => {
    try {
        const updatedTransaction = await db<Transaction>("transactions")
            .where("id", id)
            .update({ ...transactionData, updated_at: new Date() })
            .returning("*");
        return updatedTransaction[0];
    } catch (error: any) {
        throw new Error(`Error updating transaction: ${error.message}`);
    }
};

// Delete a transaction
export const deleteTransaction = async (id: number) => {
    try {
        await db<Transaction>("transactions").where("id", id).del();
        return { message: "Transaction deleted successfully" };
    } catch (error: any) {
        throw new Error(`Error deleting transaction: ${error.message}`);
    }
};
