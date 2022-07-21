import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter.jsx";
import Navbar from "./components/UI/Navbar/Navbar";
import "./styles/App.css";
import { CurrencyListContext } from "./context"
import currencyList from "./API/CurrencyList.json"

function App() {
  const currList = currencyList.data;

  return (
    <CurrencyListContext.Provider value = {{currList}}>
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
