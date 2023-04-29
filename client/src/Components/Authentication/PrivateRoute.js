import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { token } = useContext(AuthContext);

    const isTokenValid = (token) => {
        axios.get("/api/verify_token", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            return res.data.valid;
        });
    };

    return (
        <Route
            {...rest}
            render={(props) =>
                token && isTokenValid(token) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/" }} />
                )
            }
        />
    );
};

export default PrivateRoute;