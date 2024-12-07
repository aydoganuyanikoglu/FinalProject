"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchCartTotalPrice,
  addToCart,
  fetchCartProducts,
  fetchTotalQuantity,
  increaseProductQuantity,
  decreaseProductQuantity,
  deleteProductsFromCard,
  deleteSelectedProductsFromCard,
} from "@/lib/data";
import { Productstype, CartProductsType } from "@/lib/types";
import { useToast } from "./ToastContext";

interface ProductContextType {
  totalQuantity: number;
  totalPrice: number;
  loading: boolean;
  selectedOrderBy: String;
  setSelectedOrderBy: React.Dispatch<React.SetStateAction<string>>;
  allProducts: Productstype[];
  cartProducts: CartProductsType[];
  filteredProducts: Productstype[];
  productStates: { [key: string]: { loading: boolean; added: boolean } };
  fetchAllProducts: () => Promise<void>;
  handleFetchCartProducts: (userId: string) => Promise<void>;
  handleAddtoCart: (user_id: string, product: Productstype) => Promise<void>;
  handleDecreaseQuantity: (
    userId: string,
    product: CartProductsType
  ) => Promise<void>;
  handleIncreaseQuantity: (
    userId: string,
    product: CartProductsType
  ) => Promise<void>;
  handleDeleteAllProducts: (userId: string) => Promise<void>;
  handleDeleteSelectedProducts: (
    userId: string,
    product: CartProductsType
  ) => Promise<void>;
  handleFetchTotalPrice: (userId: string) => Promise<void>;
  handleFetchTotalQuantity: (userId: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { showToast } = useToast();
  const [allProducts, setAllProducts] = useState<Productstype[]>([]);
  const [cartProducts, setCartProducts] = useState<CartProductsType[]>([]);
  const [filteredProducts, setFilteredProducts] =
    useState<Productstype[]>(allProducts);
  const [selectedOrderBy, setSelectedOrderBy] = useState("Recommended");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [productStates, setProductStates] = useState<{
    [key: number]: { loading: boolean; added: boolean };
  }>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllProducts = useCallback(async () => {
    const products = await fetchProducts();
    setAllProducts(products);
    setFilteredProducts(products);
  }, []);

  const handleFetchCartProducts = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const products = await fetchCartProducts(userId);
      setCartProducts(products);
      setLoading(false);
    } catch (error: any) {
      console.error("Error while fetching..", error);
      setLoading(false);
    }
  }, []);

  const handleDecreaseQuantity = async (
    userId: string,
    product: CartProductsType
  ) => {
    try {
      if (userId) {
        await decreaseProductQuantity(userId, product);
        await handleFetchCartProducts(userId);
        await handleFetchTotalPrice(userId);
        await handleFetchTotalQuantity(userId);
      }
    } catch (error) {
      console.error("Error while decreasing..", error);
    }
  };

  const handleIncreaseQuantity = async (
    userId: string,
    product: CartProductsType
  ) => {
    try {
      if (userId) {
        await increaseProductQuantity(userId, product);
        await handleFetchCartProducts(userId);
        await handleFetchTotalPrice(userId);
        await handleFetchTotalQuantity(userId);
      }
    } catch (error) {
      console.error("Error while increasing..", error);
    }
  };

  const handleDeleteAllProducts = async (userId: string) => {
    try {
      if (userId) {
        await deleteProductsFromCard(userId);
        await handleFetchCartProducts(userId);
        await handleFetchTotalPrice(userId);
        await handleFetchTotalQuantity(userId);
      }
      showToast("All products deleted!");
    } catch (error) {
      console.error("error while deleting products", error);
    }
  };

  const handleDeleteSelectedProducts = async (
    userId: string,
    product: CartProductsType
  ) => {
    try {
      if (userId) {
        await deleteSelectedProductsFromCard(userId, product);
        await handleFetchCartProducts(userId);
        await handleFetchTotalPrice(userId);
        await handleFetchTotalQuantity(userId);
      }
      showToast(`Selected product deleted!`);
    } catch (error) {
      console.error("error while deleting products", error);
    }
  };

  const handleAddtoCart = useCallback(
    async (user_id: string, product: Productstype) => {
      setProductStates((prevState) => ({
        ...prevState,
        [String(product.id)]: { loading: true, added: false },
      }));

      try {
        await addToCart(user_id, product);
        setProductStates((prevState) => ({
          ...prevState,
          [String(product.id)]: { loading: false, added: true },
        }));
        await handleFetchTotalQuantity(user_id);
        showToast(`${product.name} added to the cart.`);
      } catch (error: any) {
        console.error("Failed while adding to cart", error.message);

        setProductStates((prevState) => ({
          ...prevState,
          [String(product.id)]: { loading: false, added: false },
        }));

        showToast(`Could not add the product`);
      }
    },
    []
  );

  const handleFetchTotalPrice = useCallback(async (userId: string) => {
    try {
      const totalPrice = await fetchCartTotalPrice(userId);
      setTotalPrice(totalPrice);
    } catch (error: any) {
      console.error("Failed while fetching total price", error.message);
    }
  }, []);

  const handleFetchTotalQuantity = useCallback(async (userId: string) => {
    try {
      const totalQuantity = await fetchTotalQuantity(userId);
      setTotalQuantity(totalQuantity);
    } catch (error: any) {
      console.error("Failed while fetching total quantity");
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        fetchAllProducts,
        filteredProducts,
        selectedOrderBy,
        setSelectedOrderBy,
        handleAddtoCart,
        productStates,
        cartProducts,
        handleFetchCartProducts,
        handleDecreaseQuantity,
        handleIncreaseQuantity,
        handleDeleteAllProducts,
        handleDeleteSelectedProducts,
        handleFetchTotalPrice,
        totalPrice,
        totalQuantity,
        handleFetchTotalQuantity,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("error");
  }
  return context;
};

export default ProductContext;
