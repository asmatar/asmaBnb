import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In",
  description: "Sign in to the application",
};

const Signin = () => {
  return <SignIn />;
};

export default Signin;
