"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<string>("Neuer");

  const value = {
    selectedUser,
    setSelectedUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
