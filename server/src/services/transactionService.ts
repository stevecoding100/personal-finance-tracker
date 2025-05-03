import { db } from "../db/db";

interface Transaction {
    id?: number;
    user_id: number;
    type: "income" | "expense";
    amount: number;
    category: string;
    note?: string;
    date: string;
    created_at?: Date;
    updated_at?: Date;
}

export const addTransaction = async (transactionData: Transaction) => {
    const [transaction] = await db<Transaction>("transactions")
        .insert({
            ...transactionData,
            created_at: new Date(),
            updated_at: new Date(),
        })
        .returning("*");
    return transaction;
};
export const getTransactionsByUser = async (userId: number) => {
    return db<Transaction>("transactions")
        .where({ user_id: userId })
        .orderBy("date", "desc");
};

export const getTransactionById = async (id: number) => {
    return db<Transaction>("transactions")
        .where({ id: id })
        .orderBy("date", "desc");
};

export const getMonthlySummary = async (userId: number, month: string) => {
    return db<Transaction>("transactions")
        .select("type")
        .sum("amount as total")
        .where({ user_id: userId })
        .andWhere("date", "like", `${month}%`)
        .groupBy("type");
};
