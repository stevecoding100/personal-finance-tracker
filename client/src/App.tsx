// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Provider } from "react-redux";
import { store } from "./features/store";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    {/* <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} /> */}
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
