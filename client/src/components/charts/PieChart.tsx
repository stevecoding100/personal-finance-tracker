import { useEffect, useState } from "react";
import { fetchTransactions } from "@/services/transactionAPI";
import { Transaction } from "@/types/type";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type PieProps = {
    month: string;
    year: string;
};

const PieChart = ({ month, year }: PieProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const txs = await fetchTransactions();
                // Filter transactions based on the selected month and year.
                // Assumes that each transaction has a 'date' property in a format that can be parsed by `new Date()`.
                const filteredTxs = txs.filter((tx: Transaction) => {
                    const txDate = new Date(tx.date);
                    return (
                        txDate.getMonth() === parseInt(month) &&
                        txDate.getFullYear() === parseInt(year)
                    );
                });
                setTransactions(filteredTxs);
            } catch (err) {
                console.error(err);
                setError("Failed to load transactions.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <p>Loading chart...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const incomeTransactions = transactions.filter(
        (tx) => tx.type === "income"
    );

    const totalIncome = incomeTransactions.reduce(
        (sum, tx) => sum + Number(tx.amount),
        0
    );

    const categoryMap: Record<string, number> = {};

    incomeTransactions.forEach((tx) => {
        const category = tx.category || "Uncategorized";
        categoryMap[category] =
            (categoryMap[category] || 0) + Number(tx.amount);
    });

    const pieData = {
        labels: Object.keys(categoryMap),
        datasets: [
            {
                label: "Income by Category",
                data: Object.values(categoryMap),
                backgroundColor: [
                    "#4F46E5",
                    "#10B981",
                    "#F59E0B",
                    "#EF4444",
                    "#3B82F6",
                    "#8B5CF6",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Income Breakdown
            </h2>
            <p className="mb-6 text-gray-600 text-center">
                Total Income:
                <span className="font-bold text-gray-800">
                    $
                    {totalIncome.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>
            </p>
            <Pie data={pieData} />
        </div>
    );
};

export default PieChart;
