import React from "react";
import AdminNavbar from "./AdminNavbar";
import SelectedComponent from "./SelectedComponent";

const page = () => {
  return (
    <div className="w-full min-h-[100vh] h-fit">
      <AdminNavbar />
      <div className="adminContainer w-full">
        <SelectedComponent />
      </div>
    </div>
  );
};

export default page;
