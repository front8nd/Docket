import React, { createContext, useState, useContext } from "react";
import SnackBar from "../components/SnackBar";

const SnackbarContext = createContext();

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    message: "",
    isVisible: false,
  });

  const showSnackbar = (message) => {
    setSnackbar({ message, isVisible: true });
    setTimeout(() => {
      setSnackbar({ message: "", isVisible: false });
    }, 3000);
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      {snackbar.isVisible && <SnackBar message={snackbar.message} />}
    </SnackbarContext.Provider>
  );
};
