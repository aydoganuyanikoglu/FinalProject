import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "@/context/AuthContext";
import { typeLogin } from "@/lib/types";
import { loginServer } from "@/auth/auth";
import { useToast } from "@/context/ToastContext";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const { showToast } = useToast();
  const { loginClient } = useAuth();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values: typeLogin) => {
    setIsButtonLoading(true);
    const formState = await loginServer(values.email, values.password);

    if (formState?.message) {
      setIsButtonLoading(false);
      toast.error(formState.message);
    } else if (formState?.user) {
      setIsButtonLoading(false);
      loginClient();
      showToast("You successfully logged in!");
    }
  };

  return (
    <Formik
      initialValues={{
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
          <Link
            className="text-[12px] text-orange-600 w-fit border-b-[1px] border-orange-600 hover:scale-90"
            href="/login/forgotpassword"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="loginRegisterButton"
            disabled={isButtonLoading}
          >
            {isButtonLoading ? (
              <CircularProgress size={20} className="!text-black" />
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
