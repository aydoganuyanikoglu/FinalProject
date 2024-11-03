import React from "react";
import { Navbar, Footer } from "@/app/const";
import ProfileContainer from "./ProfileContainer";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <ProfileContainer />
      <Footer />
    </div>
  );
};

export default Profile;
