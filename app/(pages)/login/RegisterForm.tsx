"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { typeUsers } from "@/lib/types";
import { signup } from "@/auth/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values: typeUsers) => {
    setIsButtonLoading(true);
    const formState = await signup(values);
    if (formState?.message) {
      setIsButtonLoading(false);
      alert(formState.message);
    } else {
      setIsButtonLoading(false);
      toast.success("Registration successful!");
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="w-full flex flex-col gap-3">
          <div>
            <Field
              className="loginRegisterInputs"
              type="text"
              name="firstName"
              placeholder="First Name"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="inputErrorMessages"
            />
          </div>
          <div>
            <Field
              className="loginRegisterInputs"
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="inputErrorMessages"
            />
          </div>
          <div>
            <Field
              className="loginRegisterInputs"
              type="email"
              name="email"
              placeholder="E-mail address"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="inputErrorMessages"
            />
          </div>
          <div>
            <Field
              className="loginRegisterInputs"
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="inputErrorMessages"
            />
          </div>
          <button
            type="submit"
            disabled={isButtonLoading}
            className="loginRegisterButton"
          >
            {isButtonLoading ? (
              <CircularProgress size={20} className="!text-black" />
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;