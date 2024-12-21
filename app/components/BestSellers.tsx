"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styles } from "../const";
import { useProduct } from "@/context/ProductContext";
import { Productstype } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CircularProgress } from "@mui/material";
import { EmptyProducts } from "./EmptyComponents";
import { BestSellerSkeleton } from "./skeletons/Skeletons";
import Image from "next/image";
import Link from "next/link";

const BestSellers = () => {
  const {
    allProducts,
    fetchAllProducts,
    handleFetchFavoriteProducts,
    favoriteProducts,
    productStates,
    handleAddtoCart,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  } = useProduct();
  const [loading, setLoading] = useState(true);
  const [randomProducts, setRandomProducts] = useState<Productstype[]>([]);
  const { currentUser } = useAuth();
  const router = useRouter();

  const getRandomProducts = (products: any[], count: number): any[] => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const handleFetchAllProducts = async () => {
    try {
      await fetchAllProducts();
      setLoading(false);
      if (allProducts.length > 0) {
        const selectedProducts = getRandomProducts(allProducts, 10);
        setRandomProducts(selectedProducts);
      }
    } catch (error) {
      console.error("Error while fetching", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.id) {
      handleFetchFavoriteProducts(currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    handleFetchAllProducts();
  }, [allProducts.length]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section
      className={`w-full h-fit py-[100px] bg-gray-400 max-md:py-[20px] ${styles.pagePaddingX}`}
    >
      <div className="innerContainer w-full h-[800px] flex flex-col items-center gap-10 p-[50px] bg-white max-md:gap-2 max-md:px-[10px]">
        <div className="topTitle">
          <h2 className="w-full text-center text-[28px] font-bold max-md:text-[20px]">
            Best Sellers
          </h2>
        </div>
        <div className="innerMiddle w-full h-fit pb-[40px]">
          <Slider className="sliderContainer" {...settings}>
            {randomProducts.map((item, index) => {
              const productState = productStates[item.id] || {};
              const { loading, added } = productState;
              const isLiked = favoriteProducts?.some(
                (product) => product.name === item.name
              );
              const isDiscounted = item.price !== item.discount_price;
              return (
                <div
                  key={index}
                  className="relative bg-white w-full h-fit p-[5px] flex flex-col border-[1.5px]
                  rounded-md border-gray-400"
                >
                  {isDiscounted && (
                    <div className="absolute left-[25.5px] top-[28px] z-10 flex justify-center items-center">
                      <div className="absolute !w-[65px] !h-[65px] bg-red-600"></div>
                      <p className="relative z-1 text-white font-bold text-[12px]">
                        -{item.discount_percentage}%
                      </p>
                    </div>
                  )}
                  {currentUser && (
                    <div className="addLikeContainer absolute right-2 top-2 cursor-pointer">
                      <button
                        onClick={() => {
                          if (currentUser?.id) {
                            if (isLiked) {
                              handleRemoveFromFavorites(
                                currentUser.id,
                                item.id
                              );
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
                  <Link
                    href={`/products/${item.id}`}
                    className="image w-full h-[300px] flex items-center justify-center"
                  >
                    <Image
                      className="w-90% max-xs:w-full"
                      src={item.image_url}
                      alt={item.name}
                      width={300}
                      height={300}
                    />
                  </Link>
                  <Link
                    href={`/products/${item.id}`}
                    className="titleContainer"
                  >
                    <h2 className="productTitle text-[14px] font-medium mt-2 max-md:text-[13px]">
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
        <div className="buttonContainer">
          <button className="myButton1">View All</button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
