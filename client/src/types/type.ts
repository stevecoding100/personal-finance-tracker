export type User = {
    id: number;
    name: string;
    email: string;
};

export type Transaction = {
    id: number;
    category: string;
    amount: number;
    type: "income" | "expense";
    date: string;
    description: string;
};
export type Budget = {
    id: number;
    user_id: number;
    title: string;
    amount_spent: number;
    budget_limit: number;
    category: string;
    created_at: string;
    updated_at: string;
};
export type Saving = {
    id: number;
    user_id: number;
    title: string;
    target_amount: number;
    current_amount: number;
    target_date: string | null;
    created_at: string;
    updated_at: string;
};
