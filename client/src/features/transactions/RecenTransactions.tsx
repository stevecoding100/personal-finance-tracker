import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTransactions,
    resetTransactions,
} from "../../features/transactions/transactionSlice";
import type { RootState, AppDispatch } from "../../store/store";
import TransactionFormModal from "./TransactionFormModal";

const RecentTransactions: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const dispatch = useDispatch<AppDispatch>();
    const { transactions, status, error } = useSelector(
        (state: RootState) => state.transactions
    );

    useEffect(() => {
        dispatch(fetchTransactions());
        return () => {
            dispatch(resetTransactions());
        };
    }, [dispatch]);

    // To open for add
    const handleAdd = () => {
        setSelectedTransaction(null);
        setIsModalOpen(true);
    };

    // To open for edit
    const handleEdit = (transaction: any) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };
    return (
        <div className="px-4 sm:px-6 lg:px-8 p-12">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Transactions
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the transactions in your account.
                    </p>
                </div>
                <div className="mt-8">
                    <button
                        onClick={handleAdd}
                        className="rounded-md bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none"
                    >
                        Add Transaction
                    </button>
                </div>
            </div>
            {status === "loading" && (
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
                                        Category
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Amount
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Type
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Description
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
                                {!transactions || transactions.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-4 text-gray-500"
                                        >
                                            No transactions available.
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.map((transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className="even:bg-gray-50"
                                        >
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                {transaction.category}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                $
                                                {Number(
                                                    transaction.amount
                                                ).toLocaleString("en-US", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {transaction.type}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {new Date(
                                                    transaction.date
                                                ).toLocaleDateString("en-US")}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {transaction.description}.
                                            </td>

                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleEdit(transaction);
                                                    }}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                {status === "loading" ? (
                    <p className="text-gray-500">Loading more...</p>
                ) : (
                    <p className="text-gray-500">
                        All transactions are loaded.
                    </p>
                )}
            </div>
            {isModalOpen && (
                <TransactionFormModal
                    onClose={() => setIsModalOpen(false)}
                    selectedTransaction={selectedTransaction}
                />
            )}
        </div>
    );
};
export default RecentTransactions;
