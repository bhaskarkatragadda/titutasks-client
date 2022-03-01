import { useLocation, Navigate, Outlet } from "react-router-dom";
import {auth} from "../../hooks/useAuth";

const AuthCheck = () => {
    const location = useLocation();
    const token = auth();
    console.log({token})
    return ( 
        token ? <Outlet />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default AuthCheck; 