"use client";
import React, { useState, useEffect } from "react";
import { fetchAllProductsReviews, fetchProductNamesandId } from "@/lib/data";
import { ProductNameId, ReviewsType } from "@/lib/types";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteReviewModal from "@/app/components/modals/DeleteReviewModal";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState<ReviewsType[]>([]);
  const [products, setProducts] = useState<ProductNameId[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ReviewsType | null>(null);
  const [selectedProductName, setSelectedProductName] = useState<string | null>(
    null
  );

  const handleFetchReviews = async () => {
    try {
      const results = await fetchAllProductsReviews();
      setReviews(results);
      const returnProducts = await fetchProductNamesandId();
      setProducts(returnProducts);
    } catch (error) {
      console.error("error while fetching reviews..");
    }
  };

  const handleClickModal = (review: ReviewsType, productName: string) => {
    setSelectedItem(review);
    setSelectedProductName(productName);
    setShowReviewModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowReviewModal(false);
    setSelectedItem(null);
    setSelectedProductName(null);
    handleFetchReviews();
  };

  useEffect(() => {
    handleFetchReviews();
  }, []);

  return (
    <div className="userManagementContainer w-full h-fit min-h-[800px] p-5 bg-[#4048b9] rounded-md">
      {showReviewModal && (
        <DeleteReviewModal
          review={selectedItem}
          onClose={handleCloseDeleteModal}
          productName={selectedProductName}
        />
      )}
      <h2 className="w-fit text-[16px] font-bold border-b-white border-b-[1.5px]">
        All Reviews
      </h2>
      <div className="userInfosContainer w-full mt-5">
        <ul className="w-full grid grid-cols-2 gap-4">
          {reviews.map((item, index) => {
            const productName =
              products.find((product) => product.id === item.product_id)
                ?.name || "Unknown Product";
            return (
              <li
                onClick={() => handleClickModal(item, productName)}
                key={index}
                className="relative w-full h-[200px] max-h-[200px] px-2 py-1 border-[2px] border-white rounded-md overflow-y-auto"
              >
                <div
                  className={`removeReviewContainer absolute right-2 top-3 w-fit h-fit flex items-center gap-1 p-2 rounded-md bg-red-500 cursor-pointer`}
                >
                  <DeleteIcon className="text-white text-[20px]" />
                  <p className="text-[13px] text-white">Remove</p>
                </div>
                <h2 className="productTitle font-bold">{productName}</h2>
                <p className="text-[12px] font-light italic">
                  by {item.user_name}
                </p>
                <p className="mt-2 text-[15px] font-semibold">
                  {item.review_title}
                </p>
                <p className="text-[13px]">{item.review}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ReviewManagement;
