"use client";
import React, { useEffect } from "react";
import HttpsIcon from "@mui/icons-material/Https";
import { useAuth } from "@/context/AuthContext";
import { useProduct } from "@/context/ProductContext";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { EmptyFavoriteList } from "@/app/components/EmptyComponents";
import { FavoritesSkeleton } from "@/app/components/skeletons/Skeletons";
import Link from "next/link";
import Image from "next/image";

const FavoriteList = () => {
  const router = useRouter();
  const {
    handleAddtoCart,
    productStates,
    favoriteProducts,
    handleFetchFavoriteProducts,
    handleAddToFavorites,
    handleRemoveFromFavorites,
    loading,
  } = useProduct();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?.id) {
      handleFetchFavoriteProducts(currentUser.id);
    }
  }, [currentUser, favoriteProducts?.length]);

  return (
    <section
      className="w-full h-fit flex justify-center py-[50px] max-mdp:px-[20px]"
      id="favorites"
    >
      <div className="innerContainer w-[1000px] h-fit rounded-md max-md:w-full">
        <div className="navigatorContainer flex gap-2 mb-5 max-md:mb-3">
          <Link
            className="w-fit text-[15px] text-gray-800 border-b-[1px] border-b-[#0000] hover:border-b-[#000]"
            href="/"
          >
            Home
          </Link>
          <span className="gray-400">|</span>
          <p className="font-normal text-[15px] text-gray-400">
            Favorite Products
          </p>
        </div>
        <div className="w-full flex justify-center">
          <div className="titleContainer w-[100%] flex justify-between border-[2px] border-black rounded-md px-3 py-1 max-md:w-full max-sm:flex-col">
            <h2 className="favoriteListTitle text-[18px] text-black font-bold max-md:text-[16px]">
              My Favorite List
            </h2>
            <div className="flex items-center gap-5">
              <p className="productCount text-[14px] text-black font-normal">
                {favoriteProducts?.length} products
              </p>
              <div className="flex items-center text-gray-400">
                <HttpsIcon className="text-[13px] text-pink-300" />
                <p className="text-[14px] text-pink-300 font-normal">
                  Secret List
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="productsContainer w-full h-fit mt-4">
          {loading ? (
            <FavoritesSkeleton />
          ) : favoriteProducts?.length === 0 ? (
            <EmptyFavoriteList />
          ) : (
            <ul className="w-full h-fit mt-4 grid grid-cols-4 gap-2 max-smp:grid-cols-3 max-sm:grid-cols-2">
              {favoriteProducts?.map((item, index) => {
                const productState = productStates[item.id] || {};
                const { loading, added } = productState;
                const isLiked = favoriteProducts.some(
                  (product) => product.name === item.name
                );
                const isDiscounted = item.price !== item.discount_price;

                return (
                  <li
                    key={index}
                    className="relative w-full h-fit p-[5px] flex flex-col border-[1.5px] border-gray-300 rounded-md"
                  >
                    {isDiscounted && (
                      <div className="absolute left-1 top-2.5 z-10 flex justify-center items-center -rotate-45">
                        <div className="absolute !w-[50px] !h-[50px] rounded-[50%] bg-red-600"></div>
                        <p className="relative z-1 text-white font-bold text-[12px]">
                          -{item.discount_percentage}%
                        </p>
                      </div>
                    )}
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
                    <Link
                      className="image w-full h-[180px] flex justify-center items-center max-sm:!h-[150px]"
                      href={`/products/${item.id}`}
                    >
                      <Image
                        className="h-[65%] w-[90%] hover:scale-110"
                        alt={item.name}
                        src={item.image_url}
                        width={150}
                        height={150}
                      />
                    </Link>
                    <Link
                      className="titleContainer"
                      href={`/products/${item.id}`}
                    >
                      <h2 className="productTitle h-[40px] text-[14px] font-medium mt-2 max-md:text-[13px]">
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
                            : "addtoCartButton !bg-pink-600 hover:!border-pink-600 hover:!text-pink-600"
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
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default FavoriteList;
