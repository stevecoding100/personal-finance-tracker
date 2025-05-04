import { authorizedFetch } from "../../utils/api";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchGoals = async () => {
    const res = await authorizedFetch(`${API_URL}/goal/goals`);
    if (!res.ok) throw new Error("Failed to fetch goals");
    return res.json();
};
export const fetchBudgets = async () => {
    const res = await authorizedFetch(`${API_URL}/budget/budgets`);
    if (!res.ok) throw new Error("Failed to fetch budgets");
    return res.json();
};
export const fetchTransactions = async () => {
    const res = await authorizedFetch(`${API_URL}/transaction/transactions`);
    if (!res.ok) throw new Error("Failed to fetch transactions");
    return res.json();
};
