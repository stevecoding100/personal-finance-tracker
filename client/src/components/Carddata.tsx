import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchTransactions } from "../services/api/transactionAPI";
import { fetchGoals } from "../services/api/savingAPI";
import { fetchBudgets } from "../services/api/budgetAPI";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Carddata() {
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
    // Grab the most recent transaction regardless of type
    const mostRecentTx = transactions[transactions.length - 1];

    // Compute total balance
    const incomeTotal = transactions
        .filter((tx) => tx.type === "income")
        .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

    const expenseTotal = transactions
        .filter((tx) => tx.type === "expense")
        .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

    const balance = incomeTotal - expenseTotal;

    // Determine if the most recent transaction was income or expense
    const isIncome = mostRecentTx.type === "income";
    const changeDirection = isIncome ? "increase" : "decrease";
    const changeAmount = parseFloat(mostRecentTx?.amount || "0");

    const stats = [
        {
            id: 1,
            name: "Current Balance",
            stat: `$${balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`,
            icon: CurrencyDollarIcon,
            change: `$${changeAmount.toFixed(2)}`,
            changeType: changeDirection,
        },
    ];

    return (
        <div className="p-4">
            <div className="mx-auto max-w-4xl px-4 max-lg:text-center lg:max-w-7xl lg:px-8 mb-24 xl:ml-2">
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-950 sm:text-6xl lg:text-pretty">
                    Welcome, <span className="ml-2">{user?.name} 👋</span>
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-lg font-medium text-gray-600 max-lg:mx-auto sm:text-xl/8">
                    Here’s a quick snapshot of your financial health. Track your
                    spending, monitor your progress, and stay on top of your
                    goals—all in one place.
                </p>
            </div>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                    <div
                        key={item.id}
                        className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
                    >
                        <dt>
                            <div className="absolute rounded-md bg-indigo-500 p-3">
                                <item.icon
                                    aria-hidden="true"
                                    className="size-6 text-white"
                                />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">
                                {item.name}
                            </p>
                        </dt>

                        <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                            <p className="text-2xl font-semibold text-gray-900">
                                {item.stat}
                            </p>
                            <p
                                className={classNames(
                                    item.changeType === "increase"
                                        ? "text-green-600"
                                        : "text-red-600",
                                    "ml-2 flex items-baseline text-sm font-semibold"
                                )}
                            >
                                {item.changeType === "increase" ? (
                                    <ArrowUpIcon
                                        aria-hidden="true"
                                        className="size-5 shrink-0 self-center text-green-500"
                                    />
                                ) : (
                                    <ArrowDownIcon
                                        aria-hidden="true"
                                        className="size-5 shrink-0 self-center text-red-500"
                                    />
                                )}

                                <span className="sr-only">
                                    {item.changeType === "increase"
                                        ? "Increased"
                                        : "Decreased"}
                                    by
                                </span>
                                {item.change}
                            </p>
                            <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                <div className="text-sm">
                                    <Link
                                        to="/transactions"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        View all
                                        <span className="sr-only">
                                            {item.name} stats
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
