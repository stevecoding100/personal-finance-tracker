import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
    CurrencyDollarIcon,
    CalculatorIcon,
    BanknotesIcon,
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchTransactions } from "../services/api/transactionAPI";
import { fetchGoals } from "../services/api/savingAPI";
import { fetchBudgets } from "../services/api/budgetAPI";
import BarChart from "./BarChart";
import { Saving, Transaction, Budget } from "@/types/type";
function classNames(...classes: (string | boolean | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Carddata() {
    const user = useSelector((state: RootState) => state.auth.user);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [goals, setGoals] = useState<Saving[]>([]);
    const [budgets, setBudgets] = useState<Budget[]>([]);
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
        .filter((tx: Transaction) => tx.type === "income")
        .reduce((sum: number, tx: Transaction) => sum + Number(tx.amount), 0);

    const expenseTotal = transactions
        .filter((tx: Transaction) => tx.type === "expense")
        .reduce((sum: number, tx: Transaction) => sum + Number(tx.amount), 0);

    const balance = incomeTotal - expenseTotal;
    console.log(balance);

    // Determine if the most recent transaction was income or expense
    const isIncome = mostRecentTx?.type === "income";
    const changeDirection = isIncome
        ? "increase"
        : mostRecentTx
        ? "decrease"
        : "";
    const changeAmount = mostRecentTx?.amount ?? 0;

    const totalBudgetCurrent = Array.isArray(budgets)
        ? budgets.reduce((sum, b) => sum + Number(b?.amount || 0), 0)
        : 0;

    const totalGoalCurrent = Array.isArray(goals)
        ? goals.reduce((sum, g) => sum + Number(g?.current_amount || 0), 0)
        : 0;

    const stats = [
        {
            id: 1,
            name: "Current Balance",
            stat: `$${balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`,
            icon: CurrencyDollarIcon,
            change: `$${changeAmount}`,
            changeType: changeDirection,
            link: "/dashboard/transactions",
        },
        {
            id: 2,
            name: "Total Budget",
            stat: `$${totalBudgetCurrent} `,
            icon: CalculatorIcon,
            change: "",
            changeType: "",
            link: "/dashboard/budgets",
        },
        {
            id: 3,
            name: "Total Savings",
            stat: `$${totalGoalCurrent.toFixed(2)}`,
            icon: BanknotesIcon,
            change: "",
            changeType: "",
            link: "/dashboard/savings",
        },
    ];

    // Example dataset from goals
    const goalLabels = goals.map((goal) => goal.title);
    const goalValues = goals.map((goal) => goal.current_amount);

    // Example dataset from budgets
    const budgetLabels = Array.isArray(budgets)
        ? budgets.map((b) => b.category)
        : [];
    const budgetValues = Array.isArray(budgets)
        ? budgets.map((b) => b.amount)
        : [];

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
                                {item.changeType !== "" &&
                                    (item.changeType === "increase" ? (
                                        <ArrowUpIcon
                                            aria-hidden="true"
                                            className="size-5 shrink-0 self-center text-green-500"
                                        />
                                    ) : (
                                        <ArrowDownIcon
                                            aria-hidden="true"
                                            className="size-5 shrink-0 self-center text-red-500"
                                        />
                                    ))}

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
                                        to={item.link}
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
            <div className="my-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Goals Overview
                </h2>
                <BarChart
                    title="Current Goal Savings"
                    labels={goalLabels}
                    data={goalValues}
                    label="Saved Amount ($)"
                    color="#10b981" // emerald-500
                />
            </div>

            <div className="my-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Budgets Overview
                </h2>
                <BarChart
                    title="Current Budget Allocations"
                    labels={budgetLabels}
                    data={budgetValues}
                    label="Budgeted Amount ($)"
                    color="#3b82f6" // blue-500
                />
            </div>
        </div>
    );
}
