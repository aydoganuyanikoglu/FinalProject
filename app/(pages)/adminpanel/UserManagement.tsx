"use client";
import React, { useEffect, useState } from "react";
import { AreYouSure } from "@/app/const";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchUsers } from "@/lib/data";
import { typeUsers } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import DeleteUserModal from "@/app/components/modals/DeleteUser";

type User = {
  id: number;
  name: string;
  email: string;
  created: string;
};

const UserManagement = () => {
  const [users, setUsers] = useState<typeUsers[]>([]);
  const { currentUser } = useAuth();
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeUsers | null>(null);
  const handleFetchUsers = async () => {
    try {
      const users = await fetchUsers();
      setUsers(users);
      console.log(users);
    } catch (error) {
      console.error("Error message while fetching users: ", error);
    }
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const handleCloseDeleteModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
    handleFetchUsers();
  };

  const handleDeleteUser = (user: typeUsers) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const headerItems = [
    { name: "User ID" },
    { name: "Name" },
    { name: "E-mail" },
    { name: "Created At" },
    { name: "Action" },
  ];

  return (
    <div className="userManagementContainer w-full h-full p-5 bg-[#4048b9]">
      {showUserModal && (
        <DeleteUserModal user={selectedUser} onClose={handleCloseDeleteModal} />
      )}
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
            {users.map((item, index) => {
              const isDisabled = item.email === "aslan321@gmail.com";
              return (
                <li
                  key={index}
                  className="w-full grid grid-cols-5 items-center"
                >
                  <p className="w-full font-light text-[14px]">{item.id}</p>
                  <p className="w-full font-light text-[14px]">
                    {item.firstname} {item.lastname}
                  </p>
                  <p className="w-full font-light text-[14px]">{item.email}</p>
                  <p className="w-full font-light text-[14px]">
                    {item.created_at &&
                      new Intl.DateTimeFormat("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(item.created_at))}
                  </p>
                  <button
                    onClick={() => handleDeleteUser(item)}
                    disabled={isDisabled}
                    className={`${
                      isDisabled ? "!bg-black" : ""
                    } userDeleteButton w-fit h-fit flex justify-center items-center gap-1 px-4 py-2 rounded-md bg-red-600`}
                  >
                    <DeleteIcon className="userDeleteIcon text-[20px] text-white" />
                    <p className="relative top-[0.5px] text-[13px] font-semibold text-white">
                      Delete
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
