import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
export { AuthContext };
export default function AuthContextProvider({ children }) {
    // best solution use => useEffect to handle it on Did mount life cycle
    const [token, setToken] = useState(null);
    // const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => { 
        const token = localStorage.getItem('token');
        if(token !== null) {
            setToken(token);
        } else {
            setToken(null);
        }
    }, [])

    return <AuthContext.Provider value={{ token, setToken }}>
        {children}
    </AuthContext.Provider>
}
