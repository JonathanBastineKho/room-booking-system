import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import jwt_decode from "jwt-decode";


const PrivateRoute = ({ children, requiredRole }) => {
    const { token } = useContext(AuthContext);

    const isTokenValid = async (token) => {
        const response = await axios.get("/api/verify_token", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.valid;
    };

    const isRoleSufficient = (token) => {
        const user = jwt_decode(token);
        if (user.userType === requiredRole){
            return true;
        }
        return false;
    };
// ################ End of function ######################
    // If Token is not there
    if (token == null){
        return <Navigate to="/" />
    }

    // if Token Valid and The user has sufficient role
    isTokenValid(token)
    .then((isValid) => {
        return isValid && isRoleSufficient(token) ? {children} : <Navigate to="/" />;
    })
    .catch((error) => {
        console.log(error);
        return <Navigate to="/" />
    });
};

export default PrivateRoute;