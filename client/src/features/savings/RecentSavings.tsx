import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchSavingsThunk,
    clearSavings,
} from "../../features/savings/savingSlice";
import { Saving } from "@/types/type";

import type { RootState, AppDispatch } from "../../store/store";
import SavingFormModal from "./SavingFormModal";

const RecentSavings: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSaving, setSelectedSaving] = useState<Saving | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { savings, loading, error } = useSelector(
        (state: RootState) => state.savings
    );

    useEffect(() => {
        dispatch(fetchSavingsThunk());
        return () => {
            dispatch(clearSavings());
        };
    }, [dispatch]);

    const handleAdd = () => {
        setSelectedSaving(null);
        setIsModalOpen(true);
    };

    const handleEdit = (saving: Saving) => {
        setSelectedSaving(saving);
        setIsModalOpen(true);
    };
    return (
        <div className="px-4 sm:px-6 lg:px-8 p-12">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Savings Goals
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all your current savings goals.
                    </p>
                </div>
                <div className="mt-8">
                    <button
                        onClick={handleAdd}
                        className="rounded-md bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none"
                    >
                        Add Saving Goal
                    </button>
                </div>
            </div>
            {loading && (
                <p className="text-gray-500 text-sm mt-4">Loading...</p>
            )}
            {error && (
                <p className="text-red-500 text-sm mt-4">Error: {error}</p>
            )}
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Target Amount
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Current Amount
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Target Date
                                    </th>

                                    <th
                                        scope="col"
                                        className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {savings.map((goal) => (
                                    <tr
                                        key={goal.id}
                                        className="even:bg-gray-50"
                                    >
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                            {goal.title}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            $
                                            {Number(
                                                goal.target_amount
                                            ).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            $
                                            {Number(
                                                goal.current_amount
                                            ).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {goal.target_date
                                                ? new Date(
                                                      goal.target_date
                                                  ).toLocaleDateString("en-US")
                                                : "—"}
                                        </td>

                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleEdit(goal);
                                                }}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                {loading ? (
                    <p className="text-gray-500">Loading more...</p>
                ) : (
                    <p className="text-gray-500">
                        All saving goals are loaded.
                    </p>
                )}
            </div>
            {isModalOpen && (
                <SavingFormModal
                    onClose={() => setIsModalOpen(false)}
                    selectedSaving={selectedSaving}
                />
            )}
        </div>
    );
};
export default RecentSavings;
