"use client";

import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  return <Button onClick={() => signIn()}>Sign in</Button>;
};

export default SignInButton;
