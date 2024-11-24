"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { typeUsers } from "../lib/types";

interface AuthContextType {
  currentUser: typeUsers | null;
  loginClient: () => void;
  logoutClient: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<typeUsers | null>(null);
  const router = useRouter();

  const fetchCookie = async () => {
    const res = await fetch(`/api/getUserCookie`);

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      return null;
    }
  };

  const setUserviaCookie = async () => {
    const cookieData = await fetchCookie();
    if (!cookieData) {
      localStorage.removeItem("currentUser");
    } else {
      localStorage.setItem("currentUser", JSON.stringify(cookieData));
    }
  };

  useEffect(() => {
    const runItOrder = async () => {
      await setUserviaCookie();
      const user = localStorage.getItem("currentUser");
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    };
    runItOrder();
  }, []);

  const loginClient = async () => {
    try {
      const user = await fetchCookie();
      setCurrentUser(user);
      if (user.isAdmin) {
        router.push("/adminpanel");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logoutClient = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginClient, logoutClient }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("error");
  }
  return context;
};

export default AuthContext;
