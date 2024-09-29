// DataContext.js
import React, { createContext, useState,useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Try to load data from localStorage
    const savedData = localStorage.getItem('data');
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    if (data) {
      // Save data to localStorage whenever it changes
      localStorage.setItem('data', JSON.stringify(data));
    }
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};