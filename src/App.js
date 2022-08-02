import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter.jsx";
import Navbar from "./components/UI/Navbar/Navbar";
import "./App.css";
import { CurrencyListContext } from "./context";
import { useState, useEffect } from "react";
import CurrencyService from "./service/CurrencyService.js";
import { useFetching } from "./hooks/useFetching.js";

function App() {
  const [currList, setCurrList] = useState({});
  const currencyCurrent = useState("RUB");

  const [fetchCurrencies, isCurrenciesLoading] = useFetching(async () => {
    const response = await CurrencyService.getCurrencies();
    setCurrList(response);
  });

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <CurrencyListContext.Provider
      value={{
        currList,
        isCurrenciesLoading,
        currencyCurrent,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <AppRouter />
        </div>
      </BrowserRouter>
    </CurrencyListContext.Provider>
  );
}

export default App;
