"use client";
import React, { useState } from "react";
import { Navbar, Footer, NeedHelp } from "@/app/const";
import ReactStars from "react-stars";
import YouMightLike from "./YouMightLike";
import LeaveCommentForm from "./LeaveCommentForm";

const ProductDetails = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const handleReviewForm = () => {
    setShowReviewForm((prev) => !prev);
  };
  const product = {
    name: "Example Product",
    rating: 4.2,
    totalReviews: 120,
  };

  const reviews = [
    {
      title: "Awesome Product!",
      nickname: "Aydoğan Uyanıkoğlu",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "18 April 2024",
    },
    {
      title: "Amazing!",
      nickname: "Atakan Erçetin",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "25 March 2024",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="w-full flex justify-center">
        <div className="detailContainer w-[700px] py-[100px] max-md:w-[80%] max-smp:w-[100%] max-smp:px-[20px]">
          <div className="upperContainer flex gap-5 max-md:flex-col max-md:justify-start">
            <div className="leftContainer">
              <div className="w-[300px] h-[300px] bg-gray-200 max-xs:w-full"></div>
            </div>
            <div className="rightContainer flex flex-col justify-between">
              <div className="rightTopContainer">
                <h2 className="productName font-semibold text-[25px] max-md:text-[22px]">
                  JP - Space Tablet 10.4" Wi-Fi 32GB
                </h2>
                <div className="rating">
                  <ReactStars
                    count={5}
                    value={product.rating}
                    size={24}
                    color2={"#ffd700"}
                    edit={false}
                  />
                  <p>
                    {product.rating} / 5 ({product.totalReviews} değerlendirme)
                  </p>
                </div>
              </div>
              <div className="rightBottomContainer flex flex-col gap-1">
                <p className="productPrice font-normal text-[17px] max-md:text-[15px]">
                  85.00$
                </p>
                <div className="flex gap-1">
                  <button className="productDetailButtons !bg-pink-700 !border-pink-700 hover:!bg-white hover:!text-pink-700">
                    Add to Favorites!
                  </button>
                  <button className="productDetailButtons">Add to Cart!</button>
                </div>
              </div>
            </div>
          </div>
          <div className="bottomContainer flex flex-col gap-3 mt-10">
            <h2 className="productInfoTitle w-fit font-normal text-[18px] border-b-[1.5px] border-black max-md:text-[16px]">
              Product Information
            </h2>
            <p className="text-[14px] font-light">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
              repellat explicabo, consectetur reprehenderit inventore doloribus
              quos mollitia perspiciatis repellendus tempora neque facere est
              eveniet assumenda. Iusto id similique non dicta fuga, recusandae
              ad repudiandae voluptatibus, laudantium blanditiis ullam
              voluptatem beatae sequi rerum accusantium provident nobis sed vel
              quaerat laborum exercitationem.
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
                  value={product.rating}
                  size={30}
                  color2={"#ffd700"}
                  edit={false}
                />
                <p className="text-[17px] font-light">{product.rating}</p>
              </div>
              <p className="totalReviewsContainer text-[15px] font-light">
                Based on {product.totalReviews} reviews.
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
          {showReviewForm && <LeaveCommentForm onclose={handleReviewForm} />}
          <div className="commentBottomContainer mt-10">
            <p className="w-full pb-5 text-[14px] font-light">
              {product.totalReviews} reviews
            </p>
            <ul className="userReviewsContainer">
              {reviews.map((item, index) => (
                <li
                  key={index}
                  className="w-full py-5 border-t-[1px] border-gray-600"
                >
                  <div className="reviewerNameContainer flex items-center gap-1 text-[14px] font-light">
                    <p>{item.nickname} -</p>
                    <p>{item.date}</p>
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
                    {item.title}
                  </h2>
                  <p className="mt-2 text-[14px] font-light">{item.comment}</p>
                </li>
              ))}
            </ul>
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
