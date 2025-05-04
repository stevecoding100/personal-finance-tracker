import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
    fetchTransactions,
    fetchGoals,
    fetchBudgets,
} from "../features/dashboard/dashboardAPI";

const Dashboard = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [txs, gs, bs] = await Promise.all([
                    fetchTransactions(),
                    fetchGoals(),
                    fetchBudgets(),
                ]);
                setTransactions(txs);
                setGoals(gs);
                setBudgets(bs);
            } catch (err) {
                console.error(err);
                setError("Failed to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    if (loading) return <p className="p-4">Loading dashboard...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>

            <section>
                <h2 className="text-xl font-semibold mb-2">
                    Recent Transactions
                </h2>
                <ul className="bg-white p-4 rounded shadow">
                    {transactions.map((tx: any) => (
                        <li key={tx.id} className="border-b py-2">
                            {tx.description} - ${tx.amount}
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Your Goals</h2>
                <ul className="bg-white p-4 rounded shadow">
                    {goals.map((goal: any) => (
                        <li key={goal.id}>
                            {goal.title}: ${goal.current_amount} / $
                            {goal.target_amount}
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Budget Overview</h2>
                <ul className="bg-white p-4 rounded shadow">
                    {budgets.map((budget: any) => (
                        <li key={budget.id}>
                            {budget.category}: Limit ${budget.amount}: Date
                            {budget.month}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;
