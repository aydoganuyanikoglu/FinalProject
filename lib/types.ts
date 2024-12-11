export type profileInfoType = {
  name: string;
  lastname: string;
  dateofbirth: string;
};

export type BrandsType = {
  brand: string;
};

export type typeUsers = {
  id?: string | undefined;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  isAdmin?: boolean;
  expiresAt?: Date;
  created_at?: Date;
};

export type Productstype = {
  id: string;
  name: string;
  category: string;
  short_description: string;
  long_description?: string;
  price: string;
  image_url: string;
  discount_price?: string;
  discount_start_date?: Date;
  discount_end_date?: Date;
  discount_percentage?: string;
  brand?: string;
  review_count?: number;
  average_rating?: number;
};

export type Productstype2 = {
  id?: string;
  name: string;
  category: string;
  short_description: string;
  long_description?: string;
  price: string;
  image_url: string;
  discount_price?: string;
  discount_start_date?: Date | null;
  discount_end_date?: Date | null;
  discount_percentage?: number | null;
  brand?: string;
};

export type addressesType = {
  id?: string;
  user_id?: string;
  name: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  postalcode: string;
  addresstitle: string;
  address: string;
};

export type FavoriteProductsType = {
  id: string;
  user_id: string;
  name: string;
  category: string;
  short_description: string;
  long_description?: string;
  price: string;
  image_url: string;
  discount_price?: string;
  discount_start_date?: Date;
  discount_end_date?: Date;
  discount_percentage?: string;
  brand?: string;
};

export type CartProductsType = {
  user_id: string;
  quantity: number;
  id: string;
  name: string;
  category: string;
  short_description: string;
  long_description?: string;
  price: string;
  image_url: string;
  discount_price?: string;
  discount_start_date?: Date;
  discount_end_date?: Date;
  discount_percentage?: string;
  brand?: string;
};

export type ReviewsType = {
  id: string;
  user_id: string;
  product_id: string;
  user_name: string;
  rating: number;
  review_title: string;
  review: string;
  created_at?: Date;
};

export type CommentType = {
  rating: number;
  title: string;
  review: string;
};

export type typeFormState =
  | {
      user?: {
        id?: string;
        firstname: string;
        lastname: string;
        email: string;
      };
      message?: string;
    }
  | undefined;

export type typeLogin = {
  email: string;
  password: string;
};
