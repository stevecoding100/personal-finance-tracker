import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateSavingThunk,
    deleteSavingThunk,
    createSavingThunk,
    clearSavings,
    fetchSavingsThunk,
} from "../../features/savings/savingSlice";
import type { AppDispatch, RootState } from "../../store/store";
import { Saving } from "../../types/type";

const SavingFormModal: React.FC<{
    onClose: () => void;
    selectedSaving: Saving | null;
    page: number;
    limit: number;
}> = ({ onClose, selectedSaving, page, limit }) => {
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const [formData, setFormData] = useState({
        title: "",
        target_amount: 0,
        current_amount: 0,
        target_date: "",
    });

    useEffect(() => {
        if (selectedSaving) {
            setFormData({
                title: selectedSaving.title,
                target_amount: selectedSaving.target_amount,
                current_amount: selectedSaving.current_amount,
                target_date: selectedSaving.target_date?.split("T")[0] || "",
            });
        }
    }, [selectedSaving]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "target_amount" || name === "current_amount"
                    ? parseFloat(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            alert("User is not logged in.");
            return;
        }
        const payload = {
            title: formData.title,
            target_amount: formData.target_amount,
            current_amount: formData.current_amount,
            target_date: formData.target_date
                ? new Date(formData.target_date).toISOString()
                : null,
            user_id: userId,
        };

        if (selectedSaving) {
            await dispatch(
                updateSavingThunk({ id: selectedSaving.id, data: payload })
            );
        } else {
            await dispatch(createSavingThunk(payload));
        }
        // After mutation, refresh
        dispatch(clearSavings());
        dispatch(fetchSavingsThunk({ page, limit }));
        onClose();
    };

    const handleDelete = () => {
        if (
            selectedSaving &&
            window.confirm("Are you sure you want to delete this saving goal?")
        ) {
            dispatch(deleteSavingThunk(selectedSaving.id));
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
                    {selectedSaving ? "Edit Saving Goal" : "Add Saving Goal"}
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        maxLength={50}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">
                        Target Amount
                    </label>
                    <input
                        name="target_amount"
                        type="number"
                        value={formData.target_amount}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">
                        Current Amount
                    </label>
                    <input
                        name="current_amount"
                        type="number"
                        value={formData.current_amount}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">
                        Target Date
                    </label>
                    <input
                        name="target_date"
                        type="date"
                        value={formData.target_date}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>

                <div className="flex justify-between items-center">
                    {selectedSaving ? (
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

export default SavingFormModal;
