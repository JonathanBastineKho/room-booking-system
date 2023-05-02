// Imported libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Components/Authentication/AuthContext";
import PrivateRoute from "./Components/Authentication/PrivateRoute";

// Imported local dependencies
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import NavigationBar from "./Components/NavBar/NavigationBar";
import LoginPage from "./Pages/LoginPage";
import TestPage from "./Pages/TestPage";
import RegisterPage from "./Pages/RegisterPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    // <React.StrictMode>
    <AuthProvider>
        <BrowserRouter>
            {/* Routes */}
            <Routes>
                {/* Login Page Route */}
                <Route exact path="/test" element={<TestPage />} />
                <Route exact path="/" element={<LoginPage />} />
                <Route exact path="/register" element={<RegisterPage />} />
                {/* Register Page Route */}

                {/* Other routes */}
                <Route
                    path="/student"
                    element={
                        <PrivateRoute requiredRole="Student">
                            <NavigationBar className="dark border-b border-gray-700 py-1 bg-gray-800" />
                            <TestPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    </AuthProvider>

    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
