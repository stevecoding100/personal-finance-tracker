import { CalculatorIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { fetchTransactions } from "../../services/transactionAPI";
import { Transaction } from "@/types/type";

type ExpenseSummaryProps = {
    month: string;
    year: string;
};

export default function ExpenseSummary({ month, year }: ExpenseSummaryProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTransactionData = async () => {
            try {
                const [txs] = await Promise.all([fetchTransactions()]);
                setTransactions(txs);
            } catch (err) {
                console.error(err);
                setError("Failed to load transactions data.");
            } finally {
                setLoading(false);
            }
        };

        loadTransactionData();
    }, []);

    useEffect(() => {
        const loadTransactionData = async () => {
            setLoading(true);
            try {
                // Fetch all transactions from your API
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
                setError("Failed to load transactions data.");
            } finally {
                setLoading(false);
            }
        };

        loadTransactionData();
    }, [month, year]);

    // Compute total balance
    const expenseTotal = transactions
        .filter((tx: Transaction) => tx.type === "expense")
        .reduce((sum: number, tx: Transaction) => sum + Number(tx.amount), 0);

    const stats = [
        {
            id: 2,
            name: "Expenses",
            stat: `$${expenseTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })} `,
            icon: CalculatorIcon,
            change: "",
            changeType: "",
            // link: "/dashboard/budgets",
        },
    ];
    if (loading) return <p className="p-4">Loading Expenses...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;
    return (
        <dl>
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
                        <p className="text-2xl font-semibold text-red-700">
                            {item.stat}
                        </p>
                        {/* <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
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
                        </div> */}
                    </dd>
                </div>
            ))}
        </dl>
    );
}
