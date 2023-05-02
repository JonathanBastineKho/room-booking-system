import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}