import React from "react";
import { Navbar, ShoppingCart, Footer } from "@/app/const";

const Cart = () => {
  return (
    <>
      <Navbar isFixed={false} />
      <ShoppingCart />
      <Footer />
    </>
  );
};

export default Cart;
