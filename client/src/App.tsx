import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { RootState } from "./store/store";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import RecentTransactions from "./features/transactions/components/RecenTransactions";
import RecentBudgets from "./features/budgets/components/RecentBudgets";
import RecentSavings from "./features/savings/components/RecentSavings";
import SummaryCard from "./components/dashboard/SummaryCard";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));

const App: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/dashboard/*"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                >
                    <Route path="" element={<SummaryCard user={user} />} />

                    <Route
                        path="transactions"
                        element={<RecentTransactions />}
                    />
                    <Route path="budgets" element={<RecentBudgets />} />
                    <Route path="savings" element={<RecentSavings />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
