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

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    // <React.StrictMode>
    <AuthProvider>
        <BrowserRouter>
            {/* NavBar */}
            <NavigationBar className="dark border-b border-gray-700 py-1 bg-gray-800" />
            {/* Routes */}
            <div className="dark min-h-screen bg-gray-900">
                <Routes>
                    {/* Login Page Route */}
                    <Route exact path="/" element={<LoginPage />} />
                    {/* Register Page Route */}

                    {/* Other routes */}
                    <Route
                        path="/test"
                        element={
                            <PrivateRoute requiredRole="Student">
                                <TestPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    </AuthProvider>

    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
