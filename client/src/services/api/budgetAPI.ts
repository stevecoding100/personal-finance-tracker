import { authorizedFetch } from "../../utils/api";
const API_URL = import.meta.env.VITE_API_URL;
import { Budget } from "@/types/type";

export const fetchBudgets = async (page: number, limit: number) => {
    const res = await authorizedFetch(
        `${API_URL}/budget/budgets?page=${page}&limit=${limit}`
    );
    if (!res.ok) throw new Error("Failed to load budgets");
    return res.json();
};

export const createBudget = async (
    data: Omit<Budget, "id" | "created_at" | "updated_at">
): Promise<Budget> => {
    const res = await authorizedFetch(`${API_URL}/budget/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create budget");
    return res.json();
};

// export const fetchBudgetById = async (id: number) => {
//     const res = await authorizedFetch(
//         `${API_URL}/budget/budget/${id}`
//     );
//     if (!res.ok) throw new Error("Failed to load transaction");
//     return res.json();
// };

export const updateBudget = async (id: number, data: Partial<Budget>) => {
    const res = await authorizedFetch(`${API_URL}/budget/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update budget");
    return res.json();
};

export const deleteBudget = async (id: number) => {
    const res = await authorizedFetch(`${API_URL}/budget/delete/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete budget");
    return res.json();
};
