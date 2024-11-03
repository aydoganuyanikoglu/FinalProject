import React from "react";
import Link from "next/link";

const LoginForm = () => {
  return (
    <>
      <form className="w-full flex flex-col gap-3" action="">
        <input
          className="loginRegisterInputs"
          type="email"
          name="email"
          placeholder="E-mail address"
        />
        <input
          className="loginRegisterInputs"
          type="password"
          name="password"
          placeholder="Password"
        />
        <Link
          className="text-[12px] text-orange-600 w-fit border-b-[1px] border-orange-600 hover:scale-90"
          href="#"
        >
          Forgot Password?
        </Link>
        <button className="loginRegisterButton">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
