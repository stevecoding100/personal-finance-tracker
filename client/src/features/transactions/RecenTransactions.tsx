import { Transaction } from "./types";

interface RecentTransactionsProps {
    data: Transaction[];
}

const RecentTransactions = ({ data }: RecentTransactionsProps) => {
    const recent = [...data]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5); // Limit to 5 most recent

    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
            <ul className="divide-y divide-gray-200">
                {recent.map((tx) => (
                    <li
                        key={tx.id}
                        className="py-2 flex justify-between items-center"
                    >
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                {tx.category}
                            </p>
                            <p className="text-xs text-gray-500">
                                {new Date(tx.date).toLocaleDateString()}
                            </p>
                        </div>
                        <span
                            className={`text-sm font-semibold ${
                                tx.amount < 0
                                    ? "text-red-500"
                                    : "text-green-500"
                            }`}
                        >
                            {tx.amount < 0 ? "-" : "+"}$
                            {Math.abs(tx.amount).toFixed(2)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentTransactions;
