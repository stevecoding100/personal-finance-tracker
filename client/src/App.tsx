// src/App.tsx

import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
// import { Dashboard } from "./pages/Dashboard";
// import { Profile } from "./pages/Profile";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
    );
};

export default App;
