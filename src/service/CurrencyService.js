import CurrencyList from './CurrencyList.json'

export default class CurrencyService {
  static getCurrencies = async () => {
    const storage = sessionStorage.getItem('list');

    if (storage) {
      if (storage === 'none') {
        return CurrencyList.rates;
      }
      return JSON.parse(storage);
    } else {
      let status;

      const response = await fetch('https://api.apilayer.com/exchangerates_data/latest', {
        method: 'GET',
        redirect: 'follow',
        headers: {'apikey': 'QS7et5WFDAORNCgSSuAt7MD0NTN6aZwd'}
      })
        .then(response => {status = response.status; return response.json()})

      //Only 250 requests per month, status 429 - limit is out
      if (status === 429) {
        sessionStorage.setItem('list', 'none');
        return CurrencyList.rates
      };

      sessionStorage.setItem('list', JSON.stringify(response.rates));
      return response.rates;
    }
  }
}


