import { createContext, useState } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
        setUser(jwtDecode(token));
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser("");
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}