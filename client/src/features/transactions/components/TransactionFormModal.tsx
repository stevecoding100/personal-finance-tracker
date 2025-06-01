import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    editTransaction,
    deleteTransactionById,
    fetchTransactions,
    createTransaction,
} from "../../../store/slices/transactionSlice";
import type { AppDispatch } from "../../../store/store";
import { Transaction } from "../../../types/type";

const expenseCategories = [
    "Rent",
    "Mortgage",
    "Utilities",
    "Groceries",
    "Restaurants",
    "Transportation",
    "Gas",
    "Public Transit",
    "Healthcare",
    "Insurance",
    "Clothing",
    "Entertainment",
    "Subscriptions",
    "Travel",
    "Education",
    "Loan Payments",
    "Savings",
    "Gifts",
    "Other",
];

const incomeCategories = [
    "Salary",
    "Freelance",
    "Bonus",
    "Interest",
    "Dividends",
    "Investments",
    "Gifts",
    "Refunds",
    "Rental Income",
    "Business Income",
];

const TransactionFormModal: React.FC<{
    onClose: () => void;
    selectedTransaction: Transaction | null;
}> = ({ onClose, selectedTransaction }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        category: "",
        amount: 0,
        type: "expense",
        date: "",
        description: "",
    });

    useEffect(() => {
        if (selectedTransaction) {
            setFormData({
                category: selectedTransaction.category.toString(),
                amount: selectedTransaction.amount,
                type: selectedTransaction.type,
                date: new Date(selectedTransaction.date)
                    .toISOString()
                    .split("T")[0],
                description: selectedTransaction.description || "",
            });
        }
    }, [selectedTransaction]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "amount" ? value : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (selectedTransaction) {
                await dispatch(
                    editTransaction({
                        id: selectedTransaction.id,
                        data: {
                            ...formData,
                            type: formData.type as "income" | "expense",
                        },
                    })
                );
            } else {
                await dispatch(
                    createTransaction({
                        ...formData,
                        type: formData.type as "income" | "expense",
                    })
                );
            }
            await dispatch(fetchTransactions());
            onClose();
        } catch (err) {
            console.error("Failed to save transaction", err);
        }
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );
        if (confirmDelete && selectedTransaction) {
            dispatch(deleteTransactionById(selectedTransaction.id));
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-lg font-semibold mb-4">
                    {selectedTransaction
                        ? "Edit Transaction"
                        : "Add Transaction"}
                </h2>

                <div className="mb-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium">
                            Type
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    <label className="block text-sm font-medium">
                        Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded w-full"
                    >
                        <option value="">Select a category</option>
                        {(formData.type === "income"
                            ? incomeCategories
                            : expenseCategories
                        ).map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Amount</label>
                    <input
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Date</label>
                    <input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">
                        Description
                    </label>
                    <input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        maxLength={35}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>

                <div className="flex justify-between items-center">
                    {selectedTransaction ? (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-800"
                        >
                            Delete
                        </button>
                    ) : (
                        <div />
                    )}

                    <div className="ml-auto flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TransactionFormModal;
