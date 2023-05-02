import React, { useState, useContext } from "react";
import axios from "axios";
import { Card, Label, TextInput, Button } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthContext";

function SignUpCard() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [email, setEmail] = useState("");

    const [usernameError, setusernameError] = useState("");
    const [emailError, setemailError] = useState("");

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const validateSubmit = async (event) => {
        event.preventDefault();
        await validateEmail();
        await validateUsername();
        // If no error
        if (usernameError === "" && emailError === "") {
            await axios
                .post("/api/register", {
                    username: userName,
                    email: email,
                    password: password,
                })
                .then((res) => {
                    if (res.data.success) {
                        login(res.data.access_token);
                        navigate("/student");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const isUserNameUnique = async (userName) => {
        // API Call
        const response = await axios
            .get(`/api/check_unique_username/${userName}`)
            .catch((error) => {
                console.log(error);
                return false;
            });
        return response.data.unique;
    };

    const isEmailUnique = async (email) => {
        // API Call
        const response = await axios
            .get(`/api/check_unique_email/${email}`)
            .catch((error) => {
                console.log(error);
                return false;
            });
        return response.data.unique;
    };

    const validateUsername = async () => {
        if (userName.trim() === "") {
            setusernameError("Username cannot be blank");
        } else if (!(await isUserNameUnique(userName))) {
            setusernameError("Username is taken");
            // API CALLS
        } else {
            setusernameError("");
        }
    };

    const validateEmail = async () => {
        if (email.trim() === "") {
            setemailError("Email cannot be blank");
        } else if (email.substring(email.lastIndexOf("@")) !== "@uow.edu.au") {
            setemailError('Email must end with "@uow.edu.au"');
        } else if (!(await isEmailUnique(email))) {
            setemailError("Email is taken");
        } else {
            setemailError("");
        }
    };
    return (
        <Card>
            <div className="mb-2 text-center block w-96 mx-4">
                <Label className="text-xl" value="Create an account" />
            </div>
            <form
                className="flex flex-col gap-4 w-full"
                onSubmit={validateSubmit}
            >
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="userName" value="Username" />
                    </div>
                    <TextInput
                        id="userName"
                        placeholder="username123"
                        required={true}
                        onBlur={(event) => {
                            validateUsername();
                        }}
                        onChange={(event) => {
                            setUserName(event.target.value);
                        }}
                        color={usernameError === "" ? "gray" : "failure"}
                        helperText={
                            <React.Fragment>
                                <span className="font-medium">
                                    {usernameError}
                                </span>
                            </React.Fragment>
                        }
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="UOW email" />
                    </div>
                    <TextInput
                        id="email"
                        placeholder="name@uow.edu.au"
                        required={true}
                        onBlur={(event) => {
                            validateEmail();
                        }}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        color={emailError === "" ? "gray" : "failure"}
                        helperText={
                            <React.Fragment>
                                <span className="font-medium">
                                    {emailError}
                                </span>
                            </React.Fragment>
                        }
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Password" />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        required={true}
                        onBlur={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="rePassword" value="Retype Password" />
                    </div>
                    <TextInput
                        id="rePassword"
                        type="password"
                        required={true}
                        onChange={(event) => setRePassword(event.target.value)}
                        color={
                            rePassword.trim() === ""
                                ? "gray"
                                : password !== rePassword
                                ? "failure"
                                : "success"
                        }
                        helperText={
                            <React.Fragment>
                                <span className="font-medium">
                                    {rePassword.trim() === ""
                                        ? ""
                                        : password !== rePassword
                                        ? "Passwords do not match"
                                        : "Passwords match"}
                                </span>
                            </React.Fragment>
                        }
                    />
                </div>
                <Button type="submit">Create Account</Button>
                <div className="mb-2 block">
                    <Label value="Already have an account? " />
                    <Link
                        to="/"
                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                        Sign In
                    </Link>
                </div>
            </form>
        </Card>
    );
}

export default SignUpCard;
