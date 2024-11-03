import Navbar from "./components/Navbar";
import MainSlider from "./components/MainSlider";
import Deals from "./components/Deals";
import BestSellers from "./components/BestSellers";
import WhatWeOffer from "./components/WhatWeOffer";
import ShopbyCategory from "./components/ShopbyCategory";
import NeedHelp from "./components/NeedHelp";
import Footer from "./components/Footer";
import SignIn from "./(pages)/login/SignIn";
import Register from "./(pages)/login/RegisterForm";
import SaveUpTo from "./components/SaveUpTo";
import BestPriceTag from "./components/BestPriceTag";
import Brands from "./components/Brands";
import SendMessage from "./components/SendMessage";
import ShoppingCart from "./(pages)/cart/ShoppingCart";

export const paymentMethods = [
  { path: "/visa.png" },
  { path: "/mastercard.png" },
  { path: "/americanexpress.png" },
  { path: "/discover.png" },
];

export const navbarLinks = [
  { id: "1", name: "Mobile & Wearable Tech" },
  { id: "2", name: "Drones & Cameras" },
  { id: "3", name: "Tablets" },
  { id: "4", name: "Headphones & Speakers" },
  { id: "5", name: "Computers" },
];

export const styles = {
  pagePaddingX: "px-[200px] max-xl:px-[50px] max-md:px-[20px]",
};

export const footerLeftLeft = {
  title: "Store Location",
  name: `500 Terry Francine Street San Francisco, CA 94158 info@mysite.com 123-456-7890`,
};

export const footerLeftRight = {
  title: "Shop",
  links: [
    { id: "1", name: "Shop All" },
    { id: "2", name: "Computers" },
    { id: "3", name: "Tablets" },
    { id: "4", name: "Drones & Cameras" },
    { id: "5", name: "Audio" },
    { id: "6", name: "Mobile" },
    { id: "7", name: "T.V & Home Cinema" },
    { id: "8", name: "Wearable Tech" },
    { id: "9", name: "Sale" },
  ],
};

export const footerRightLeft = {
  title: "Customer Support",
  links: [
    { id: "1", name: "Contact Us" },
    { id: "2", name: "Help Center" },
    { id: "3", name: "About Us" },
    { id: "4", name: "Careers" },
  ],
};

export const footerRightRight = {
  title: "Policy",
  links: [
    { id: "1", name: "Shipping & Returns" },
    { id: "2", name: "Terms & Conditions" },
    { id: "3", name: "Payment Methods" },
    { id: "4", name: "FAQ" },
  ],
};

export const contactInfo = [
  {
    logo: "/mail.svg",
    title: "Mail",
    value: "aydogan.u18@gmail.com",
  },
  {
    logo: "/location.svg",
    title: "Location",
    value: "Istanbul TR",
  },
  {
    logo: "/phone.svg",
    title: "Phone Number",
    value: "+90 530 500 50 50",
  },
  {
    logo: "/instagram.svg",
    title: "Instagram",
    value: "aydogan.u1834",
  },
];

export {
  Navbar,
  MainSlider,
  Deals,
  WhatWeOffer,
  BestSellers,
  ShopbyCategory,
  NeedHelp,
  Footer,
  SignIn,
  Register,
  SaveUpTo,
  BestPriceTag,
  Brands,
  SendMessage,
  ShoppingCart,
};
