import { useGlobalAuthContext } from "../context/AuthContext";
import { Navigate, Route } from "react-router-dom";

export const PrivateRoute = ({ children }) =>{
    const { user } = useGlobalAuthContext();
    if(!user){
        return <Navigate to="/login" replace/>
    }
    return children;
}

