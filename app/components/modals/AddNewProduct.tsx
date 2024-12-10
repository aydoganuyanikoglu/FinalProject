import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Productstype2 } from "@/lib/types";
import { useProduct } from "@/context/ProductContext";
import { useToast } from "@/context/ToastContext";
import { CircularProgress } from "@mui/material";

interface AddProductModalProps {
  onClose: () => void;
}

const AddNewProduct: React.FC<AddProductModalProps> = ({ onClose }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const { showToast } = useToast();
  const { handleAddProductToDatabase } = useProduct();
  const categories = [
    "Mobile & Wearable Tech",
    "Drones & Cameras",
    "Tablets",
    "Headphones & Speakers",
    "Computers",
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("Product Name is required"),
    category: Yup.string().required("Category is required"),
    short_description: Yup.string().required("Short Description is required"),
    long_description: Yup.string().required("Long Description is required"),
    price: Yup.number().required("Product Price is required").positive(),
    image_url: Yup.string()
      .url("Invalid URL")
      .required("Product Image is required"),
    discount_percentage: Yup.number()
      .positive()
      .max(100, "Max 100%")
      .nullable(),
    discount_start_date: Yup.date()
      .nullable()
      .min(new Date(), "Discount Start Date can't be in the past"),
    discount_end_date: Yup.date()
      .nullable()
      .min(
        Yup.ref("discount_start_date"),
        "End Date can't be before Start Date"
      )
      .min(
        new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        "Discount End Date must be at least one week after the Start Date"
      ),
    brand: Yup.string().required("Product Brand is required"),
  });

  const handleSubmit = async (values: Productstype2) => {
    setButtonLoading(true);
    try {
      await handleAddProductToDatabase(values);
      setButtonLoading(false);
      showToast("Product added successfuly!");
    } catch (error) {
      console.error("error while adding to db!");
      setButtonLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="youSureContainer fixed z-[100] left-0 top-0 w-[100vw] h-[100vh] flex justify-center items-center backdrop-blur-md "
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="modal-content relative w-[500px] bg-white rounded-md p-2 text-black"
      >
        <button className="close-btn absolute right-3 top-1" onClick={onClose}>
          x
        </button>
        <h2 className="text-[20px] font-bold text-[#0d5967]">
          Add New Product
        </h2>
        <Formik
          initialValues={{
            name: "",
            category: "",
            short_description: "",
            long_description: "",
            price: "",
            image_url: "",
            discount_percentage: null,
            discount_start_date: null,
            discount_end_date: null,
            brand: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values: Productstype2) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="form flex flex-col gap-3 mt-10">
              <div>
                <Field
                  className="loginRegisterInputs"
                  name="name"
                  placeholder="Product Name"
                />
                {errors.name && touched.name && (
                  <div className="inputErrorMessages">{errors.name}</div>
                )}
              </div>
              <div>
                <Field
                  className="loginRegisterInputs"
                  as="select"
                  name="category"
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>
                {errors.category && touched.category && (
                  <div className="inputErrorMessages">{errors.category}</div>
                )}
              </div>
              <div>
                <Field
                  className="loginRegisterInputs"
                  name="short_description"
                  placeholder="Short Description"
                />
                {errors.short_description && touched.short_description && (
                  <div className="inputErrorMessages">
                    {errors.short_description}
                  </div>
                )}
              </div>
              <div>
                <Field
                  className="loginRegisterInputs"
                  name="long_description"
                  placeholder="Long Description"
                />
                {errors.long_description && touched.long_description && (
                  <div className="inputErrorMessages">
                    {errors.long_description}
                  </div>
                )}
              </div>
              <div>
                <Field
                  className="loginRegisterInputs"
                  name="price"
                  placeholder="Product Price"
                  type="number"
                />
                {errors.price && touched.price && (
                  <div className="inputErrorMessages">{errors.price}</div>
                )}
              </div>
              <div>
                <Field
                  className="loginRegisterInputs"
                  name="image_url"
                  placeholder="Product Image URL"
                />
                {errors.image_url && touched.image_url && (
                  <div className="inputErrorMessages">{errors.image_url}</div>
                )}
              </div>
              <div>
                <Field
                  className="loginRegisterInputs"
                  name="discount_percentage"
                  placeholder="Discount Percentage (not mandatory)"
                  type="number"
                />
                {errors.discount_percentage && touched.discount_percentage && (
                  <div className="inputErrorMessages">
                    {errors.discount_percentage}
                  </div>
                )}
              </div>
              <div>
                <label className="text-[12px] text-[#0d5967]">
                  Discount Start Date (not mandatory)
                </label>
                <Field
                  className="loginRegisterInputs"
                  name="discount_start_date"
                  placeholder="Discount Start Date"
                  type="date"
                />
                {errors.discount_start_date && touched.discount_start_date && (
                  <div className="inputErrorMessages">
                    {errors.discount_start_date}
                  </div>
                )}
              </div>
              <div>
                <label className="text-[12px] text-[#0d5967]">
                  Discount End Date (not mandatory)
                </label>
                <Field
                  className="loginRegisterInputs"
                  name="discount_end_date"
                  placeholder="Discount End Date"
                  type="date"
                />
                {errors.discount_end_date && touched.discount_end_date && (
                  <div className="inputErrorMessages">
                    {errors.discount_end_date}
                  </div>
                )}
              </div>
              <div>
                <Field
                  className="loginRegisterInputs"
                  name="brand"
                  placeholder="Product Brand"
                />
                {errors.brand && touched.brand && (
                  <div className="inputErrorMessages">{errors.brand}</div>
                )}
              </div>
              <button type="submit" className="addtoCartButton">
                {buttonLoading ? (
                  <CircularProgress size={20} className="text-black" />
                ) : (
                  <p className="text-[14px]">Add Product</p>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddNewProduct;
