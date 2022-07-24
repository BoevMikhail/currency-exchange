import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/AppRouter.jsx";
import Navbar from "./components/UI/Navbar/Navbar";
import "./styles/App.css";
import { CurrencyListContext } from "./context"
import { useState, useEffect } from "react";
import CurrencyService from "./API/CurrencyService.js";
import { useFetching } from "./hooks/useFetching.js";

function App() {
  let [currList, setCurrList] = useState({});

  const [fetchCurrencies, isCurrenciesLoading] = useFetching(async () => {
    const response = await CurrencyService.getCurrencies();
    setCurrList(response.rates);
    sessionStorage.setItem('list', JSON.stringify(response.rates));
  })

  useEffect(() => {
    if (!sessionStorage.getItem('list')) {
      fetchCurrencies();
    } else {
      setCurrList(JSON.parse(sessionStorage.getItem('list')))
    }
  }, [])



  return (
    <CurrencyListContext.Provider value={{
      currList,
      isCurrenciesLoading
    }}>
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
