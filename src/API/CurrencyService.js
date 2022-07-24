import CurrencyList from './CurrencyList.json'

export default class CurrencyService {
  static getCurrencies = async () => {
    let status;

    const myHeaders = new Headers();
    myHeaders.append("apikey", "QS7et5WFDAORNCgSSuAt7MD0NTN6aZwd");

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    const response = await fetch('https://api.apilayer.com/exchangerates_data/latest', requestOptions).then(response => {status = response.status; return response.json()})

    //Only 250 requests per month, status 429 - limit is out
    if(status === 429) return CurrencyList;

    return response;
  }

}


