import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  address: object;
  payment: object;
  orders: []; // Define the type for orders as per your requirements
  cart: [
    {
      product: Product;
      quantity: number;
      _id: string;
    }
  ];
}

type UserContextType = {
  user: User; // Define the type for user as per your requirements
  setUser: React.Dispatch<React.SetStateAction<User>>;
  sessionId: string | null;
  logout: () => void;
  session: SessionType;
  setSession: React.Dispatch<React.SetStateAction<SessionType>>;
};
interface Product {
  // Define the properties of the product object

  name: string;
  price: number;
  quantity: number;
  nutrition: string;
  sectionId: string;
  servings: number;
  hexColor: string;
  displayName: string;
  productType: string;
}
const initialSessionType: SessionType = {
  sessionId: "",
  cart: [
    {
      product: {
        name: "",
        price: 0,
        quantity: 0,
        nutrition: "",
        sectionId: "",
        servings: 0,
        hexColor: "",
        displayName: "",
        productType: "",
      },
      quantity: 0,
      _id: "",
    },
  ],
};
interface SessionType {
  sessionId: string;
  cart: [
    {
      product: Product;
      quantity: number;
      _id: string;
    }
  ];
}
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
  });

  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL, // Replace with your actual server URL
  });

  // const createNewSession = async (sessionId: string | null) => {
  //   try {
  //     // Make a request to the server to create a new session
  //     const response = await instance.post("/createNewSession", { sessionId });
  //     setSessionId(response.data.session.sessionId);
  //     setSession(response.data.session);
  //   } catch (error) {
  //     console.error("Error creating new session:", error);
  //   }
  // };
  const checkSession = async (sessionId: string | null) => {
    try {
      // Make a request to the server to check if session exists
      console.log(sessionId);

      const response = await instance.post("/checkSession", {
        sessionId: sessionId,
      });

      if (response.status == 200) {
        // If session doesn't exist, create a new one
        console.log("Session Retrieved:", response.data.session);
      }
      setSession(response.data.session);
    } catch (error) {
      console.error("Error checking session:", error);
    }
  };
  const [session, setSession] = useState<SessionType>(initialSessionType);
  const [sessionId, setSessionId] = useState<string | null>(() => {
    const storedSessionId = localStorage.getItem("sessionId");
    const sessionId = storedSessionId
      ? storedSessionId.split(":")[0].trim()
      : null;
    if (storedSessionId) {
      // Check if the session exists in MongoDB
      checkSession(sessionId);
      return sessionId;
    } else {
      // If no session ID in localStorage, create a new one
      const newSessionId = uuidv4();
      localStorage.setItem("sessionId", newSessionId);
      return newSessionId;
    }
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkSession = async (sessionId: string | null) => {
      try {
        // Make a request to the server to check if session exists
        console.log(sessionId);

        const response = await instance.post("/checkSession", {
          sessionId: sessionId,
        });

        if (response.status == 200) {
          // If session doesn't exist, create a new one
          console.log("Session Retrieved:", response.data.session);
        }
        setSession(response.data.session);
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

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
    checkSession(sessionId);
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
    <UserContext.Provider
      value={{ user, setUser, sessionId, logout, session, setSession }}
    >
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
