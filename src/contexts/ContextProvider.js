import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else {
      setSymbol("$");
    }
  }, [currency]);

  return (
    <StateContext.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
