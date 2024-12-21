"use client";
import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useProduct } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { Productstype } from "@/lib/types";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ProductsSkeleton } from "@/app/components/skeletons/Skeletons";
import { useSearchParams } from "next/navigation";
import { getFilteredProducts } from "@/lib/data";
import ReactStars from "react-stars";
import { EmptyFilteredProducts } from "@/app/components/EmptyComponents";
import Link from "next/link";

const ProductList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryparam = searchParams.get("category");
  const wordparam = searchParams.get("word");
  const maxPriceParam = searchParams.get("maxPrice");
  const minPriceParam = searchParams.get("minPrice");
  const sortParam = searchParams.get("sortBy");
  const [loading, setLoading] = useState(true);
  const filterList = [
    { name: "Category", query: "category", value: categoryparam },
    { name: "Word", query: "word", value: wordparam },
    { name: "Max Price", query: "maxPrice", value: maxPriceParam },
    { name: "Min Price", query: "minPrice", value: minPriceParam },
  ];
  const [filteredProducts, setfilteredProducts] = useState<Productstype[]>([]);
  const [isVisible, setisVisible] = useState(false);
  const { currentUser } = useAuth();
  const {
    handleAddtoCart,
    productStates,
    favoriteProducts,
    handleFetchFavoriteProducts,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  } = useProduct();
  const orderItems = [
    { name: "Recommended", value: "" },
    { name: "Price (low to high)", value: "priceAsc" },
    { name: "Price (high to low)", value: "priceDesc" },
    { name: "Name A-Z", value: "nameAsc" },
    { name: "Name Z-A", value: "nameDesc" },
  ];
  const selectedOrderBy =
    orderItems.find((item) => item.value === sortParam)?.name || "Recommended";
  const currentParams = new URLSearchParams(searchParams.toString());

  const handleApplySortFilter = (sortby: string) => {
    if (sortby == "") {
      handleRemoveFilter("sortBy");
      return;
    }
    currentParams.set("sortBy", sortby);
    router.push(`/products?${currentParams.toString()}`);
  };

  const handleRemoveFilter = (filterName: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete(filterName);
    router.push(`/products?${currentParams.toString()}`);
  };

  const fetchProductsByFilter = async () => {
    try {
      const results = await getFilteredProducts({
        category: categoryparam,
        minPrice: minPriceParam,
        maxPrice: maxPriceParam,
        sortBy: sortParam,
        word: wordparam,
      });
      setfilteredProducts(results);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching filtered products", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProductsByFilter();
  }, [categoryparam, wordparam, minPriceParam, maxPriceParam, sortParam]);

  useEffect(() => {
    if (currentUser?.id) {
      handleFetchFavoriteProducts(currentUser.id);
    }
  }, [currentUser]);

  return (
    <div className="w-[80%] h-fit max-md:w-[55%] max-sm:w-full">
      <h2 className="font-normal text-[20px] max-md:text-[16px] ">
        Our Products
      </h2>
      <hr />
      <div className="relative mt-3 z-50">
        <div
          onClick={() => setisVisible((prev) => !prev)}
          className="w-fit cursor-pointer flex items-center text-[12px]"
        >
          <p>{selectedOrderBy}</p>
          <KeyboardArrowDownIcon className="text-[13.5px]" />
        </div>
        <ul
          className={`absolute ${
            isVisible ? "flex" : "hidden"
          } z-[20] left-0 top-[20px] flex flex-col text-[11px] bg-gray-600`}
        >
          {orderItems.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                handleApplySortFilter(item.value);
                setisVisible((prev) => !prev);
              }}
              className="cursor-pointer p-2 text-white hover:bg-white hover:text-black"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <p className="filteredCounter mt-2 text-[14px] text-gray-600 font-medium">
        {filteredProducts.length} products found.
      </p>
      <ul className="filtersContainer flex items-center gap-2">
        {filterList.map((item, index) =>
          item.value ? (
            <li
              key={index}
              className="mt-3 flex items-center flex-wrap gap-1 p-2 border-[1px] border-orange-600 rounded-md bg-orange-600 text-white text-[11px] hover:bg-white hover:text-orange-600"
            >
              <p>{item.name}</p>
              <p>"{item.value}"</p>
              <button
                onClick={() => handleRemoveFilter(item.query)}
                className="ml-5"
              >
                x
              </button>
            </li>
          ) : null
        )}
      </ul>
      <div className="productsContainer w-full h-fit mt-5">
        {loading ? (
          <ProductsSkeleton />
        ) : filteredProducts.length === 0 ? (
          <EmptyFilteredProducts />
        ) : (
          <ul className="w-full h-fit grid grid-cols-4 gap-2 max-md:grid-cols-2">
            {filteredProducts.map((item, index) => {
              const productState = productStates[item.id] || {};
              const { loading, added } = productState;
              const isLiked = favoriteProducts?.some(
                (product) => product.name === item.name
              );
              const isDiscounted = item.price !== item.discount_price;

              return (
                <li key={index} className="relative w-full h-fit flex flex-col">
                  {currentUser && (
                    <div className="addLikeContainer absolute z-[50] right-2 top-2 cursor-pointer">
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
                  {isDiscounted && (
                    <div className="absolute left-1 top-2.5 z-20 flex justify-center items-center -rotate-45">
                      <div className="absolute !w-[50px] !h-[50px] rounded-[50%] bg-red-600"></div>
                      <p className="relative z-1 text-white font-bold text-[12px]">
                        -{item.discount_percentage}%
                      </p>
                    </div>
                  )}
                  <Link
                    className="relative imageContainer bg-gray-300 w-full h-[150px] max-sm:!h-[145px]"
                    href={`/products/${item.id}`}
                  >
                    <Image
                      className="w-full h-full brightness-75"
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
                      <p className="text-[11px] text-gray-200">
                        {item.average_rating?.toFixed(2)}/5 ({item.review_count}
                        )
                      </p>
                    </div>
                  </Link>
                  <Link
                    className="titleContainer"
                    href={`/products/${item.id}`}
                  >
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
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductList;
