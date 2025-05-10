export type Transaction = {
    id: number;
    category: string;
    amount: number;
    type: "income" | "expense";
    date: string;
    description: string;
};
