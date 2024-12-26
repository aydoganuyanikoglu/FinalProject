"use client";
import React, { useEffect, useState } from "react";
import { useProduct } from "@/context/ProductContext";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteProduct from "@/app/components/modals/DeleteProduct";
import AddNewProduct from "@/app/components/modals/AddNewProduct";
import { Productstype } from "@/lib/types";
import Image from "next/image";

const ProductManagement = () => {
  const { fetchAllProducts, allProducts } = useProduct();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Productstype | null>(
    null
  );

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleDeleteClick = (product: Productstype) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedProduct(null);
    fetchAllProducts();
  };

  const handleAddProductClick = () => {
    setShowAddProductModal(true);
  };

  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
    fetchAllProducts();
  };

  return (
    <div className="w-full h-fit">
      {showDeleteModal && (
        <DeleteProduct
          product={selectedProduct}
          onClose={handleCloseDeleteModal}
        />
      )}
      {showAddProductModal && (
        <AddNewProduct onClose={handleCloseAddProductModal} />
      )}
      <div className="addNewItemContainer w-[200px]">
        <button
          className="addtoCartButton !bg-blue-600 !border-blue-600 hover:!text-blue-600"
          onClick={handleAddProductClick}
        >
          Add New Product
        </button>
      </div>
      <div className="w-full mt-5">
        <ul className="w-full h-fit grid grid-cols-7 gap-4 max-md:grid-cols-2">
          {allProducts.map((item, index) => {
            const isDiscounted = item.price !== item.discount_price;

            return (
              <li
                key={index}
                className="relative w-full h-[260px] flex flex-col border-[2px] border-gray-600 p-2 bg-white text-black rounded-md"
              >
                <div
                  className="deleteItemContainer absolute right-3 top-3 cursor-pointer"
                  onClick={() => handleDeleteClick(item)}
                >
                  <DeleteIcon className="text-black hover:text-gray-600 !transition-none" />
                </div>
                <div className="image w-full h-[150px] flex justify-center items-center max-sm:!h-[150px]">
                  <Image
                    className="w-[90%] h-[70%]"
                    src={item.image_url}
                    alt={item.name}
                    width={150}
                    height={100}
                  />
                </div>
                <div className="titleContainer">
                  <h2 className="productTitle text-[14px] font-medium mt-2 max-md:text-[13px]">
                    {item.name}
                  </h2>
                </div>
                <div className="priceContainer absolute left-2 bottom-2 mt-4 font-bold">
                  {isDiscounted ? (
                    <div className="h-[45px]">
                      <p className="text-[12px] line-through font-normal">
                        {item.price}$
                      </p>
                      <p className="text-[16px]">{item.discount_price}$</p>
                    </div>
                  ) : (
                    <div className="h-[45px] flex items-end">
                      <p className="text-[16px]">{item.discount_price}$</p>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProductManagement;
