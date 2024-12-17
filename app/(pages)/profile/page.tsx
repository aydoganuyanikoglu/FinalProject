import React from "react";
import { Navbar, Footer } from "@/app/const";
import ProfileContainer from "./ProfileContainer";

const Profile = () => {
  return (
    <div>
      <Navbar isFixed={false} />
      <ProfileContainer />
      <Footer />
    </div>
  );
};

export default Profile;
