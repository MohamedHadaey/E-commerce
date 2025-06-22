import { createContext, useState } from "react";

const AuthContext = createContext();
export { AuthContext };
export default function AuthContextProvider({ children }) {
    const [token, setToken] = useState(null);
    console.log('token', token)

    return <AuthContext.Provider value={{ token, setToken }}>
        {children}
    </AuthContext.Provider>
}
