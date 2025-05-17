// src/services/api/transactionAPI.ts

import { authorizedFetch } from "../../utils/api";
import { Transaction } from "../../types/type";

const API_URL = import.meta.env.VITE_API_URL;

export const createTransactionAPI = async (data: Omit<Transaction, "id">) => {
    const res = await authorizedFetch(`${API_URL}/transaction/create`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create transaction");
    return res.json();
};
export const fetchTransactions = async () => {
    const res = await authorizedFetch(`${API_URL}/transaction/transactions`);
    if (!res.ok) throw new Error("Failed to load transactions");
    return res.json();
};

export const fetchTransactionById = async (id: number) => {
    const res = await authorizedFetch(
        `${API_URL}/transaction/transaction/${id}`
    );
    if (!res.ok) throw new Error("Failed to load transaction");
    return res.json();
};

export const updateTransaction = async (
    id: number,
    data: Partial<Transaction>
) => {
    const res = await authorizedFetch(`${API_URL}/transaction/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update transaction");
    return res.json();
};

export const deleteTransaction = async (id: number) => {
    const res = await authorizedFetch(`${API_URL}/transaction/delete/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete transaction");
    return res.json();
};
