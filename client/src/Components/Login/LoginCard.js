import React, { useContext, useState } from "react";
import { Card, Label, TextInput, Button } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";
import jwtDecode from "jwt-decode";

function LoginCard() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [invalidMsg, setInvalidMsg] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios
            .post("/api/login", {
                username: userName,
                password: password,
            })
            .catch((error) => {
                console.log(error);
            });
        if (response.data.success) {
            login(response.data.access_token);
            const userType = jwtDecode(response.data.access_token).user_type;
            if (userType === "Student") {
                navigate("/student");
            } else if (userType === "Staff") {
                navigate("/staff");
            } else if (userType === "Administrator") {
                navigate("/administrator");
            }
        } else {
            setInvalidMsg(response.data.message);
        }
    };

    return (
        <Card>
            <div className="mb-2 text-center block w-96 mx-4">
                <Label className="text-xl" value="Sign in to your account" />
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="userName" value="Username" />
                    </div>
                    <TextInput
                        id="userName"
                        placeholder="username123"
                        required={true}
                        onChange={(event) => setUserName(event.target.value)}
                        color={invalidMsg === "" ? "gray" : "failure"}
                        helperText={
                            <React.Fragment>
                                <span className="font-medium">
                                    {invalidMsg}
                                </span>
                            </React.Fragment>
                        }
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password" />
                    </div>
                    <TextInput
                        id="password1"
                        type="password"
                        required={true}
                        onChange={(event) => setPassword(event.target.value)}
                        color={invalidMsg === "" ? "gray" : "failure"}
                        helperText={
                            <React.Fragment>
                                <span className="font-medium">
                                    {invalidMsg}
                                </span>
                            </React.Fragment>
                        }
                    />
                </div>
                <Button type="submit" className="mt-2">
                    Sign In
                </Button>
                <div className="mb-2 block">
                    <Label value="Not registered? " />
                    <Link
                        to="/register"
                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                        Create account
                    </Link>
                </div>
            </form>
        </Card>
    );
}

export default LoginCard;
