import { authorizedFetch } from "../../utils/api";
import { Saving } from "../../types/type";
const API_URL = import.meta.env.VITE_API_URL;

// Fetch all goals
export const fetchGoals = async (): Promise<Saving[]> => {
    const res = await authorizedFetch(`${API_URL}/api/goal/goals`);
    if (!res.ok) throw new Error("Failed to fetch goals");
    return res.json();
};

// Fetch a single goal by ID
export const fetchGoal = async (id: number): Promise<Saving> => {
    const res = await authorizedFetch(`${API_URL}/api/goal/goal/${id}`);
    if (!res.ok) throw new Error("Failed to fetch goal");
    return res.json();
};

// Create a new goal
export const createGoal = async (
    goal: Omit<Saving, "id" | "created_at" | "updated_at">
): Promise<Saving> => {
    const res = await authorizedFetch(`${API_URL}/api/goal/create`, {
        method: "POST",
        body: JSON.stringify(goal),
    });
    if (!res.ok) throw new Error("Failed to create goal");
    return res.json();
};

// Update an existing goal
export const updateGoal = async (
    id: number,
    data: Partial<Saving>
): Promise<Saving> => {
    const res = await authorizedFetch(`${API_URL}/api/goal/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update goal");
    return res.json();
};

// Delete a goal
export const deleteGoal = async (id: number): Promise<void> => {
    const res = await authorizedFetch(`${API_URL}/api/goal/delete/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete goal");
};
