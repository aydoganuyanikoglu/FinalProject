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
  fetchCartTotalPrice,
  addToCart,
  fetchCartProducts,
  fetchTotalQuantity,
  increaseProductQuantity,
  decreaseProductQuantity,
  deleteProductsFromCard,
  deleteSelectedProductsFromCard,
  fetchProductById,
  addToFavoriteProducts,
  fetchFavoriteProducts,
  removeFromFavoriteProducts,
  fetchReviews,
  addReview,
  fetchReviewStatsByProductId,
  fetchBrands,
  deleteProduct,
  addProductToDatabase,
  fetchTotalDiscount,
} from "@/lib/data";
import {
  Productstype,
  CartProductsType,
  FavoriteProductsType,
  ReviewsType,
  CommentType,
  BrandsType,
  Productstype2,
} from "@/lib/types";
import { useToast } from "./ToastContext";

interface ProductContextType {
  isMobile: boolean;
  loadingReviews: boolean;
  reviews: ReviewsType[];
  totalQuantity: number | undefined;
  totalDiscount: number | undefined;
  totalPrice: number | undefined;
  loading: boolean;
  allProducts: Productstype[];
  cartProducts: CartProductsType[] | undefined;
  favoriteProducts: FavoriteProductsType[] | undefined;
  filteredProducts: Productstype[];
  productStates: { [key: string]: { loading: boolean; added: boolean } };
  productById?: Productstype;
  favoriteButtonState: boolean;
  cartButtonState: { loading: boolean; added: boolean };
  reviewStats: { reviewCount: number; avgRating: number };
  brands: BrandsType[];
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
  handleFetchProductbyId: (productId: string) => Promise<void>;
  handleFetchFavoriteProducts: (userId: string) => Promise<void>;
  handleAddToFavorites: (
    userId: string,
    product: Productstype
  ) => Promise<void>;
  handleRemoveFromFavorites: (
    userId: string,
    productId: string
  ) => Promise<void>;
  handleFetchReviews: (productId: string) => Promise<void>;
  handleAddReview: (
    values: CommentType,
    userId: string,
    userName: string,
    productId: string,
    productName: string | undefined
  ) => Promise<void>;
  handleFetchReviewCount: (productId: string) => Promise<void>;
  handleFetchBrands: () => Promise<void>;
  handleDeleteProduct: (productId: string) => Promise<void>;
  handleAddProductToDatabase: (values: Productstype2) => Promise<void>;
  handleFetchTotalDiscount: (userId: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { showToast } = useToast();
  const [totalDiscount, setTotalDiscount] = useState<number | undefined>(0);
  const [productById, setProductById] = useState<Productstype>();
  const [allProducts, setAllProducts] = useState<Productstype[]>([]);
  const [cartProducts, setCartProducts] = useState<
    CartProductsType[] | undefined
  >([]);
  const [favoriteProducts, setFavoriteProducts] = useState<
    FavoriteProductsType[] | undefined
  >([]);
  const [filteredProducts, setFilteredProducts] =
    useState<Productstype[]>(allProducts);
  const [totalPrice, setTotalPrice] = useState<number | undefined>(0);
  const [totalQuantity, setTotalQuantity] = useState<number | undefined>(0);
  const [productStates, setProductStates] = useState<{
    [key: number]: { loading: boolean; added: boolean };
  }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [cartButtonState, setCartButtonState] = useState({
    loading: false,
    added: false,
  });
  const [favoriteButtonState, setFavoriteButtonState] = useState(false);
  const [reviews, setReviews] = useState<ReviewsType[]>([]);
  const [reviewStats, setReviewStats] = useState({
    reviewCount: 0,
    avgRating: 0,
  });
  const [brands, setBrands] = useState<BrandsType[]>([]);
  const [loadingReviews, setloadingReviews] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1060);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchAllProducts = useCallback(async () => {
    const products = await fetchProducts();
    setLoading(false);
    setAllProducts(products);
    setFilteredProducts(products);
  }, []);

  const handleAddProductToDatabase = useCallback(
    async (values: Productstype2) => {
      try {
        await addProductToDatabase(values);
      } catch (error) {
        console.error("Error while fetching favorite products..", error);
      }
    },
    []
  );

  const handleFetchBrands = useCallback(async () => {
    const brands = await fetchBrands();
    setBrands(brands);
  }, []);

  const handleFetchFavoriteProducts = useCallback(async (userId: string) => {
    try {
      const products = await fetchFavoriteProducts(userId);
      setLoading(false);
      setFavoriteProducts(products);
    } catch (error: any) {
      console.error("Error while fetching favorite products..", error);
      setLoading(false);
    }
  }, []);

  const handleFetchReviewCount = useCallback(async (productId: string) => {
    try {
      const reviewsCount = await fetchReviewStatsByProductId(productId);
      console.log("review count", reviewsCount);
      setReviewStats(reviewsCount);
    } catch (error: any) {
      console.error("Error while fetching reviews", error);
    }
  }, []);

  const handleFetchReviews = useCallback(async (productId: string) => {
    setloadingReviews(true);
    try {
      const reviews = await fetchReviews(productId);
      setReviews(reviews);
      setloadingReviews(false);
    } catch (error: any) {
      console.error("Error while fetching reviews", error);
      setloadingReviews(false);
    }
  }, []);

  const handleDeleteProduct = useCallback(async (productId: string) => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.error("Error while removing product", error);
    }
  }, []);

  const handleAddReview = useCallback(
    async (
      values: CommentType,
      userId: string,
      userName: string,
      productId: string,
      productName: string | undefined
    ) => {
      try {
        await addReview(values, userId, userName, productId, productName);
        await handleFetchReviews(productId);
        await handleFetchReviewCount(productId);
      } catch (error) {
        console.error("Error while adding to reviews..", error);
      }
    },
    []
  );

  const handleAddToFavorites = useCallback(
    async (userId: string, product: Productstype) => {
      setFavoriteButtonState(true);
      try {
        await addToFavoriteProducts(userId, product);
        await handleFetchFavoriteProducts(userId);
        setFavoriteButtonState(false);
        showToast(`${product.name} added to favorites!`);
      } catch (error) {
        console.error("Error while adding to favorite products..", error);
        setFavoriteButtonState(false);
      }
    },
    []
  );

  const handleRemoveFromFavorites = useCallback(
    async (userId: string, productId: string) => {
      setFavoriteButtonState(true);
      try {
        await removeFromFavoriteProducts(userId, productId);
        await handleFetchFavoriteProducts(userId);
        setFavoriteButtonState(false);
        showToast("Removed from favorite list!");
      } catch (error) {
        console.error("Error while removing from favorite products..", error);
      }
    },
    []
  );

  const handleFetchProductbyId = async (productId: string) => {
    setLoading(true);
    try {
      const product = await fetchProductById(productId);
      setProductById(product);
      setLoading(false);
    } catch (error) {
      console.error("Error while decreasing..", error);
      setLoading(false);
    }
  };

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

  const handleFetchTotalDiscount = useCallback(async (userId: string) => {
    try {
      const result = await fetchTotalDiscount(userId);
      console.log(result);
      setTotalDiscount(result);
    } catch (error) {
      console.error("Error while fetching total discount..");
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
        await handleFetchTotalDiscount(userId);
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
        await handleFetchTotalDiscount(userId);
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
        await handleFetchTotalDiscount(userId);
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
        await handleFetchTotalDiscount(userId);
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
      setCartButtonState({ loading: true, added: false });

      try {
        await addToCart(user_id, product);
        setProductStates((prevState) => ({
          ...prevState,
          [String(product.id)]: { loading: false, added: true },
        }));
        setCartButtonState({ loading: false, added: true });
        await handleFetchTotalQuantity(user_id);
        showToast(`${product.name} added to the cart.`);
      } catch (error: any) {
        console.error("Failed while adding to cart", error.message);

        setProductStates((prevState) => ({
          ...prevState,
          [String(product.id)]: { loading: false, added: false },
        }));
        setCartButtonState({ loading: false, added: true });
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
        handleFetchProductbyId,
        productById,
        handleFetchFavoriteProducts,
        handleAddToFavorites,
        favoriteProducts,
        handleRemoveFromFavorites,
        cartButtonState,
        favoriteButtonState,
        reviews,
        handleFetchReviews,
        handleAddReview,
        reviewStats,
        handleFetchReviewCount,
        brands,
        handleFetchBrands,
        handleDeleteProduct,
        handleAddProductToDatabase,
        loadingReviews,
        totalDiscount,
        handleFetchTotalDiscount,
        isMobile,
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
