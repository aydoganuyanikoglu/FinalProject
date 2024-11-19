export type profileInfoType = {
  name: string;
  lastname: string;
  dateofbirth: string;
};

export type typeUsers = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  isAdmin?: boolean;
  expiresAt?: Date;
};

export type Productstype = {
  id?: string;
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
};

export type typeFormState =
  | {
      user?: {
        id?: string;
        firstName: string;
        lastName: string;
        email: string;
      };
      message?: string;
    }
  | undefined;

export type typeLogin = {
  email: string;
  password: string;
};
