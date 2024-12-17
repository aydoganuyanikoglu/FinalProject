import React from "react";
import { SendMessage, Navbar, Footer } from "@/app/const";
import Faq from "./Faq";
import ContactInformation from "./ContactInformation";
import GoogleMap from "./GoogleMap";

const page = () => {
  return (
    <div>
      <Navbar isFixed={false} />
      <Faq />
      <GoogleMap />
      <ContactInformation />
      <SendMessage />
      <Footer />
    </div>
  );
};

export default page;
