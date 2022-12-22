import React, { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useEffect } from "react";

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = async (name, username, email, password) => {
    const hashedPassword = await sha256(password);
    const { data } = await axios.post(`/api/user/new`, {
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
    });
    setCurrentUser(data.result);
  };

  const login = async (username, password) => {
    const hashedPassword = await sha256(password);
    const { data } = await axios.post(`/api/user/login`, {
      username: username,
      password: hashedPassword,
    });
    setCurrentUser(data.result);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const revalidate = async () => {
      const { data } = await axios.get("/api/user/auth");
      if (data.result) {
        setCurrentUser(data.result);
      }
    };
    revalidate();
  });

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
