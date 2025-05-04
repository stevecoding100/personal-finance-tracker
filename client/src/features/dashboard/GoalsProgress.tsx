import React from "react";

interface Goal {
    id: number;
    title: string;
    targetAmount: number;
    currentAmount: number;
}

interface GoalsProgressProps {
    goals: Goal[];
}

const GoalsProgress = ({ goals }: GoalsProgressProps) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Savings Goals</h3>
            {goals.length === 0 ? (
                <p className="text-sm text-gray-500">No goals set yet.</p>
            ) : (
                <ul className="space-y-4">
                    {goals.map((goal) => {
                        const percent =
                            (goal.currentAmount / goal.targetAmount) * 100;
                        return (
                            <li key={goal.id}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">
                                        {goal.title}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        ${goal.currentAmount.toFixed(2)} / $
                                        {goal.targetAmount.toFixed(2)}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-indigo-600 h-2.5 rounded-full"
                                        style={{
                                            width: `${Math.min(percent, 100)}%`,
                                        }}
                                    ></div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default GoalsProgress;
