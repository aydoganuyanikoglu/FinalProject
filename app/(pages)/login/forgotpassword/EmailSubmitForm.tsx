"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import axios from "axios";
import { mailAction } from "@/auth/auth";

const EmailSubmitForm = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const onSubmit = async ({ email }: { email: string }) => {
    setIsButtonLoading(true);
    try {
      await mailAction(email);
      toast.success("Email sent successfully!");
    } catch (error) {
      console.error("Error while sending verification email:", error);
      toast.error("User could not found.");
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <div className="w-[500px] h-fit py-[50px] border-[1px] border-gray-200 rounded-md flex flex-col gap-7 items-center px-[40px] max-sm:w-full max-sm:px-[10px]">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="w-full flex flex-col gap-3">
            <h2 className="text-[16px] max-md:text-[14px] text-gray-600 text-center">
              To change your password please send a verification link to your
              email down below!
            </h2>
            <div>
              <Field
                className="loginRegisterInputs !h-[65px]"
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
            <button
              type="submit"
              disabled={isButtonLoading}
              className="loginRegisterButton"
            >
              {isButtonLoading ? (
                <CircularProgress size={20} className="!text-black" />
              ) : (
                <span>Send Email</span>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmailSubmitForm;
