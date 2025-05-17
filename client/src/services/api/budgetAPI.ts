import { authorizedFetch } from "../../utils/api";
import { Budget } from "../../types/type";
const API_URL = import.meta.env.VITE_API_URL;

export const fetchBudgets = async (): Promise<Budget[]> => {
    const res = await authorizedFetch(`${API_URL}/budget/budgets`);
    if (!res.ok) throw new Error("Failed to load budgets");
    return res.json();
};

export const createBudget = async (
    budget: Omit<Budget, "id" | "created_at" | "updated_at">
): Promise<Budget> => {
    const res = await authorizedFetch(`${API_URL}/budget/create`, {
        method: "POST",
        body: JSON.stringify(budget),
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

export const updateBudget = async (
    id: number,
    data: Partial<Budget>
): Promise<Budget> => {
    const res = await authorizedFetch(`${API_URL}/budget/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update budget");
    return res.json();
};

export const deleteBudget = async (id: number): Promise<void> => {
    const res = await authorizedFetch(`${API_URL}/budget/delete/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete budget");
};
