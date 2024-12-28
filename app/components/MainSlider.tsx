"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useProduct } from "@/context/ProductContext";

const MainSlider = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const { isMobile } = useProduct();
  const router = useRouter();

  const SearchSchema = Yup.object().shape({
    searchTerm: Yup.string().required("Gerekli"),
  });

  return (
    <div className="relative w-full h-[100vh] text-white appearClass">
      <Slider {...settings}>
        <div className="w-full h-[100vh] text-white font-bold">
          <div
            className={`innerSlideContainer relative w-full h-full flex flex-col gap-2.5 justify-center px-[200px] max-md:px-[20px] max-md:text-center max-md:items-center`}
          >
            <Image
              src={
                isMobile
                  ? "/backgrounds/mobil/slide1.webp"
                  : "/backgrounds/slide0.jpg"
              }
              alt="slide"
              width={2000}
              height={1300}
              className="absolute left-0 top-0 z-[-1] w-full h-full brightness-50"
            />
          </div>
        </div>

        <div className="w-full h-[100vh] text-white font-bold">
          <div
            className={`innerSlideContainer relative w-full h-full flex flex-col gap-2.5 justify-center px-[200px] max-md:px-[20px] max-md:text-center max-md:items-center`}
          >
            <Image
              src={
                isMobile
                  ? "/backgrounds/mobil/slide2.webp"
                  : "/backgrounds/slide1.jpg"
              }
              alt="slide"
              width={2000}
              height={1300}
              className="absolute left-0 top-0 z-[-1] w-full h-full brightness-50"
            />
          </div>
        </div>
      </Slider>
      <div className="absolute z-1 left-[200px] top-[50px] max-xl:left-[50px] h-full flex flex-col justify-center max-md:left-[20px] max-md:pr-[20px]">
        <h2 className="bestPrices w-fit h-fit text-[14px] rounded-sm bg-red-600 px-[8px] py-1">
          Best Prices!
        </h2>
        <h2 className="sliderTitle w-[450px] font-bold text-[50px] max-md:text-[35px] max-sm:w-full">
          Incredible Prices on All Your Favorite Items
        </h2>
        <p className="getMore font-normal text-[14px]">
          Get more for less on selected brands
        </p>
        <Link
          href={"/products"}
          className="myButton1 mt-3 text-[25px] max-md:text-[20px] !bg-[#3e1d5d] !border-[#3e1d5d] hover:!text-[#3e1d5d]"
        >
          Shop Now
        </Link>
        <Formik
          initialValues={{ searchTerm: "" }}
          validationSchema={SearchSchema}
          onSubmit={({ searchTerm }, { setSubmitting }) => {
            router.push(`/products?word=${encodeURIComponent(searchTerm)}`);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex mt-3 w-full h-[60px]">
              <Field
                type="text"
                name="searchTerm"
                placeholder="Search for a product..."
                className="loginRegisterInputs !h-full !rounded-r-[0px] !border-[#3e1d5d] !border-[2px] !border-r-0 focus:!bg-gray-500 focus:!text-white focus:!border-white"
              />
              <button
                type="submit"
                className="searchButton leaveReviewButton !rounded-md !rounded-l-[0px] !bg-[#3e1d5d] hover:!bg-white hover:!text-[#3e1d5d] !text-white !border-[#3e1d5d] !border-[2px] !text-[13px] max-xs:!text-[11.5px] !font-bold"
                disabled={isSubmitting}
              >
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MainSlider;
