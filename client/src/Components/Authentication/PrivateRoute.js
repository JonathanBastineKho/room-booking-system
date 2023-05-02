import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ requiredRole, children }) => {
    const { token } = useContext(AuthContext);

    const [auth, setAuth] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);

    useEffect(() => {
        if (token) {
            axios.get("/api/verify_token", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              if (res.data.success){
                const user = jwt_decode(token);
                if (user.user_type === requiredRole){
                  setAuth(true);
                }
              }
            })
            .catch(error => {
              console.log(error);
            })
            .then(() => setIsTokenValidated(true));
        } else {
          setIsTokenValidated(true);
        }
    }, [requiredRole, token]);

    if (!isTokenValidated) {return null}
    return auth ? children : <Navigate to="/" />
};

export default PrivateRoute;
