'use client'

import React, { createContext, useState, useContext } from 'react';

const UserTypeContext = createContext();

export const UserTypeProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);

  const handleButtonClick = (user) => {
    setUserType(user);
  };

  return (
    <UserTypeContext.Provider value={{ userType, handleButtonClick }}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserTypeContext = () => {
  return useContext(UserTypeContext);
};