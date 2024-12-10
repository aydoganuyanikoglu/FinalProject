"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addressesType } from "@/lib/types";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { useAuth } from "@/context/AuthContext";
import { addAddressToDatabase } from "@/lib/data";
import { useToast } from "@/context/ToastContext";
import { CircularProgress } from "@mui/material";

interface AddNewAddressModalProps {
  onClose: () => void;
}

const AddNewAddressModal: React.FC<AddNewAddressModalProps> = ({ onClose }) => {
  const { showToast } = useToast();
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits.")
      .required("Phone number is required."),
    city: Yup.string().required("City is required."),
    district: Yup.string().required("District is required."),
    neighborhood: Yup.string().required("Neighborhood is required."),
    postalcode: Yup.string().required("Postal Code is required."),
    addresstitle: Yup.string().required("Address title is required."),
    address: Yup.string().required("Address is required."),
  });

  const { currentUser } = useAuth();
  const handleSubmit = async (values: addressesType) => {
    try {
      if (currentUser?.id) {
        await addAddressToDatabase(values, currentUser.id);
        showToast("You added an address!");
        onClose();
      }
    } catch (error) {
      console.error("error while adding address to database");
      onClose();
    }
  };
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-50 max-sm:px-[20px]"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-white h-fit w-[600px] p-6 rounded-md shadow-md max-sm:h-[400px] max-sm:w-full overflow-y-auto"
      >
        <div className="flex items-center gap-2 ">
          <AddHomeIcon className="text-[20px] text-orange-600 !transition-none max-md:text-[16px]" />
          <h2 className="text-[19px] font-bold max-md:text-[15px]">
            Add New Address
          </h2>
        </div>
        <Formik
          initialValues={{
            name: "",
            phone: "",
            city: "",
            district: "",
            neighborhood: "",
            postalcode: "",
            addresstitle: "",
            address: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 mt-4">
              <div className="flex w-full gap-2">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Field name="name" className="loginRegisterInputs" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="inputErrorMessages"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <Field name="phone" className="loginRegisterInputs" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="inputErrorMessages"
                  />
                </div>
              </div>
              <div className="flex w-full gap-2">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">City</label>
                  <Field name="city" className="loginRegisterInputs" />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="inputErrorMessages"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    District
                  </label>
                  <Field name="district" className="loginRegisterInputs" />
                  <ErrorMessage
                    name="district"
                    component="div"
                    className="inputErrorMessages"
                  />
                </div>
              </div>
              <div className="flex w-full gap-2">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    Neighborhood
                  </label>
                  <Field name="neighborhood" className="loginRegisterInputs" />
                  <ErrorMessage
                    name="neighborhood"
                    component="div"
                    className="inputErrorMessages"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    Postal Code
                  </label>
                  <Field name="postalcode" className="loginRegisterInputs" />
                  <ErrorMessage
                    name="postalcode"
                    component="div"
                    className="inputErrorMessages"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address Title
                </label>
                <Field name="addresstitle" className="loginRegisterInputs" />
                <ErrorMessage
                  name="addresstitle"
                  component="div"
                  className="inputErrorMessages"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <Field
                  as="textarea"
                  name="address"
                  className="loginRegisterInputs !min-h-[120px]"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="inputErrorMessages"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 w-[100px] bg-gray-500 text-white rounded-md text-[13px] border-[1px] border-gray-500 hover:text-gray-600 hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 w-[100px] bg-orange-600 text-white rounded-md text-[13px] border-[1px] border-orange-600 hover:text-orange-600 hover:bg-white"
                >
                  {isSubmitting ? (
                    <CircularProgress size={20} className="text-black" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddNewAddressModal;
