import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBudgets } from "../../services/budgetAPI";
import { Budget } from "@/types/type";

const BudgetSummary = () => {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadBudgets = async () => {
            try {
                const data = await fetchBudgets();
                setBudgets(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load budgets.");
            } finally {
                setLoading(false);
            }
        };

        loadBudgets();
    }, []);

    console.log("Mybudget:", budgets);

    if (loading) return <p>Loading budget summary...</p>;
    if (error) return <p className="text-red-700">{error}</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-5">Budget Summary</h2>
            <div className="space-y-5">
                {budgets.map((budget) => {
                    const rawPercentSpent =
                        (budget.amount_spent / budget.budget_limit) * 100;
                    const barColor =
                        rawPercentSpent > 100
                            ? "bg-red-700"
                            : rawPercentSpent === 100
                            ? "bg-green-700"
                            : rawPercentSpent >= 75
                            ? "bg-yellow-600"
                            : "bg-green-700";

                    return (
                        <div
                            key={budget.id}
                            className="bg-white p-4 rounded-lg shadow border border-gray-100"
                        >
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">
                                    {budget.category}
                                </span>
                                <span className="text-sm text-gray-500">
                                    $
                                    {Number(
                                        budget.amount_spent
                                    ).toLocaleString()}{" "}
                                    / $
                                    {Number(
                                        budget.budget_limit
                                    ).toLocaleString()}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full ${barColor}`}
                                    style={{
                                        width: `${Math.min(
                                            rawPercentSpent,
                                            100
                                        )}%`,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="w-full flex justify-center">
                <Link
                    to={"/dashboard/budgets"}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    <button
                        type="button"
                        className="rounded bg-indigo-600 px-2 py-2 mt-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        View All
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BudgetSummary;
