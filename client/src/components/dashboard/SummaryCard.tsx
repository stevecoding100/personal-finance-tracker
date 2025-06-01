import { useState } from "react";
import ExpenseSummary from "./ExpenseSummary";
import IncomeSummary from "./IncomeSummary";
// import SavingSummary from "./SavingSummary";

import Transactions from "./Transactions";
import SavingGoals from "./SavingGoals";
import { User } from "@/types/type";
import FilterDate from "../FilterDate";
import PieChart from "../charts/PieChart";
import BarChart from "../charts/BarChart";
import BudgetSummary from "./BudgetSummary";

type SummaryProps = {
    user: User | null;
};

export default function SummaryCard({ user }: SummaryProps) {
    const currentDate = new Date();
    const [month, setMonth] = useState(String(currentDate.getMonth())); // 0-11
    const [year, setYear] = useState(String(currentDate.getFullYear()));

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMonth(e.target.value);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(e.target.value);
    };

    const handleReset = () => {
        setMonth(String(currentDate.getMonth()));
        setYear(String(currentDate.getFullYear()));
    };

    return (
        <div>
            <div className="mx-auto max-w-4xl px-4 max-lg:text-center lg:max-w-7xl lg:px-8 mb-12 xl:ml-2">
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-950 sm:text-6xl lg:text-pretty">
                    Welcome, <span className="ml-2"> {user?.name} 👋</span>
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-lg font-medium text-gray-600 max-lg:mx-auto sm:text-xl/8">
                    Here’s a quick snapshot of your financial health. Track your
                    spending, monitor your progress, and stay on top of your
                    goals—all in one place.
                </p>
            </div>
            {/* Filter Date Component */}
            <FilterDate
                selectedMonth={month}
                selectedYear={year}
                handleMonthChange={handleMonthChange}
                handleYearChange={handleYearChange}
                handleReset={handleReset}
            />
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
                <div className="p-5">
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 w-full">
                        <IncomeSummary month={month} year={year} />
                        <ExpenseSummary month={month} year={year} />
                        {/* <SavingSummary /> */}
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-5">
                        <Transactions month={month} year={year} />
                        <SavingGoals />
                        <BudgetSummary />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <div className="mb-5 p-2 w-[90%] lg:w-[60%]">
                        <PieChart month={month} year={year} />
                    </div>
                    <div className="mb-5 p-2 w-[100%] lg:w-[80%] ">
                        <BarChart />
                    </div>
                </div>
            </div>
        </div>
    );
}
