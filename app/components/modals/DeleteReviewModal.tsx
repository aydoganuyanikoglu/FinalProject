"use client";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { ReviewsType } from "@/lib/types";
import { useToast } from "@/context/ToastContext";
import { removeReviewviaAdmin } from "@/lib/data";

interface DeleteProductProps {
  review: ReviewsType | null;
  onClose: () => void;
  productName: string | null;
}

const DeleteReviewModal: React.FC<DeleteProductProps> = ({
  review,
  onClose,
  productName,
}) => {
  const { showToast } = useToast();

  const handleConfirmDelete = async () => {
    if (review) {
      await removeReviewviaAdmin(review);
      showToast(`Removed "${review?.review_title}" review successfully!`);
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      className="youSureContainer fixed z-[100] left-0 top-0 w-[100vw] h-[100vh] flex justify-center items-center backdrop-blur-md"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="innerContainer w-[350px] h-[200px] flex flex-col items-center justify-center p-5 gap-5 bg-white shadow-md rounded-xl"
      >
        <p className="message text-[15px] font-semibold text-center text-gray-700">
          Are you sure you want to delete "{review?.review_title}" by user{" "}
          {review?.user_name} for the "{productName}"?
        </p>
        <div className="flex gap-2">
          <div
            className="acceptContainer flex gap-2 p-3 bg-green-400 text-white hover:bg-green-700 rounded-sm cursor-pointer"
            onClick={handleConfirmDelete}
          >
            <p className="text-[15px] font-semibold">Yes</p>
            <ThumbUpIcon className="text-[20px]" />
          </div>
          <div
            className="declineContainer flex gap-2 p-3 bg-red-500 text-white hover:bg-red-700 rounded-sm cursor-pointer"
            onClick={onClose}
          >
            <p className="text-[15px] font-semibold">No</p>
            <ThumbDownIcon className="text-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
