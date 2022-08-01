import CurrencyList from './CurrencyList.json'

export default class CurrencyService {
  static getCurrencies = async () => {
    const storage = sessionStorage.getItem('list');
    const API_KEY = process.env.REACT_APP_API_KEY;

    if (!API_KEY) {
      return CurrencyList.rates;
    }

    if (storage) {
      if (storage === 'limitIsOut') {
        return CurrencyList.rates;
      }
      return JSON.parse(storage);
    } else {
      let status;

      const response = await fetch('https://api.apilayer.com/exchangerates_data/latest', {
        method: 'GET',
        redirect: 'follow',
        headers: {'apikey': API_KEY}
      })
        .then(response => {status = response.status; return response.json()})

      //Only 250 requests per month, status 429 - limit is out
      if (status === 429) {
        sessionStorage.setItem('list', 'limitIsOut');
        return CurrencyList.rates
      };

      sessionStorage.setItem('list', JSON.stringify(response.rates));
      return response.rates;
    }
  }
}


