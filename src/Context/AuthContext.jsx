import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
export { AuthContext };
export default function AuthContextProvider({ children }) {
    // best solution use => useEffect to handle it on Did mount life cycle
    const [token, setToken] = useState(null);
    // const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => { 
        const token = localStorage.getItem('token');
        console.log('tokennnnnn', token)
        if(token !== null) {
            setToken(token);
            console.log('zzzzzzzzzzzz 2', token)
        } else {
            setToken(null);
            console.log('yyyyyyyyyyyyyyy 2', token)
        }
    }, [])

    return <AuthContext.Provider value={{ token, setToken }}>
        {children}
    </AuthContext.Provider>
}
