import { requestWalletFailure, responseWalletSuccess } from '../redux/actions';

const API_CURRENCY = 'https://economia.awesomeapi.com.br/json/all';

export async function fetchApi() {
  const response = await fetch(API_CURRENCY);
  const data = await response.json();
  /* console.log(data); */
  return data;
}

export function getApiCurrency() {
  return async (dispatch) => {
    try {
      const response = await fetch(API_CURRENCY);
      const data = await response.json();
      const dataWallet = Object.keys(data).filter((currency) => currency !== 'USDT');
      /* console.log(dataWallet); */
      dispatch(responseWalletSuccess(dataWallet));
    } catch (error) {
      dispatch(requestWalletFailure(error.message));
    }
  };
}
