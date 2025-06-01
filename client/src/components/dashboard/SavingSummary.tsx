import { Link } from "react-router-dom";
import { BanknotesIcon } from "@heroicons/react/24/outline";
const stats = [
    {
        id: 3,
        name: "Savings",
        stat: 400,
        // stat: `$${totalGoalCurrent.toFixed(2)}`,
        icon: BanknotesIcon,
        change: "",
        changeType: "",
        link: "/dashboard/savings",
    },
];

const SavingSummary = () => {
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
    );
};

export default SavingSummary;
