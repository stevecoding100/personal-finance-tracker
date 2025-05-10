import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

import PrivateRoute from "./components/PrivateRoute";
import RecentTransactions from "./features/transactions/RecenTransactions";
import Carddata from "./components/Carddata";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));

const App: React.FC = () => {
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
                    <Route path="" element={<Carddata />} />

                    <Route
                        path="transactions"
                        element={<RecentTransactions />}
                    />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
