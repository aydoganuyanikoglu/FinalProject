"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { profileUpdatePassword } from "@/auth/auth";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { currentUser } = useAuth();

  const toggleShowCurrentPassword = () =>
    setShowCurrentPassword(!showCurrentPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!currentUser) {
        toast.error("You need to be logged in to update your password.");
        return;
      }
      const response = await profileUpdatePassword(
        currentUser.id,
        values.currentPassword,
        values.newPassword
      );
      if (response.success) {
        toast.success(response.message);
        formik.resetForm();
      } else {
        toast.error(response.message);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full h-fit flex flex-col gap-5 max-w-md p-6 bg-white rounded shadow-md"
    >
      <h2 className="text-[24px] max-md:text-[21px] font-bold">
        Change Password
      </h2>
      <p className="text-[16px] max-md:text-[14px] text-gray-600">
        Your password must contain at least one letter, one number, and one
        special character. It must also be at least 8 characters long.
      </p>
      <div className="currentPasswordContainer">
        <label
          className="text-[13px] font-medium text-gray-700"
          htmlFor="currentPassword"
        >
          Current Password
        </label>
        <div className="relative w-full">
          <input
            className="loginRegisterInputs"
            id="currentPassword"
            name="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="absolute right-2 top-3">
            <IconButton onClick={toggleShowCurrentPassword}>
              {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </div>
        {formik.touched.currentPassword && formik.errors.currentPassword && (
          <p className="inputErrorMessages">{formik.errors.currentPassword}</p>
        )}
      </div>
      <div className="newPasswordContainer">
        <label
          className="text-[13px] font-medium text-gray-700"
          htmlFor="newPassword"
        >
          New Password
        </label>
        <div className="relative w-full">
          <input
            className="loginRegisterInputs"
            id="newPassword"
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="absolute right-2 top-3">
            <IconButton onClick={toggleShowNewPassword}>
              {showNewPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </div>
        {formik.touched.newPassword && formik.errors.newPassword && (
          <p className="inputErrorMessages">{formik.errors.newPassword}</p>
        )}
      </div>
      <p className="text-[16px] max-md:text-[14px] text-gray-500 mb-6">
        For your security, do not include your name, surname, or date of birth
        in your password.
      </p>
      <button className="loginRegisterButton" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? (
          <CircularProgress size={20} className="!text-black" />
        ) : (
          "Update"
        )}
      </button>
    </form>
  );
};

export default ChangePassword;
