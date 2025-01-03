"use client";
import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { useProduct } from "@/context/ProductContext";
import { toast } from "react-toastify";
import { isProductInOrder } from "@/lib/data";

const ReactStars = dynamic(() => import("react-stars"), { ssr: false });

interface LeaveCommentFormProps {
  id: string;
  productname: string | undefined;
  onclose: () => void;
}

const LeaveCommentForm: React.FC<LeaveCommentFormProps> = ({
  id,
  onclose,
  productname,
}) => {
  const [isPurchased, setisPurchased] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { handleAddReview, reviews } = useProduct();
  const isReviewed = reviews.some(
    (review) => review.user_id === currentUser?.id
  );

  const checkIsPurchased = async () => {
    try {
      const result = await isProductInOrder(currentUser?.id, productname);
      setisPurchased(result);
    } catch (error) {
      console.error("error while checkin..", error);
    }
  };

  useEffect(() => {
    checkIsPurchased();
  }, [currentUser, productname]);

  return (
    <Formik
      initialValues={{
        rating: 0,
        title: "",
        review: "",
      }}
      validationSchema={Yup.object({
        rating: Yup.number()
          .min(1, "Please add a rating.")
          .required("Rating is required."),
        title: Yup.string()
          .max(50, "Title must be 50 characters or less.")
          .required("Title is required."),
        review: Yup.string()
          .max(1000, "Review must be 1000 characters or less.")
          .required("Review is required."),
      })}
      onSubmit={(values) => {
        if (!isPurchased) {
          toast.error("You need to order the product to leave a comment!");
          onclose();
        } else if (isReviewed) {
          toast.error(
            "You can not leave more than one comment to same product!"
          );
          onclose();
        } else {
          if (currentUser?.id) {
            handleAddReview(
              values,
              currentUser.id,
              currentUser.firstname,
              id,
              productname
            );
            toast.success("Your have submitted your comment successfully!");
            onclose();
          }
        }
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="mt-10 w-full p-4 border rounded-lg shadow-sm bg-white">
          <div className="mb-4">
            <label htmlFor="rating" className="block mb-1 font-light">
              Add a rating
            </label>
            <ReactStars
              count={5}
              size={30}
              color2="#37006e"
              half={false}
              value={values.rating}
              onChange={(newRating) => setFieldValue("rating", newRating)}
            />
            <ErrorMessage
              name="rating"
              component="div"
              className="inputErrorMessages"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1 font-light">
              Review title
            </label>
            <Field
              name="title"
              type="text"
              className="sendMessageInputs"
              placeholder="Enter a title"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="inputErrorMessages"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="review" className="block mb-1 font-light">
              Review
            </label>
            <Field
              name="review"
              as="textarea"
              rows={5}
              className="sendMessageInputs !pt-3 min-h-[150px]"
              placeholder="Write your review..."
            />
            <ErrorMessage
              name="review"
              component="div"
              className="inputErrorMessages"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onclose}
              type="reset"
              className="px-4 py-2 text-purple-600 border border-purple-600 rounded text-[13px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700 text-[13px]"
            >
              Publish
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LeaveCommentForm;
