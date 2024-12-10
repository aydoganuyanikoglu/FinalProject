import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ReviewsIcon from "@mui/icons-material/Reviews";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";

export const EmptyReview = () => {
  return (
    <div className="w-full h-full py-[100px] flex flex-col items-center text-center text-black">
      <ReviewsIcon className="text-[50px] text-purple-600" />
      <h2 className="mt-5 text-[28px] font-bold max-md:text-[20px]">
        No reviews yet.
      </h2>
      <p className="w-[90%] text-[16px] max-md:text-[14px] max-md:w-full">
        Reviews are helpful for others who are considering this product. Share
        your experience!
      </p>
    </div>
  );
};

export const EmptyCart = () => {
  return (
    <div className="w-full h-full py-[100px] flex flex-col items-center text-center text-gray-700">
      <ShoppingCartOutlinedIcon className="text-[50px] text-orange-500" />
      <h2 className="mt-5 text-[24px] font-bold max-md:text-[18px]">
        Your cart is empty right now.
      </h2>
      <p className="text-[13px]">You can search for our products down below!</p>
      <div className="w-[250px]">
        <Link
          href="/products"
          className="loginRegisterButton mt-3 !text-[14px]"
        >
          Search for Products!
        </Link>
      </div>
    </div>
  );
};

export const EmptyFavoriteList = () => {
  return (
    <div className="w-full h-full py-[100px] flex flex-col items-center text-center text-black">
      <FavoriteIcon className="text-[50px] text-pink-600" />
      <h2 className="mt-5 text-[28px] font-bold max-md:text-[20px]">
        No favorite items yet.
      </h2>
      <p className="text-[13px]">
        You can search for our products to add them to your favorites down
        below!
      </p>
      <div className="w-[250px]">
        <Link
          href="/products"
          className="loginRegisterButton !bg-pink-600 mt-3 !text-[14px] hover:!text-pink-600 hover:!bg-white hover:!border-pink-600"
        >
          Search for Products!
        </Link>
      </div>
    </div>
  );
};

export const EmptyAddresses = () => {
  return (
    <div className="w-full h-full py-[100px] flex flex-col items-center text-center text-black">
      <HomeIcon className="text-[50px] text-orange-600" />
      <h2 className="mt-5 text-[28px] font-bold max-md:text-[20px]">
        No addresses yet.
      </h2>
      <p className="text-[13px]">
        You can add your current address above, by add new address button!
      </p>
    </div>
  );
};

export const EmptyProducts = () => {
  return (
    <div className="w-full h-full py-[100px] flex flex-col items-center text-center text-black">
      <CategoryIcon className="text-[50px] text-pink-600" />
      <h2 className="mt-5 text-[28px] font-bold max-md:text-[20px]">
        No Products Yet.
      </h2>
      <p className="text-[13px]">You can try to visit our website later!</p>
    </div>
  );
};
