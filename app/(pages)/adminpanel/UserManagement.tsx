"use client";
import React, { useState } from "react";
import { AreYouSure } from "@/app/const";
import DeleteIcon from "@mui/icons-material/Delete";

type User = {
  id: number;
  name: string;
  email: string;
  created: string;
};

const UserManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const users: User[] = [
    {
      id: 1,
      name: "Sirin",
      email: "Sirin@gmail.com",
      created: "2020-12-19 16:17:34",
    },
    {
      id: 2,
      name: "Makrem",
      email: "makrem@gmail.com",
      created: "2020-12-19 16:16:59",
    },
    {
      id: 3,
      name: "Fathi",
      email: "fathiah@gmail.com",
      created: "2020-12-19 16:15:52",
    },
    {
      id: 4,
      name: "Ahmed",
      email: "achme@gmail.com",
      created: "2020-12-19 16:13:39",
    },
    {
      id: 5,
      name: "Achref",
      email: "achref.nefazoui@gmail.com",
      created: "2020-12-19 15:35:56",
    },
  ];

  const headerItems = [
    { name: "User ID" },
    { name: "Name" },
    { name: "E-mail" },
    { name: "Created" },
    { name: "Action" },
  ];

  return (
    <div className="userManagementContainer w-full h-full p-5 bg-[#4048b9]">
      <div className="headerContainer w-full">
        <ul className="w-full grid grid-cols-5">
          {headerItems.map((item, index) => (
            <li key={index} className="w-full">
              <p className="w-fit border-b-[2.5px] text-[15px] font-semibold border-b-white">
                {item.name}
              </p>
            </li>
          ))}
        </ul>
        <div className="userInfosContainer w-full mt-5">
          <ul className="w-full h-fit flex flex-col gap-10">
            {users.map((item, index) => (
              <li key={index} className="w-full grid grid-cols-5 items-center">
                <p className="w-full font-light text-[14px]">{item.id}</p>
                <p className="w-full font-light text-[14px]">{item.name}</p>
                <p className="w-full font-light text-[14px]">{item.email}</p>
                <p className="w-full font-light text-[14px]">{item.created}</p>
                <button className="userDeleteButton w-fit h-fit flex justify-center items-center gap-1 px-4 py-2 bg-red-600 rounded-md">
                  <DeleteIcon className="userDeleteIcon text-[20px] text-white" />
                  <p className="relative top-[0.5px] text-[13px] font-semibold text-white">
                    Delete
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showModal && (
        <AreYouSure message="Are you sure you want to delete this user?" />
      )}
    </div>
  );
};

export default UserManagement;
