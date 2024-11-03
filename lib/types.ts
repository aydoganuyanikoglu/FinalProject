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
