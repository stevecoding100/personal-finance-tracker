import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Carddata({ user, transactions, goals, budgets }) {
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
            <div className="mx-auto max-w-4xl px-6 max-lg:text-center lg:max-w-7xl lg:px-8 mb-24">
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
                                    <a
                                        href="#"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        View all
                                        <span className="sr-only">
                                            {item.name} stats
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
