"use client";
import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AddHomeIcon from "@mui/icons-material/AddHome";
import AddNewAddress from "@/app/components/modals/AddNewAddress";
import { fetchAddresses } from "@/lib/data";
import { addressesType } from "@/lib/types";
import { AddressesSkeleton } from "@/app/components/skeletons/Skeletons";
import { EmptyAddresses } from "@/app/components/EmptyComponents";
import { useAuth } from "@/context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteAddressModal from "@/app/components/modals/DeleteAddress";
import Link from "next/link";

const Addresses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<addressesType | null>(
    null
  );
  const [addresses, setAddresses] = useState<addressesType[] | undefined>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleFetchAddresses();
  };

  const handleDeleteClick = (address: addressesType) => {
    setSelectedAddress(address);
    setShowDeleteModal(true);
  };

  const handleFetchAddresses = async () => {
    try {
      if (currentUser?.id) {
        const addresses = await fetchAddresses(currentUser.id);
        setAddresses(addresses);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error while fetchin addresses", error);
      setLoading(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedAddress(null);
    handleFetchAddresses();
  };

  useEffect(() => {
    handleFetchAddresses();
  }, [addresses?.length, currentUser]);

  return (
    <div
      className={`w-full h-fit flex flex-col items-center py-[100px] max-md:px-[10px] `}
    >
      <div className="navigatorContainer flex gap-2">
        <Link
          className="w-fit text-[15px] text-gray-800 border-b-[1px] border-b-[#0000] hover:border-b-[#000]"
          href="/"
        >
          Home
        </Link>
        <span className="gray-400">|</span>
        <Link
          className="w-fit text-[15px] text-gray-800 border-b-[1px] border-b-[#0000] hover:border-b-[#000]"
          href="/profile"
        >
          Profile
        </Link>
        <span className="gray-400">|</span>
        <p className="font-normal text-[15px] text-gray-400">Addresses</p>
      </div>
      <div className="mt-5 w-[750px] py-10 max-md:py-2 h-fit border-[1px] border-gray-200 rounded-md flex flex-col gap-7 items-center px-[40px] max-sm:w-full max-sm:px-[10px]">
        <div className="w-full h-fit p-3 bg-white rounded shadow-md">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-[19px] max-md:text-[15px] font-bold">
              My Addresses
            </h2>
            <div
              onClick={openModal}
              className="flex gap-1 items-center cursor-pointer border-[1px] border-orange-600 px-3 py-2 rounded-md text-orange-600 hover:!text-[white] hover:!bg-orange-600"
            >
              <AddHomeIcon className="text-[20px] !transition-none" />
              <button className="text-[13px] font-medium">
                Add new Address!
              </button>
            </div>
          </div>
          {loading ? (
            <AddressesSkeleton />
          ) : addresses?.length === 0 ? (
            <EmptyAddresses />
          ) : (
            <ul className="mt-3 w-full h-fit flex flex-col gap-2">
              {addresses?.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="addressClass relative w-full min-h-fit h-[150px] p-2 shadow-md rounded-md border-gray-200 border-[2px]"
                  >
                    <div
                      onClick={() => {
                        if (currentUser?.id) {
                          handleDeleteClick(item);
                        }
                      }}
                      className="deleteAddressContainer absolute opacity-0 -z-10 right-3 top-3 flex items-center gap-1 cursor-pointer"
                    >
                      <DeleteIcon className="text-[16px] text-black hover:text-gray-600 !transition-none" />
                      <p className="text-[12px]">Remove Address</p>
                    </div>
                    <div className="topContainer flex items-center gap-1 ">
                      <HomeIcon className="!text-gray-400 !text-[40px] max-md:!text-[25px]" />
                      <h2 className="max-md:text-[14px] font-bold">
                        {item.name}
                      </h2>
                    </div>
                    <p className="mt-1 text-[14px] max-md:text-[11px]">
                      {item.address}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      {showDeleteModal && (
        <DeleteAddressModal
          address={selectedAddress}
          onClose={handleCloseDeleteModal}
        />
      )}
      {isModalOpen && <AddNewAddress onClose={closeModal} />}
    </div>
  );
};

export default Addresses;
