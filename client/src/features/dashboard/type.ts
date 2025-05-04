export interface Transaction {
    id: number;
    description: string;
    amount: number;
    category: string;
    date: string;
}

export interface Goal {
    id: number;
    title: string;
    targetAmount: number;
    currentAmount: number;
}
