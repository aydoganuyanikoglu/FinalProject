"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useAuth } from "@/context/AuthContext";
import { typeUsers } from "@/lib/types";

const ProfileInfo = () => {
  const [isPending, setIsPending] = useState(false);
  const { currentUser } = useAuth();
  const [user, setUser] = useState<typeUsers>();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      console.log(user);
    }
  }, [currentUser]);

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .min(2, "Firstname must be at least 2 characters")
      .matches(/^[A-Za-z]+$/, "Firstname cannot contain numbers")
      .required("Firstname is required"),
    lastname: Yup.string()
      .min(2, "Lastname must be at least 2 characters")
      .matches(/^[A-Za-z]+$/, "Lastname can't contain numbers")
      .required("Lastname is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsPending(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Updated Profile:", values);
      setIsPending(false);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full h-fit p-6 bg-white rounded shadow-md"
    >
      <h2 className="text-[24px] max-md:text-[21px] font-bold mb-4">
        Profile Information
      </h2>
      <p className="text-[16px] max-md:text-[14px] text-gray-600">
        To keep your experience on our platform at its best, please update your
        profile information here if it is needed.
      </p>

      <div className="mt-4 mb-4">
        <label
          className="block text-[13px] font-medium text-gray-700"
          htmlFor="firstname"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="loginRegisterInputs"
          placeholder="First Name"
        />
        {formik.touched.firstname && formik.errors.firstname ? (
          <div className="inputErrorMessages">{formik.errors.firstname}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label
          className="block text-[13px] font-medium text-gray-700"
          htmlFor="lastname"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="loginRegisterInputs"
          placeholder="Last Name"
        />
        {formik.touched.lastname && formik.errors.lastname ? (
          <div className="inputErrorMessages">{formik.errors.lastname}</div>
        ) : null}
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isPending}
        className="loginRegisterButton"
      >
        {isPending ? (
          <CircularProgress size={20} className="!text-white" />
        ) : (
          "Update"
        )}
      </Button>
    </form>
  );
};

export default ProfileInfo;
