"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const CartSkeleton = () => {
  const items = ["item1", "item2", "item3"];

  return (
    <ul className="w-full h-fit flex flex-col gap-2 max-md:gap-1">
      {items.map((item, index) => (
        <li
          key={index}
          className={`${shimmer} relative overflow-hidden cartItems w-full h-[170px] p-2 flex gap-1 rounded-md bg-gray-200 max-md:h-[130px]`}
        >
          <div className="imageContainer w-[170px] h-full bg-gray-600 max-md:w-[130px]"></div>
          <div className="infosContainer h-full flex flex-col justify-between">
            <div className="top">
              <h2 className="w-[100px] h-[24px] rounded-md bg-gray-600"></h2>
              <p className="mt-1 w-[200px] rounded-md h-[16px] bg-gray-600"></p>
              <p className="mt-1 w-[150px] rounded-md h-[16px] bg-gray-600"></p>
            </div>
            <div className="bottom">
              <p className="w-[30px] h-[15px] bg-gray-600"></p>
            </div>
          </div>
          <div className="decreaseIncreaseContainer absolute right-2 bottom-2 w-[55px] h-[30px] flex items-center gap-2 border-[1.5px] bg-gray-600 rounded-md px-2 py-1">
            <div className=""></div>
            <span className="text-[12px]"></span>
            <div></div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export const ProductsSkeleton = () => {
  const items = Array.from({ length: 8 });
  return (
    <ul className="w-full h-fit grid grid-cols-4 gap-2 max-md:grid-cols-2">
      {items.map((item, index) => {
        return (
          <li
            key={index}
            className={`${shimmer} relative overflow-hidden w-full h-fit flex flex-col bg-gray-200 p-1`}
          >
            <div className="bg-gray-600 w-full h-[190px] max-sm:!h-[120px] max-sm:!w-[120px]"></div>
            <div className="titleContainer w-[70%] h-[24px] mt-1 rounded-md bg-gray-600"></div>
            <div className="priceContainer w-[40%] h-[16px] mt-1 rounded-md bg-gray-600"></div>
            <div className="buttonContainer addtoCartButton mt-7 !bg-gray-600"></div>
          </li>
        );
      })}
    </ul>
  );
};

export const FavoritesSkeleton = () => {
  const items = Array.from({ length: 8 });
  return (
    <ul className="w-full h-fit mt-4 grid grid-cols-4 gap-2 max-smp:grid-cols-3 max-sm:grid-cols-2">
      {items.map((item, index) => {
        return (
          <li
            key={index}
            className={`${shimmer} overflow-hidden relative w-full h-fit flex flex-col bg-gray-200 p-1`}
          >
            <div className="w-full h-[225px] max-sm:!h-[150px] max-sm:!w-[150px] bg-gray-600"></div>
            <div className="titleContainer w-[70%] h-[24px] mt-1 rounded-md bg-gray-600"></div>
            <div className="priceContainer w-[40%] h-[16px] mt-1 rounded-md bg-gray-600"></div>
            <div className="buttonContainer addtoCartButton mt-7 !bg-gray-600"></div>
          </li>
        );
      })}
    </ul>
  );
};

export const BrandsSkeleton = () => {
  const items = Array.from({ length: 40 });
  return (
    <ul className="grid grid-cols-10 w-full gap-3 max-md:grid-cols-6 max-sm:grid-cols-4">
      {items.map((item, index) => {
        return (
          <li
            key={index}
            className={`${shimmer} relative overflow-hidden w-full h-[100px] flex items-center justify-center bg-gray-300 font-semibold rounded-sm text-[14px] text-white cursor-pointer hover:-mt-1`}
          >
            <div className={`w-[73%] h-[20px] rounded-md bg-gray-900`}></div>
          </li>
        );
      })}
    </ul>
  );
};

export const AddressesSkeleton = () => {
  const items = Array.from({ length: 3 });
  return (
    <ul className="mt-3 w-full h-fit flex flex-col gap-2">
      {items.map((item, index) => {
        return (
          <li
            key={index}
            className={`${shimmer} relative w-full min-h-fit h-[150px] flex flex-col gap-1 p-2 shadow-md rounded-md border-gray-200 border-[2px] bg-gray-200`}
          >
            <div className="topContainer w-[100px] h-[27px] bg-gray-600 rounded-md"></div>
            <div className="w-full h-[17px] bg-gray-600 rounded-md"></div>
            <div className="w-full h-[17px] bg-gray-600 rounded-md"></div>
            <div className="w-[60%] h-[17px] bg-gray-600 rounded-md"></div>
          </li>
        );
      })}
    </ul>
  );
};

export const BestSellerSkeleton = () => {
  const items = Array.from({ length: 4 });
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
    <Slider className="sliderContainer" {...settings}>
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className={`${shimmer} relative overflow-hidden w-full h-fit flex flex-col bg-gray-200 p-1`}
          >
            <div className="bg-gray-600 w-full h-[190px] max-sm:!h-[120px] max-sm:!w-[120px]"></div>
            <div className="titleContainer w-[70%] h-[24px] mt-1 rounded-md bg-gray-600"></div>
            <div className="priceContainer w-[40%] h-[16px] mt-1 rounded-md bg-gray-600"></div>
            <div className="buttonContainer addtoCartButton mt-7 !bg-gray-600"></div>
          </div>
        );
      })}
    </Slider>
  );
};

export const ReviewsSkeleton = () => {
  const items = Array.from({ length: 3 });
  return (
    <ul className="userReviewsContainer flex flex-col gap-4 py-5">
      {items.map((item, index) => (
        <li
          key={index}
          className={`${shimmer} relative w-full py-2 px-2 bg-gray-200 rounded-md`}
        >
          <div className="reviewerNameContainer w-[150px] h-[17px] rounded-md flex items-center gap-1 bg-gray-600"></div>
          <div className="starsRating w-[70px] h-[17px] bg-gray-600 rounded-md mt-1"></div>
          <h2 className="reviewTitle mt-3 w-[120px] h-[25px] bg-gray-600 rounded-md"></h2>
          <p className="w-full h-[17px] bg-gray-600 rounded-md mt-1"></p>
          <p className="w-full h-[17px] bg-gray-600 rounded-md mt-1"></p>
          <p className="w-full h-[17px] bg-gray-600 rounded-md mt-1"></p>
          <p className="w-full h-[17px] bg-gray-600 rounded-md mt-1"></p>{" "}
          <p className="w-[70%] h-[17px] bg-gray-600 rounded-md mt-1"></p>
        </li>
      ))}
    </ul>
  );
};

export const ProductNameSkeleton = () => {
  return (
    <div className={`${shimmer} mt-0.5 relative overflow-hidden`}>
      <div className="bg-gray-600 w-[140px] h-[17px] rounded-md"></div>
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative mt-10 upperContainer flex gap-5 max-md:flex-col max-md:justify-start`}
    >
      <div className="leftContainer">
        <div className="w-[300px] h-[300px] bg-gray-600 rounded-md max-sm:w-full"></div>
      </div>
      <div className="rightContainer flex flex-col justify-between">
        <div className="rightTopContainer">
          <h2 className="productName w-[200px] h-[30px] bg-gray-600 rounded-md"></h2>
          <div className="rating w-[70px] h-[17px] bg-gray-600 rounded-md mt-1"></div>
        </div>
        <div className="rightBottomContainer flex flex-col gap-1">
          <div className="priceContainer mt-1 w-[45px] h-[16px] rounded-md bg-gray-600"></div>
          <div className="flex gap-1">
            <div className="!w-[200px] !h-[50px] bg-gray-600 rounded-md"></div>
            <div className="!w-[200px] !h-[50px] rounded-md bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductBottomDetailsSkeleton = () => {
  return (
    <div className={`${shimmer} relative bg-gray-200 p-2 mt-3 rounded-md`}>
      <div className={`bottomContainer flex flex-col gap-1 mt-10 rounded-md`}>
        <h2 className="productInfoTitle w-[120px] h-[23px] bg-gray-600 rounded-md"></h2>
        <p className="w-full h-[15px] bg-gray-600 rounded-sm"></p>
        <p className="w-full h-[15px] bg-gray-600 rounded-sm"></p>
        <p className="w-full h-[15px] bg-gray-600 rounded-sm"></p>
        <p className="w-[80%] h-[15px] bg-gray-600 rounded-sm"></p>
      </div>
      <div className="commentTopContainer mt-10 ">
        <h2 className="reviewsTitle w-[120px] h-[23px] bg-gray-600 rounded-md"></h2>
        <div className="rating">
          <div className="starsRating w-[180px] h-[20px] bg-gray-600 rounded-md mt-1"></div>
          <p className="totalReviewsContainer w-[140px] h-[17px] bg-gray-600 rounded-md mt-1"></p>
          <div className="reviewContainer h-[35px] w-[200px] rounded-sm bg-gray-600 mt-1"></div>
        </div>
      </div>
    </div>
  );
};
