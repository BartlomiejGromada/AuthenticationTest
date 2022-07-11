import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';

const ProtectedRoute = (props) => {
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!userCtx.user) {
            navigate("/login");  
        }
    }, [navigate, userCtx.user]);

    return props.children;
};
  
export default ProtectedRoute;