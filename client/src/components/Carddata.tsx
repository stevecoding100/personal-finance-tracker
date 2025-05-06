// import { Fragment } from "react";
// import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
// import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

// const tiers = [
//     {
//         name: "Starter",
//         description: "Everything you need to get started.",
//         priceMonthly: "$19",
//         href: "#",
//         highlights: [
//             { description: "Custom domains" },
//             { description: "Edge content delivery" },
//             { description: "Advanced analytics" },
//             { description: "Quarterly workshops", disabled: true },
//             { description: "Single sign-on (SSO)", disabled: true },
//             { description: "Priority phone support", disabled: true },
//         ],
//     },
//     {
//         name: "Growth",
//         description: "All the extras for your growing team.",
//         priceMonthly: "$49",
//         href: "#",
//         highlights: [
//             { description: "Custom domains" },
//             { description: "Edge content delivery" },
//             { description: "Advanced analytics" },
//             { description: "Quarterly workshops" },
//             { description: "Single sign-on (SSO)", disabled: true },
//             { description: "Priority phone support", disabled: true },
//         ],
//     },
//     {
//         name: "Scale",
//         description: "Added flexibility at scale.",
//         priceMonthly: "$99",
//         href: "#",
//         highlights: [
//             { description: "Custom domains" },
//             { description: "Edge content delivery" },
//             { description: "Advanced analytics" },
//             { description: "Quarterly workshops" },
//             { description: "Single sign-on (SSO)" },
//             { description: "Priority phone support" },
//         ],
//     },
// ];
// const sections = [
//     {
//         name: "Features",
//         features: [
//             {
//                 name: "Edge content delivery",
//                 tiers: { Starter: true, Growth: true, Scale: true },
//             },
//             {
//                 name: "Custom domains",
//                 tiers: { Starter: "1", Growth: "3", Scale: "Unlimited" },
//             },
//             {
//                 name: "Team members",
//                 tiers: { Starter: "3", Growth: "20", Scale: "Unlimited" },
//             },
//             {
//                 name: "Single sign-on (SSO)",
//                 tiers: { Starter: false, Growth: false, Scale: true },
//             },
//         ],
//     },
//     {
//         name: "Reporting",
//         features: [
//             {
//                 name: "Advanced analytics",
//                 tiers: { Starter: true, Growth: true, Scale: true },
//             },
//             {
//                 name: "Basic reports",
//                 tiers: { Starter: false, Growth: true, Scale: true },
//             },
//             {
//                 name: "Professional reports",
//                 tiers: { Starter: false, Growth: false, Scale: true },
//             },
//             {
//                 name: "Custom report builder",
//                 tiers: { Starter: false, Growth: false, Scale: true },
//             },
//         ],
//     },
//     {
//         name: "Support",
//         features: [
//             {
//                 name: "24/7 online support",
//                 tiers: { Starter: true, Growth: true, Scale: true },
//             },
//             {
//                 name: "Quarterly workshops",
//                 tiers: { Starter: false, Growth: true, Scale: true },
//             },
//             {
//                 name: "Priority phone support",
//                 tiers: { Starter: false, Growth: false, Scale: true },
//             },
//             {
//                 name: "1:1 onboarding tour",
//                 tiers: { Starter: false, Growth: false, Scale: true },
//             },
//         ],
//     },
// ];

// export default function Carddata({ user, transactions, goals, budgets }) {
//
//     return (
//         <div className="bg-white py-24 sm:py-32">
//             <div className="mx-auto max-w-4xl px-6 max-lg:text-center lg:max-w-7xl lg:px-8">
//                 <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-950 sm:text-6xl lg:text-pretty">
//                     Welcome, <span className="ml-2">{user?.name} 👋</span>
//                 </h1>
//                 <p className="mt-6 max-w-2xl text-pretty text-lg font-medium text-gray-600 max-lg:mx-auto sm:text-xl/8">
//                     Here’s a quick snapshot of your financial health. Track your
//                     spending, monitor your progress, and stay on top of your
//                     goals—all in one place.
//                 </p>
//             </div>
//             <div className="relative pt-16 sm:pt-24">
//                 <div className="absolute inset-x-0 bottom-0 top-48 bg-[radial-gradient(circle_at_center_center,#7775D6,#592E71,#030712_70%)] lg:bg-[radial-gradient(circle_at_center_150%,#7775D6,#592E71,#030712_70%)]" />
//                 <div className="relative mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
//                     <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
//                         {/* Transactions */}
//                         {transactions
//                             .filter((tx: any) => tx.type === "income")
//                             .map((tx: any) => (
//                                 <div
//                                     key={tx.id}
//                                     className="-m-2 grid grid-cols-1 rounded-[2rem] shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md"
//                                 >
//                                     <div className="grid grid-cols-1 rounded-[2rem] p-2 shadow-md shadow-black/5">
//                                         <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
//                                             <h2 className="text-sm font-semibold text-indigo-600">
//                                                 Current Balance
//                                                 <span className="sr-only">
//                                                     plan
//                                                 </span>
//                                             </h2>
//                                             <div className="mt-8 flex items-center gap-4">
//                                                 <div className="text-5xl font-semibold text-gray-950">
//                                                     ${tx.amount}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         {/* Goals */}
//                         {goals.map((goal: any) => (
//                             <div
//                                 key={goal.id}
//                                 className="-m-2 grid grid-cols-1 rounded-[2rem] shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md"
//                             >
//                                 <div className="grid grid-cols-1 rounded-[2rem] p-2 shadow-md shadow-black/5">
//                                     <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
//                                         <h2 className="text-sm font-semibold text-indigo-600">
//                                             Goals
//                                             <span className="sr-only">
//                                                 plan
//                                             </span>
//                                         </h2>
//                                         <div className="mt-8 flex items-center gap-4">
//                                             <div className="text-5xl font-semibold text-gray-950">
//                                                 {goal.target_amount}
//                                             </div>
//                                             <div className="text-sm text-gray-600">
//                                                 <p>USD</p>
//                                                 <p>per month</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                         {/* Budgets */}
//                         {/* {budgets.map((budget: any) => (
//                             <div
//                                 key={budget.id}
//                                 className="-m-2 grid grid-cols-1 rounded-[2rem] shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md"
//                             >
//                                 <div className="grid grid-cols-1 rounded-[2rem] p-2 shadow-md shadow-black/5">
//                                     <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
//                                         <h2 className="text-sm font-semibold text-indigo-600">
//                                             Budget
//                                             <span className="sr-only">
//                                                 plan
//                                             </span>
//                                         </h2>
//                                         <div className="mt-8 flex items-center gap-4">
//                                             <div className="text-5xl font-semibold text-gray-950">
//                                                 {budget.amount}
//                                             </div>
//                                             <div className="text-sm text-gray-600">
//                                                 <p>USD</p>
//                                                 <p>per month</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))} */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
    CursorArrowRaysIcon,
    EnvelopeOpenIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Carddata({ user, transactions, goals, budgets }) {
    // Sort transactions by date descending
    const sortedTx = [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
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
            stat: `$${balance.toFixed(2)}`,
            icon: UsersIcon,
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
