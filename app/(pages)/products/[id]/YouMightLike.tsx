"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FavoriteProductsType, Productstype } from "@/lib/types";
import { fetchProductsByCategory } from "@/lib/data";
import { useProduct } from "@/context/ProductContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { CircularProgress } from "@mui/material";
import ReactStars from "react-stars";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface propsYouMight {
  id: string | undefined;
  category: string | undefined;
  favoriteProducts: FavoriteProductsType[] | undefined;
}

const YouMightLike: React.FC<propsYouMight> = ({
  id,
  category,
  favoriteProducts,
}) => {
  const settings = {
    infinite: false,
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const router = useRouter();
  const { currentUser } = useAuth();
  const {
    productStates,
    handleRemoveFromFavorites,
    handleAddToFavorites,
    handleAddtoCart,
  } = useProduct();
  const [products, setProducts] = useState<Productstype[]>([]);

  const handleFetchByBrand = async () => {
    try {
      const results = await fetchProductsByCategory(category);
      const filteredResults = results.filter(
        (product: any) => product.id !== id
      );
      setProducts(filteredResults);
    } catch (error) {
      console.error("error while fetchin by brand", error);
    }
  };

  useEffect(() => {
    handleFetchByBrand();
  }, [currentUser, category]);

  return (
    <div className="mt-10">
      <h2 className="w-full text-center font-bold text-[20px] max-md:text-[18px]">
        You might also like!
      </h2>
      <Slider className="sliderContainer mt-5" {...settings}>
        {products.map((item, index) => {
          const productState = productStates[item.id] || {};
          const { loading, added } = productState;
          const isLiked = favoriteProducts?.some(
            (product) => product.name === item.name
          );
          const isDiscounted = item.price !== item.discount_price;

          return (
            <div
              key={index}
              className="relative bg-white w-full h-fit p-[5px] flex flex-col"
            >
              {currentUser && (
                <div className="addLikeContainer absolute z-[50] right-2 top-2 cursor-pointer">
                  <button
                    onClick={() => {
                      if (currentUser?.id) {
                        if (isLiked) {
                          handleRemoveFromFavorites(currentUser.id, item.id);
                        } else {
                          handleAddToFavorites(currentUser.id, item);
                        }
                      } else {
                        router.push("/login");
                      }
                    }}
                  >
                    {isLiked ? (
                      <FavoriteIcon className="text-red-600" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </button>
                </div>
              )}
              {isDiscounted && (
                <div className="absolute left-1 top-[18px] z-20 flex justify-center items-center -rotate-45">
                  <div className="absolute !w-[50px] !h-[50px] rounded-[50%] bg-red-600"></div>
                  <p className="relative z-1 text-white font-bold text-[12px]">
                    {item.discount_percentage}%
                  </p>
                </div>
              )}
              <Link
                className="relative imageContainer w-full h-fit max-sm:!h-[145px]"
                href={`/products/${item.id}`}
              >
                <Image
                  className="w-full h-[150px] brightness-50 max-sm:!h-[130px]"
                  src={item.image_url}
                  alt={item.name}
                  width={150}
                  height={100}
                />
                <div className="absolute left-1 bottom-1 z-19 rating flex gap-1 items-center">
                  <ReactStars
                    count={5}
                    value={item.average_rating}
                    size={24}
                    color1={"#fff"}
                    color2={"#ffd700"}
                    edit={false}
                  />
                  <p className="text-[11px] text-white">
                    {item.average_rating?.toFixed(2)}/5 ({item.review_count})
                  </p>
                </div>
              </Link>
              <Link className="titleContainer" href={`/products/${item.id}`}>
                <h2 className="productTitle h-[30px] text-[14px] font-medium mt-2 max-md:text-[13px]">
                  {item.name}
                </h2>
              </Link>
              <div className="priceContainer mt-4 font-bold">
                {isDiscounted ? (
                  <div className="h-[45px]">
                    <p className="text-[12px] line-through font-normal">
                      {item.price}$
                    </p>
                    <p className="text-[16px]">{item.discount_price}$</p>
                  </div>
                ) : (
                  <div className="h-[45px] flex items-end">
                    <p className="text-[16px]">{item.discount_price}$</p>
                  </div>
                )}
              </div>
              <div className="buttonContainer">
                <button
                  className={`${
                    loading
                      ? "loadingButton"
                      : added
                      ? "addedtoCartButton"
                      : "addtoCartButton"
                  }`}
                  disabled={loading}
                  onClick={() => {
                    if (currentUser?.id) {
                      handleAddtoCart(currentUser.id, item);
                    } else {
                      router.push("/login");
                    }
                  }}
                >
                  {loading ? (
                    <CircularProgress size={20} className="text-white" />
                  ) : added ? (
                    "Added to Cart"
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default YouMightLike;
