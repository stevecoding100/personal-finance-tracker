import { authorizedFetch } from "../../utils/api";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchBudgets = async () => {
    const res = await authorizedFetch(`${API_URL}/budget/budgets`);
    if (!res.ok) throw new Error("Failed to fetch budgets");
    return res.json();
};
