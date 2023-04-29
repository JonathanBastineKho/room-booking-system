import React, { useState } from "react";
import {
  Card,
  Label,
  TextInput,
  Checkbox,
  Button,
  Toast,
} from "flowbite-react";
import { HiExclamation } from "react-icons/hi";

function SignUpCard() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");

  const checkTakenUserNames = (userName) => {
    const takenUserNames = ["aaa", "bbb", "ccc"];
    // api call (query user db with userName)
    // 1
    return takenUserNames.includes(userName);
  };

  return (
    <div className="max-w-sm">
      <Card className="bg-gray-800">
        <div className="mb-2 text-center block">
          <Label className="text-xl" value="Create an account" />
        </div>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="userName" value="Username" />
            </div>
            <TextInput
              id="userName"
              placeholder="username123"
              required={true}
              onChange={(event) => setUserName(event.target.value)}
              color={
                userName.trim() == ""
                  ? "gray"
                  : checkTakenUserNames(userName)
                  ? "failure"
                  : "gray"
              }
              helperText={
                <React.Fragment>
                  <span className="font-medium">
                    {userName.trim() == ""
                      ? ""
                      : checkTakenUserNames(userName)
                      ? "Username already taken"
                      : ""}
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
              onChange={(event) => setEmail(event.target.value)}
              color={
                email.trim() == ""
                  ? "gray"
                  : email.substring(email.lastIndexOf("@")) == "@uow.edu.au"
                  ? "gray"
                  : "failure"
              }
              helperText={
                <React.Fragment>
                  <span className="font-medium">
                    {email.trim() == ""
                      ? ""
                      : email.substring(email.lastIndexOf("@")) == "@uow.edu.au"
                      ? ""
                      : 'Email must end with "@uow.edu.au"'}
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
              onChange={(event) => setPassword(event.target.value)}
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
                rePassword.trim() == ""
                  ? "gray"
                  : password != rePassword
                  ? "failure"
                  : "success"
              }
              helperText={
                <React.Fragment>
                  <span className="font-medium">
                    {rePassword.trim() == ""
                      ? ""
                      : password != rePassword
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
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Sign In
            </a>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default SignUpCard;
