import React from "react";

const RegisterForm = () => {
  return (
    <>
      <form className="w-full flex flex-col gap-3" action="">
        <input
          className="loginRegisterInputs"
          type="text"
          name="name"
          placeholder="Name"
        />
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
        <button className="loginRegisterButton">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
