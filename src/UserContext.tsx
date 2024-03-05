import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  orders: any[]; // Define the type for orders as per your requirements
}
type UserContextType = {
  user: User; // Define the type for user as per your requirements
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>({
    _id: "",
    username: "",
    email: "",
    password: "",
    orders: [],
  }); // Define the type for user as per your requirements
  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL, // Replace with your actual server URL
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkAuthentication = async () => {
      if (token) {
        try {
          // Make API call to verify token and fetch user data
          const response = await instance.get("/verify-token", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("checkAuthentication:", response);
          console.log(response);

          setUser({
            _id: response.data.userId,
            username: response.data.username,
            email: response.data.email,
            password: response.data.password,
            orders: [],
          });
        } catch (error) {
          console.error("User not authenticated:", error);
          logout();
        }
      } else {
        logout();
      }
    };
    checkAuthentication();
  }, []);
  const logout = () => {
    setUser({
      _id: "",
      username: "",
      email: "",
      password: "",
      orders: [],
    });
    localStorage.removeItem("token"); // Remove token from local storage
  };
  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
