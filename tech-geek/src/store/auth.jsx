
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";


export const AuthContext = createContext();


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [filter, setFilter] = useState('')

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token && user) {
            setUser(JSON.parse(user));
        }
    }, []);

    const storeTokenInLS = (newToken, user) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setToken(newToken);
    };
    const storeTokenInCookies = (newToken, user) => {
        Cookies.set("token", newToken, { expires: 30 });
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setToken(newToken);
    };

    const getCurrentUser = () => {
        const user = localStorage.getItem("user");
        return JSON.parse(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        Cookies.remove("token");
        setUser(null);
        setFilter('');
    };

    return (
        <AuthContext.Provider value={{ token, user,filter, setFilter, storeTokenInLS, storeTokenInCookies, logout, getCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
