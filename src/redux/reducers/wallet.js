import {
  DECREASE_EXPENSE, DELETE_EXPENSE_TABLE,
  EDIT_EXPENSE, EDIT_TOTAL_VALUE, RESPONSE_WALLET_SUCCESS,
  SET_EDIT,
  SET_EXPENSES, SET_TOTAL_VALUE,
} from '../actions/actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  sumExpense: '0',
};

function expenseDataReducer(state = INITIAL_STATE, action) {
  const { payload } = action;
  const conta = Number(state.sumExpense) + Number(payload);
  const editToExpense = state.expenses.map((expense) => (expense.id === state.idToEdit
    ? ({ ...expense, ...payload }) : ({ ...expense })));
  switch (action.type) {
  case RESPONSE_WALLET_SUCCESS:
    return {
      ...state,
      currencies: payload,
    };
  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case SET_TOTAL_VALUE:
    return {
      ...state,
      sumExpense: parseFloat(conta).toFixed(2),
    };
  case EDIT_TOTAL_VALUE:
    return {
      ...state,
      sumExpense: payload,
    };
  case DELETE_EXPENSE_TABLE:
    return {
      ...state,
      expenses: payload,
    };
  case DECREASE_EXPENSE:
    return {
      ...state,
      sumExpense: payload.toFixed(2),
    };
  case SET_EDIT:
    return {
      ...state,
      editor: !state.isEditing,
      idToEdit: payload.id,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: editToExpense,
      editor: false,
    };
  default: return state;
  }
}

export default expenseDataReducer;

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
