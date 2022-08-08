import CurrencyList from "./CurrencyList.json";

export default class CurrencyService {
  static API_KEY = process.env.REACT_APP_API_KEY;
  static USE_LOCAL = this.API_KEY == null || false;

  static getCurrencies = async () => {
    if (CurrencyService.USE_LOCAL) {
      return CurrencyList.rates;
    }

    const storage = sessionStorage.getItem("list");
    const isExistsInStorage = storage != null;
    if (isExistsInStorage) {
      return JSON.parse(storage);
    }

    return await fetch("https://api.apilayer.com/exchangerates_data/latest", {
      method: "GET",
      redirect: "follow",
      headers: {apikey: CurrencyService.API_KEY},
    }).then((response) => {
      let isKeyLimit = response.status === 429;
      if (isKeyLimit) {
        CurrencyService.USE_LOCAL = true;
        return CurrencyList.rates;
      }

      return response.json().then((data) => {
        const rates = data.rates;
        sessionStorage.setItem("list", JSON.stringify(rates));
        return rates;
      });
    });
  };
}
