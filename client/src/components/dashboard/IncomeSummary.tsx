import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
// import { Link } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { fetchTransactions } from "../../services/transactionAPI";
import { Transaction } from "@/types/type";

type IncomeSummaryProps = {
    month: string;
    year: string;
};

function classNames(...classes: (string | boolean | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

export default function IncomeSummary({ month, year }: IncomeSummaryProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // useEffect(() => {
    //     const loadTransactionData = async () => {
    //         try {
    //             const [txs] = await Promise.all([fetchTransactions()]);
    //             setTransactions(txs);
    //         } catch (err) {
    //             console.error(err);
    //             setError("Failed to load transactions data.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     loadTransactionData();
    // }, []);

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

    // Determine if the most recent transaction was income or expense
    const isIncome = mostRecentTx?.type === "income";
    const changeDirection = isIncome
        ? "increase"
        : mostRecentTx
        ? "decrease"
        : "";
    const changeAmount = mostRecentTx?.amount ?? 0;

    const stats = [
        {
            id: 1,
            name: "Income",
            stat: `$${balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`,
            icon: CurrencyDollarIcon,
            change: `$${changeAmount}`,
            changeType: changeDirection,
            // link: "/dashboard/transactions",
        },
    ];
    if (loading) return <p className="p-4">Loading Income...</p>;
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
