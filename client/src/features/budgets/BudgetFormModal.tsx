import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateBudgetThunk,
    deleteBudgetThunk,
    createBudgetThunk,
    clearBudgets,
    fetchBudgetsThunk,
} from "../budgets/budgetSlice";
import type { AppDispatch, RootState } from "../../store/store";
import { Budget } from "../../types/type";

const categories = [
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

const BudgetFormModal: React.FC<{
    onClose: () => void;
    selectedBudget: Budget | null;
}> = ({ onClose, selectedBudget }) => {
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const [formData, setFormData] = useState({
        category: "",
        amount: 0,
        date: "",
    });

    useEffect(() => {
        if (selectedBudget) {
            setFormData({
                category: selectedBudget.category,
                amount: selectedBudget.amount,
                date: new Date(selectedBudget.created_at)
                    .toISOString()
                    .split("T")[0],
            });
        }
    }, [selectedBudget]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "amount" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            // If userId is not available, handle this scenario
            alert("User is not logged in.");
            return;
        }
        const payload = {
            category: formData.category,
            amount: formData.amount,
            created_at: new Date(formData.date).toISOString(),
            user_id: userId,
        };

        if (selectedBudget) {
            await dispatch(
                updateBudgetThunk({ id: selectedBudget.id, data: payload })
            );
        } else {
            await dispatch(createBudgetThunk(payload));
        }
        // After mutation, refresh
        dispatch(clearBudgets());
        dispatch(fetchBudgetsThunk());
        onClose();
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );
        if (confirmDelete && selectedBudget) {
            dispatch(deleteBudgetThunk(selectedBudget.id));
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
                    {selectedBudget ? "Edit Budget" : "Add Budget"}
                </h2>

                <div className="mb-4">
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
                        {categories.map((cat) => (
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
                        type="number"
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

                {/* <div className="mb-4">
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
                </div> */}

                <div className="flex justify-between items-center">
                    {selectedBudget ? (
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

export default BudgetFormModal;
