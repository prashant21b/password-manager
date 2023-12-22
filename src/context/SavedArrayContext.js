
import { createContext, useContext, useState, useEffect } from 'react';

const SavedArrayContext = createContext();

export const SavedArrayProvider = ({ children }) => {
  const [savedArray, setSavedArray] = useState([]);

  useEffect(() => {
    const storedPassword = JSON.parse(localStorage.getItem("savedArray")) || [];
    setSavedArray(storedPassword);
  }, []);

  return (
    <SavedArrayContext.Provider value={{ savedArray, setSavedArray }}>
      {children}
    </SavedArrayContext.Provider>
  );
};

export const useSavedArray = () => {
  return useContext(SavedArrayContext);
};
