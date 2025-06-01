import { useEffect, useState } from "react";
import { fetchTransactions } from "@/services/transactionAPI";
import { Transaction } from "@/types/type";
import { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

const BarChart = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const txs = await fetchTransactions();
                setTransactions(txs);
            } catch (err) {
                console.error(err);
                setError("Failed to load transactions.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <p>Loading charts...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // Filter for expenses only
    const expenseTransactions = transactions.filter(
        (tx) => tx.type === "expense"
    );

    // Group expenses by category
    const categoryTotals: Record<string, number> = {};
    expenseTransactions.forEach((tx) => {
        const category = tx.category || "Uncategorized";
        categoryTotals[category] =
            (categoryTotals[category] || 0) + Number(tx.amount);
    });

    const labels = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);

    const barData = {
        labels,
        datasets: [
            {
                label: "Expenses by Category",
                data: values,
                backgroundColor: "#FFA500",
                borderRadius: 6,
            },
        ],
    };
    const barOptions: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Expenses by Category (Bar)",
            },
        },
        scales: {
            y: {
                type: "linear",
                beginAtZero: true,
                ticks: {
                    callback: function (value: number | string) {
                        return `$${Number(value).toLocaleString()}`;
                    },
                },
            },
            x: {
                type: "category",
            },
        },
    };

    return (
        <div className="space-y-10 w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">
                Expenses Breakdown
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <Bar data={barData} options={barOptions} />
            </div>
        </div>
    );
};

export default BarChart;
