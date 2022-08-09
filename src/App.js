import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter.jsx";
import Navbar from "./components/UI/Navbar/Navbar";
import "./App.css";
import {CurrencyListContext} from "./context";
import {useState, useEffect} from "react";
import CurrencyService from "./service/CurrencyService.js";
import {useFetching} from "./hooks/useFetching.js";
import LocalVersionWarning from "./components/UI/Warnings/LocalVersionWarning.jsx";

function App() {
  const [currList, setCurrList] = useState({});
  const currencyCurrent = useState("RUB");
  const localVersion = useState(false);
  const [useLocal, setUseLocal] = localVersion;

  const [fetchCurrencies, isCurrenciesLoading] = useFetching(
    async (currency, useLocal, setUseLocal) => {
      setCurrList("");
      const response = await CurrencyService.getCurrencies(currency, useLocal, setUseLocal);
      setCurrList(response);
    }
  );

  useEffect(() => {
    fetchCurrencies(currencyCurrent[0], useLocal, setUseLocal);
    // eslint-disable-next-line
  }, [currencyCurrent[0]]);

  return (
    <CurrencyListContext.Provider
      value={{
        currList,
        isCurrenciesLoading,
        currencyCurrent,
        localVersion,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <AppRouter />
        </div>
        {localVersion[0] && <LocalVersionWarning />}
      </BrowserRouter>
    </CurrencyListContext.Provider>
  );
}

export default App;
