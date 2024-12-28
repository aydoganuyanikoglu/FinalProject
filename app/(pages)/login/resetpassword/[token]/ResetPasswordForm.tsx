"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { updatePassword } from "@/auth/auth";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const { showToast } = useToast();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const onSubmit = async ({ password }: { password: string }) => {
    setIsButtonLoading(true);
    try {
      const response = await updatePassword({ password, token });
      if (response.case === "invalidtoken") {
        toast.error(response.message);
      } else if (response.case === "samepassword") {
        toast.error(response.message);
      } else if ((response.case = "success")) {
        showToast("Password has been changed successfully");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error while updating your password!", error);
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <div className="w-[500px] h-fit py-[50px] border-[1px] border-gray-200 rounded-md flex flex-col gap-7 items-center px-[40px] max-sm:w-full max-sm:px-[10px]">
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="w-full flex flex-col gap-3">
            <h2 className="text-[16px] max-md:text-[14px] text-gray-600 text-center">
              Please enter your new password down below.
            </h2>
            <div>
              <Field
                className="loginRegisterInputs !h-[65px]"
                type="password"
                name="password"
                placeholder="New Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="inputErrorMessages"
              />
            </div>
            <div>
              <Field
                className="loginRegisterInputs !h-[65px]"
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
              />
              <ErrorMessage
                name="confirmPassword"
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
                <span>Change Password</span>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
