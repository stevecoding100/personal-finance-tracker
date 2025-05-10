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
    amount: number;
    category: string;
    created_at: string;
    updated_at: string;
};
