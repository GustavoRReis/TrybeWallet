// Coloque aqui suas actions
import { SET_LOGIN_DATA, SET_WALLET_DATA,
  REQUEST_WALLET_DATA, RESPONSE_WALLET_SUCCESS, REQUEST_WALLET_FAILURE,
  SET_EXPENSES,
  SET_TOTAL_VALUE,
  DELETE_EXPENSE_TABLE,
  DECREASE_EXPENSE,
  EDIT_EXPENSE,
  SET_EDIT,
  EDIT_TOTAL_VALUE } from './actions';

export function setLoginData(email) {
  return {
    type: SET_LOGIN_DATA,
    email,
  };
}

export function setWalletData(wallet) {
  return {
    type: SET_WALLET_DATA,
    wallet,
  };
}

export const requestWalletData = () => ({
  type: REQUEST_WALLET_DATA,
});

export const responseWalletSuccess = (payload) => ({
  type: RESPONSE_WALLET_SUCCESS, payload,
});

export const requestWalletFailure = (error) => ({
  type: REQUEST_WALLET_FAILURE, error,
});

export const setExpenses = (payload) => ({
  type: SET_EXPENSES,
  payload,
});

export const setTotalValue = (payload) => ({
  type: SET_TOTAL_VALUE,
  payload,
});

export const deleteExpenseTable = (payload) => ({
  type: DELETE_EXPENSE_TABLE,
  payload,
});

export const decreaseExpense = (payload) => ({
  type: DECREASE_EXPENSE,
  payload,
});

export const setEdit = (payload) => ({
  type: SET_EDIT,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const editTotalValue = (payload) => ({
  type: EDIT_TOTAL_VALUE,
  payload,
});
