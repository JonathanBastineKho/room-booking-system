import React, { useState } from "react";
import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";

function LoginCard() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-sm">
      <Card className="bg-gray-800">
        <div className="mb-2 text-center block">
          <Label className="text-xl" value="Sign in to your account" />
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
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">Sign In</Button>
          <div className="mb-2 block">
            <Label value="Not registered? " />
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Create account
            </a>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default LoginCard;
