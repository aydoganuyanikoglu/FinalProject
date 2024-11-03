import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const ProfileInfo = () => {
  const [isPending, setIsPending] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Firstname must be at least 2 characters")
      .matches(/^[A-Za-z]+$/, "Firstname cannot contain numbers")
      .required("Firstname is required"),
    lastName: Yup.string()
      .min(2, "Lastname must be at least 2 characters")
      .matches(/^[A-Za-z]+$/, "Lastname can't contain numbers")
      .required("Lastname is required"),
    birthDate: Yup.date()
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "You must be at least 18 years old"
      )
      .required("Date of Birth is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "Aydoğan",
      lastName: "Uyanıkoğlu",
      birthDate: "",
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
      <p className="text-gray-600">
        To keep your experience on our platform at its best, please update your
        profile information here if it is needed.
      </p>

      <div className="mt-4 mb-4">
        <label
          className="block text-[13px] font-medium text-gray-700"
          htmlFor="firstName"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="loginRegisterInputs"
          placeholder="First Name"
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="inputErrorMessages">{formik.errors.firstName}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label
          className="block text-[13px] font-medium text-gray-700"
          htmlFor="lastName"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="loginRegisterInputs"
          placeholder="Last Name"
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="inputErrorMessages">{formik.errors.lastName}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label
          className="block text-[13px] font-medium text-gray-700"
          htmlFor="birthDate"
        >
          Date of Birth
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={formik.values.birthDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="loginRegisterInputs"
        />
        {formik.touched.birthDate && formik.errors.birthDate ? (
          <div className="inputErrorMessages">{formik.errors.birthDate}</div>
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
