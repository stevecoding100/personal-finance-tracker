export type Transaction = {
    id: number;
    category: number;
    amount: number;
    type: "income" | "expense";
    date: string;
    description: string;
};
export type Budget = {
    id: number;
    user_id: number;
    amount: number;
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
