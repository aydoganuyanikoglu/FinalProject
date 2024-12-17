"use client";
import React, { useState, useEffect } from "react";
import { Navbar, Footer, NeedHelp } from "@/app/const";
import ReactStars from "react-stars";
import YouMightLike from "./YouMightLike";
import LeaveCommentForm from "./LeaveCommentForm";
import { useProduct } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { EmptyReview } from "@/app/components/EmptyComponents";
import Link from "next/link";
import {
  ReviewsSkeleton,
  ProductNameSkeleton,
  ProductDetailSkeleton,
  ProductBottomDetailsSkeleton,
} from "@/app/components/skeletons/Skeletons";

interface ProductDetailsProps {
  params: {
    id: string;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const handleReviewForm = () => {
    setShowReviewForm((prev) => !prev);
  };
  const { currentUser } = useAuth();
  const {
    handleFetchProductbyId,
    productById,
    handleAddToFavorites,
    handleFetchFavoriteProducts,
    favoriteProducts,
    handleRemoveFromFavorites,
    handleAddtoCart,
    cartButtonState,
    favoriteButtonState,
    handleFetchReviews,
    reviews,
    handleFetchReviewCount,
    reviewStats,
    loadingReviews,
    loading,
  } = useProduct();
  const [isLiked, setIsLiked] = useState<boolean | undefined>(false);
  const isDiscounted = productById?.price !== productById?.discount_price;

  useEffect(() => {
    handleFetchProductbyId(id);
  }, []);

  useEffect(() => {
    handleFetchReviews(id);
    handleFetchReviewCount(id);
  }, [reviews.length]);

  useEffect(() => {
    if (currentUser?.id) {
      handleFetchFavoriteProducts(currentUser.id);
    }
    const liked = favoriteProducts?.some(
      (item) => item.name === productById?.name
    );

    setIsLiked(liked);
  }, [currentUser, favoriteProducts?.length]);

  return (
    <div>
      <Navbar isFixed={false} />
      <div className="w-full flex justify-center">
        <div className="detailContainer w-[700px] py-[100px] max-md:w-[80%] max-smp:w-[100%] max-smp:px-[20px]">
          <div className="navigatorContainer flex gap-2">
            <Link
              className="w-fit text-[15px] text-gray-800 border-b-[1px] border-b-[#0000] hover:border-b-[#000]"
              href="/"
            >
              Home
            </Link>
            <span className="gray-400">|</span>
            <Link
              className="w-fit text-[15px] text-gray-800 border-b-[1px] border-b-[#0000] hover:border-b-[#000]"
              href="/products"
            >
              Products
            </Link>
            <span className="gray-400">|</span>
            {loading ? (
              <ProductNameSkeleton />
            ) : (
              <p className="font-normal text-[15px] text-gray-400">
                {productById?.name}
              </p>
            )}
          </div>
          {loading ? (
            <ProductDetailSkeleton />
          ) : (
            <div className="mt-10 upperContainer flex gap-5 max-md:flex-col max-md:justify-start">
              <div className="leftContainer relative">
                {isDiscounted && (
                  <div className="absolute left-1 top-2.5 z-1 flex justify-center items-center -rotate-45">
                    <div className="absolute !w-[70px] !h-[70px] rounded-[50%] bg-red-600"></div>
                    <p className="relative z-1 text-white font-bold text-[15px]">
                      {productById?.discount_percentage}%
                    </p>
                  </div>
                )}
                <div className="w-[300px] h-[300px] bg-gray-200 max-xs:w-full"></div>
              </div>
              <div className="rightContainer flex flex-col justify-between">
                <div className="rightTopContainer">
                  <h2 className="productName font-semibold text-[25px] max-md:text-[22px]">
                    {productById?.name}
                  </h2>
                  <div className="rating">
                    <ReactStars
                      count={5}
                      value={reviewStats.avgRating}
                      size={24}
                      color2={"#ffd700"}
                      edit={false}
                    />
                    <p>
                      {reviewStats.avgRating.toFixed(2)} / 5 (
                      {reviewStats.reviewCount} total reviews)
                    </p>
                  </div>
                </div>
                <div className="rightBottomContainer flex flex-col gap-1">
                  {isDiscounted ? (
                    <div className="h-[45px]">
                      <p className="text-[12px] line-through font-normal">
                        {productById?.price}$
                      </p>
                      <p className="text-[16px]">
                        {productById?.discount_price}$
                      </p>
                    </div>
                  ) : (
                    <div className="h-[45px] flex items-end">
                      <p className="text-[16px]">
                        {productById?.discount_price}$
                      </p>
                    </div>
                  )}
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        if (currentUser?.id && productById) {
                          if (isLiked) {
                            handleRemoveFromFavorites(
                              currentUser.id,
                              productById.id
                            );
                          } else {
                            handleAddToFavorites(currentUser.id, productById);
                          }
                        } else {
                          router.push("/login");
                        }
                      }}
                      className="productDetailButtons !w-[200px] !h-[50px] !bg-pink-700 !border-pink-700 hover:!bg-white hover:!text-pink-700"
                    >
                      {favoriteButtonState ? (
                        <CircularProgress size={20} className="text-black" />
                      ) : isLiked ? (
                        "Remove Like"
                      ) : (
                        "Add to Favorites"
                      )}
                    </button>
                    <button
                      className={`${
                        cartButtonState.loading
                          ? "loadingButton !rounded-[10px] !font-normal !text-[15px] !w-[200px] !h-[50px]"
                          : cartButtonState.added
                          ? "addedtoCartButton !rounded-[10px] !font-normal !text-[15px] !w-[200px] !h-[50px]"
                          : "addtoCartButton !rounded-[10px] !font-normal !text-[15px] !w-[200px] !h-[50px]"
                      }`}
                      disabled={cartButtonState.loading}
                      onClick={() => {
                        if (currentUser?.id && productById) {
                          handleAddtoCart(currentUser.id, productById);
                        } else {
                          router.push("/login");
                        }
                      }}
                    >
                      {cartButtonState.loading ? (
                        <CircularProgress size={20} className="text-white" />
                      ) : cartButtonState.added ? (
                        "Added to Cart"
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {loading ? (
            <ProductBottomDetailsSkeleton />
          ) : (
            <div>
              <div className="bottomContainer flex flex-col gap-3 mt-10">
                <h2 className="productInfoTitle w-fit font-normal text-[18px] border-b-[1.5px] border-black max-md:text-[16px]">
                  Product Information
                </h2>
                <p className="text-[14px] font-light">
                  {productById?.long_description}
                </p>
              </div>
              <div className="commentTopContainer mt-10 ">
                <h2 className="reviewsTitle w-fit font-normal text-[18px] border-b-[1.5px] border-black max-md:text-[16px]">
                  Reviews
                </h2>
                <div className="rating">
                  <div className="ratingTop flex items-center gap-1">
                    <ReactStars
                      count={5}
                      value={reviewStats.avgRating}
                      size={30}
                      color2={"#ffd700"}
                      edit={false}
                    />
                    <p className="text-[17px] font-light">
                      {reviewStats.avgRating.toFixed(2)}
                    </p>
                  </div>
                  <p className="totalReviewsContainer text-[15px] font-light">
                    Based on {reviewStats.reviewCount} reviews.
                  </p>
                  <div className="reviewContainer mt-2">
                    <button
                      onClick={() => handleReviewForm()}
                      className="leaveReviewButton"
                    >
                      Leave a Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showReviewForm && (
            <LeaveCommentForm id={id as string} onclose={handleReviewForm} />
          )}
          <div className="commentBottomContainer mt-10">
            {loadingReviews ? (
              <ReviewsSkeleton />
            ) : reviews.length === 0 ? (
              <EmptyReview />
            ) : (
              <ul className="userReviewsContainer">
                {reviews.map((item, index) => (
                  <li
                    key={index}
                    className="w-full py-5 border-t-[1px] border-gray-600"
                  >
                    <div className="reviewerNameContainer flex items-center gap-1 text-[14px] font-light">
                      <p>{item.user_name} -</p>
                      <p>
                        {item.created_at &&
                          new Intl.DateTimeFormat("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }).format(new Date(item.created_at))}
                      </p>
                    </div>
                    <div className="starsRating">
                      <ReactStars
                        count={5}
                        value={5}
                        size={24}
                        color2={"#ffd700"}
                        edit={false}
                      />
                    </div>
                    <h2 className="reviewTitle mt-3 text-[20px] max-md:text-[17px] font-bold">
                      {item.review_title}
                    </h2>
                    <p className="mt-2 text-[14px] font-light">{item.review}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <YouMightLike />
        </div>
      </div>
      <NeedHelp />
      <Footer />
    </div>
  );
};

export default ProductDetails;
