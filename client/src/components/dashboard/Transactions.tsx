import { useEffect, useState } from "react";
import { Transaction } from "@/types/type";
import { fetchTransactions } from "../../services/transactionAPI";
import { Link } from "react-router-dom";

type TransactionSummaryProps = {
    month: string;
    year: string;
};
const Transactions = ({ month, year }: TransactionSummaryProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    const getTopTransactions = (txs: Transaction[]) => {
        return [...txs]
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            ) // Newest first
            .slice(0, 5);
    };
    return (
        <div>
            <h2 className="text-2xl font-bold mb-5">Transactions</h2>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="space-y-5">
                    {getTopTransactions(transactions).map((tx) => (
                        <div
                            className="flex justify-between mb-3 border-b-2 border-b-gray-200"
                            key={tx.id}
                        >
                            <div className="w-full">
                                <p className="text-sm font-medium text-gray-800 capitalize">
                                    Category
                                </p>
                                <p className="text-xs text-gray-500">
                                    {tx.category}
                                </p>
                            </div>
                            <div className="w-full">
                                <p className="text-sm font-medium text-gray-800 capitalize">
                                    Date
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(tx.date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="w-1/5">
                                <p className="text-sm font-medium text-gray-800 capitalize">
                                    Amount
                                </p>

                                <p
                                    className={`text-sm font-semibold ${
                                        tx.type === "expense"
                                            ? "text-red-700"
                                            : "text-green-700"
                                    }`}
                                >
                                    {tx.type === "expense" ? "-" : "+"}$
                                    {Number(tx.amount).toLocaleString(
                                        undefined,
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="w-full flex justify-center">
                <Link
                    to={"/dashboard/transactions"}
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

export default Transactions;
