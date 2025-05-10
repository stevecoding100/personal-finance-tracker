// src/App.tsx

import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import RecentTransactions from "./features/transactions/RecenTransactions";
import Carddata from "./components/Carddata";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
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

                <Route path="transactions" element={<RecentTransactions />} />
            </Route>
        </Routes>
    );
};

export default App;
