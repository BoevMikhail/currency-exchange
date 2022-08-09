import CurrencyList from "./CurrencyList.json";

export default class CurrencyService {
  static API_KEY = process.env.REACT_APP_API_KEY;

  static getCurrencies = async (currency, useLocal, setUseLocal) => {
    if (this.API_KEY == null) {
      setUseLocal(true);
    }
    if (useLocal) {
      return CurrencyList.rates;
    }

    return await fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${currency}`, {
      method: "GET",
      redirect: "follow",
      headers: {apikey: CurrencyService.API_KEY},
    }).then((response) => {
      let isKeyLimit = response.status === 429;
      if (isKeyLimit) {
        setUseLocal(true);
        return CurrencyList.rates;
      }

      return response.json().then((data) => data.rates);
    });
  };

  static exchangeCurrencies = async (amount, from, to, setUseLocal) => {
    return await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      {
        method: "GET",
        redirect: "follow",
        headers: {apikey: CurrencyService.API_KEY},
      }
    ).then((response) => {
      let isKeyLimit = response.status === 429;
      if (isKeyLimit) {
        setUseLocal(true);
        return ["Limit is out. Repeat attempt to use local version", true];
      }
      let isWrongCurrency = response.status === 400;
      if (isWrongCurrency) return response.json().then((data) => [data["error"]["message"], true]);

      return response.json().then((data) => data["result"]);
    });
  };
}
