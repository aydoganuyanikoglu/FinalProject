"use client";
import React from "react";
import { Navbar, Footer } from "@/app/const";
import SimilarProducts from "./SimilarProducts";
import Comments from "./Comments";
import ReactStars from "react-stars";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const ProductDetails = () => {
  const product = {
    name: "Example Product",
    rating: 4.2,
    totalReviews: 120,
  };

  return (
    <div>
      <Navbar />
      <div className="detailContainer py-[100px] px-[300px] max-md:px-[100px] max-sm:px-[20px]">
        <div className="upperContainer flex justify-center gap-5 max-md:flex-col max-md:justify-start">
          <div className="leftContainer">
            <div className="w-[300px] h-[300px] bg-gray-200"></div>
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
                  edit={false} // Sadece gösterim için
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
            eveniet assumenda. Iusto id similique non dicta fuga, recusandae ad
            repudiandae voluptatibus, laudantium blanditiis ullam voluptatem
            beatae sequi rerum accusantium provident nobis sed vel quaerat
            laborum exercitationem.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
