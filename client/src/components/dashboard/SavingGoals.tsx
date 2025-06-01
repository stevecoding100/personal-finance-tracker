import { useEffect, useState } from "react";
import { Saving } from "@/types/type";
import { fetchGoals } from "../../services/savingAPI";
import { Link } from "react-router-dom";

const SavingGoals = () => {
    const [savingGoals, setSavingGoals] = useState<Saving[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadSavingData = async () => {
            try {
                const gs = await fetchGoals();
                setSavingGoals(gs);
            } catch (err) {
                console.error(err);
                setError("Failed to load savings.");
            } finally {
                setLoading(false);
            }
        };

        loadSavingData();
    }, []);

    const getTopSavings = (gs: Saving[]) => {
        return [...gs]
            .sort(
                (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.updated_at).getTime()
            ) // Newest first
            .slice(0, 5);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-5">Saving Goals</h2>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="space-y-5">
                    {getTopSavings(savingGoals).map((goal) => {
                        const percent = Math.min(
                            (goal.current_amount / goal.target_amount) * 100,
                            100
                        );

                        return (
                            <div
                                key={goal.id}
                                className="p-4 border border-blue-100 rounded-lg bg-white shadow-sm"
                            >
                                <div className="flex justify-between mb-2">
                                    <h3 className="text-md font-semibold text-gray-800">
                                        {goal.title}
                                    </h3>
                                    <span className="text-sm text-gray-600">
                                        $
                                        {Number(
                                            goal.current_amount
                                        ).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                        / $
                                        {Number(
                                            goal.target_amount
                                        ).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-green-600 h-3 rounded-full"
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="w-full flex justify-center">
                <Link
                    to={"/dashboard/savings"}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    <button
                        type="button"
                        className="rounded bg-indigo-600 px-2 py-2 mt-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        View All
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SavingGoals;
