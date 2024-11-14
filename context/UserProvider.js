import React, { createContext, useState, useEffect, Children, useContext } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

