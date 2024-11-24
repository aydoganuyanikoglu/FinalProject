import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AdminNavbar = () => {
  return (
    <div className="adminNavbarContainer h-[100px] flex justify-between items-center py-5 px-10 bg-[#130a3e] text-white">
      <div className="navbarLeft font-semibold text-[24px]">e-commerce.</div>
      <div className="navbarMiddle text-[14px] font-light tracking-[4px]">
        Welcome to admin dashboard, Aydogan Uyanıkoglu!
      </div>
      <div className="navbarRight flex gap-1 items-center">
        <AccountCircleIcon className="text-[25px]" />
        <p className="text-[14px] font-medium cursor-pointer">Aydogan</p>
      </div>
    </div>
  );
};

export default AdminNavbar;
