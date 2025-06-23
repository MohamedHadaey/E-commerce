import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

export default function ProtectedRoute({children}) {
    const { token } = useContext(AuthContext)
    if (token == null) {
        return <Navigate to='/login' />
    } else {
        return <>
            {children}
        </>
    }

}
