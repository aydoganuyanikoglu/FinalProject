"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { styles } from "../const";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const SendMessage = () => {
  const [isSending, setIsSending] = useState(false);
  const { showToast } = useToast();
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

  const handleSubmit = (
    values: {
      name: string;
      email: string;
      message: string;
    },
    resetForm: any
  ) => {
    setIsSending(true);

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message,
        },
        publicKey
      )
      .then(
        (response) => {
          showToast("Message sent successfully");
          console.log("SUCCESS!", response.status, response.text);
          setIsSending(false);
          resetForm();
        },
        (error) => {
          showToast("Failed to send message");
          console.log("FAILED...", error);
          setIsSending(false);
        }
      );
  };

  return (
    <section
      className={`w-full h-fit py-[100px] bg-white text-white ${styles.pagePaddingX}`}
    >
      <div className="w-full h-fit flex flex-col gap-3 items-center p-[50px] bg-blue-700 max-md:px-[20px]">
        <h2 className="text-[24px] font-bold max-md:text-[20px]">
          Send Your Message!
        </h2>
        <p className="text-[14px] font-normal text-gray-300 max-md:text-[12px]">
          You can send your message easily down below.
        </p>
        <Formik
          initialValues={{
            name: "",
            email: "",
            message: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, resetForm);
          }}
        >
          <Form className="mt-5 flex flex-col items-center gap-3 w-[60%] max-md:w-full">
            <div className="w-full">
              <Field
                className="sendMessageInputs"
                type="text"
                name="name"
                placeholder="Name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="inputErrorMessages"
              />
            </div>
            <div className="w-full">
              <Field
                className="sendMessageInputs"
                type="email"
                name="email"
                placeholder="E-mail"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="inputErrorMessages"
              />
            </div>
            <div className="w-full">
              <Field
                className="sendMessageInputs min-h-[200px] !pt-3"
                as="textarea"
                name="message"
                placeholder="Your Message..."
              />
              <ErrorMessage
                name="message"
                component="div"
                className="inputErrorMessages"
              />
            </div>
            <button type="submit" className="myButton2" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default SendMessage;
