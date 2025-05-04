// src/App.tsx

import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<Login />} />
        </Routes>
    );
};

export default App;
