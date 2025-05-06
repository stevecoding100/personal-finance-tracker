// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";
// import {
//     fetchTransactions,
//     fetchGoals,
//     fetchBudgets,
// } from "../features/dashboard/dashboardAPI";
// import Navbar from "../components/Navbar";

// const Dashboard = () => {
//     const user = useSelector((state: RootState) => state.auth.user);
//     const [transactions, setTransactions] = useState([]);
//     const [goals, setGoals] = useState([]);
//     const [budgets, setBudgets] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const loadDashboardData = async () => {
//             try {
//                 const [txs, gs, bs] = await Promise.all([
//                     fetchTransactions(),
//                     fetchGoals(),
//                     fetchBudgets(),
//                 ]);
//                 setTransactions(txs);
//                 setGoals(gs);
//                 setBudgets(bs);
//             } catch (err) {
//                 console.error(err);
//                 setError("Failed to load dashboard data.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadDashboardData();
//     }, []);

//     if (loading) return <p className="p-4">Loading dashboard...</p>;
//     if (error) return <p className="p-4 text-red-500">{error}</p>;

//     return (
//         <div className="min-h-screen">
//             <Navbar user={user} />

//             {/* Main Dashboard Content */}
//             <main className="w-[60%] mx-auto">
//                 <h1 className="text-3xl font-bold mb-6">
//                     Welcome, {user?.name} 👋
//                 </h1>

//                 <section className="mb-6">
//                     <h2 className="text-xl font-semibold mb-2">
//                         Recent Transactions
//                     </h2>
//                     <ul className="bg-white p-4 rounded shadow">
//                         {transactions.map((tx: any) => (
//                             <li key={tx.id} className="border-b py-2">
//                                 {tx.description} - ${tx.amount}
//                             </li>
//                         ))}
//                     </ul>
//                 </section>

//                 <section className="mb-6">
//                     <h2 className="text-xl font-semibold mb-2">Your Goals</h2>
//                     <ul className="bg-white p-4 rounded shadow">
//                         {goals.map((goal: any) => (
//                             <li key={goal.id} className="py-2 border-b">
//                                 {goal.title}: ${goal.current_amount} / $
//                                 {goal.target_amount}
//                             </li>
//                         ))}
//                     </ul>
//                 </section>

//                 <section>
//                     <h2 className="text-xl font-semibold mb-2">
//                         Budget Overview
//                     </h2>
//                     <ul className="bg-white p-4 rounded shadow">
//                         {budgets.map((budget: any) => (
//                             <li key={budget.id} className="py-2 border-b">
//                                 <p>
//                                     ${budget.amount}{" "}
//                                     <em>
//                                         {budget.category}{" "}
//                                         {new Date(
//                                             budget.created_at
//                                         ).toLocaleDateString("en-US", {
//                                             month: "long",
//                                             day: "numeric",
//                                             year: "numeric",
//                                         })}
//                                     </em>
//                                 </p>
//                             </li>
//                         ))}
//                     </ul>
//                 </section>
//             </main>
//         </div>
//     );
// };

// export default Dashboard;

("use client");

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
    fetchTransactions,
    fetchGoals,
    fetchBudgets,
} from "../features/dashboard/dashboardAPI";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from "@headlessui/react";
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Carddata from "../components/Carddata";

const navigation = [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    { name: "Transactions", href: "#", icon: UsersIcon, current: false },
    { name: "Savings", href: "#", icon: FolderIcon, current: false },
    { name: "Budget", href: "#", icon: CalendarIcon, current: false },
];

const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
    const user = useSelector((state: RootState) => state.auth.user);
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
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

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
            <div>
                <Dialog
                    open={sidebarOpen}
                    onClose={setSidebarOpen}
                    className="relative z-50 lg:hidden"
                >
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button
                                        type="button"
                                        onClick={() => setSidebarOpen(false)}
                                        className="-m-2.5 p-2.5"
                                    >
                                        <span className="sr-only">
                                            Close sidebar
                                        </span>
                                        <XMarkIcon
                                            aria-hidden="true"
                                            className="size-6 text-white"
                                        />
                                    </button>
                                </div>
                            </TransitionChild>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img
                                        alt="Your Company"
                                        src=""
                                        className="h-8 w-auto"
                                    />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul
                                        role="list"
                                        className="flex flex-1 flex-col gap-y-7"
                                    >
                                        <li>
                                            <ul
                                                role="list"
                                                className="-mx-2 space-y-1"
                                            >
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                item.current
                                                                    ? "bg-gray-800 text-white"
                                                                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className="size-6 shrink-0"
                                                            />
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="mt-auto">
                                            <a
                                                href="#"
                                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                            >
                                                <Cog6ToothIcon
                                                    aria-hidden="true"
                                                    className="size-6 shrink-0"
                                                />
                                                Settings
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src=""
                                className="h-8 w-auto"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul
                                role="list"
                                className="flex flex-1 flex-col gap-y-7"
                            >
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? "bg-gray-800 text-white"
                                                            : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                                        "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                                    )}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className="size-6 shrink-0"
                                                    />
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                <li className="mt-auto">
                                    <a
                                        href="#"
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                    >
                                        <Cog6ToothIcon
                                            aria-hidden="true"
                                            className="size-6 shrink-0"
                                        />
                                        Settings
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>

                        {/* Separator */}
                        <div
                            aria-hidden="true"
                            className="h-6 w-px bg-gray-900/10 lg:hidden"
                        />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <form
                                action="#"
                                method="GET"
                                className="grid flex-1 grid-cols-1"
                            >
                                <input
                                    name="search"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
                                />
                                <MagnifyingGlassIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                                />
                            </form>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button
                                    type="button"
                                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">
                                        View notifications
                                    </span>
                                    <BellIcon
                                        aria-hidden="true"
                                        className="size-6"
                                    />
                                </button>

                                {/* Separator */}
                                <div
                                    aria-hidden="true"
                                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                                />

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <img
                                            alt="user profile image"
                                            src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                                            className="size-8 rounded-full bg-gray-50"
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                                            <span
                                                aria-hidden="true"
                                                className="ml-4 text-sm/6 font-semibold text-gray-900"
                                            >
                                                {user.name}
                                            </span>
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="ml-2 size-5 text-gray-400"
                                            />
                                        </span>
                                    </MenuButton>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                                                >
                                                    {item.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    {/* Main content here */}
                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">
                            {/* Transactions overview */}
                            {/* <section className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">
                                    Recent Transactions
                                </h2>
                                <ul className="bg-white p-4 rounded shadow">
                                    {transactions.map((tx: any) => (
                                        <li
                                            key={tx.id}
                                            className="border-b py-2"
                                        >
                                            {tx.description} - ${tx.amount}
                                        </li>
                                    ))}
                                </ul>
                            </section> */}
                            {/* Goals overview */}
                            {/* <section className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">
                                    Your Goals
                                </h2>
                                <ul className="bg-white p-4 rounded shadow">
                                    {goals.map((goal: any) => (
                                        <li
                                            key={goal.id}
                                            className="py-2 border-b"
                                        >
                                            {goal.title}: ${goal.current_amount}{" "}
                                            ${goal.target_amount}
                                        </li>
                                    ))}
                                </ul>
                            </section> */}
                            {/* Budget Overview */}
                            {/* <section>
                                <h2 className="text-xl font-semibold mb-2">
                                    Budget Overview
                                </h2>
                                <ul className="bg-white p-4 rounded shadow">
                                    {budgets.map((budget: any) => (
                                        <li
                                            key={budget.id}
                                            className="py-2 border-b"
                                        >
                                            <p>
                                                ${budget.amount}{" "}
                                                <em>
                                                    {budget.category}{" "}
                                                    {new Date(
                                                        budget.created_at
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "long",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </em>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </section> */}
                        </div>
                        <Carddata
                            user={user}
                            transactions={transactions}
                            goals={goals}
                            budgets={budgets}
                        />
                    </main>
                </div>
            </div>
        </>
    );
}
