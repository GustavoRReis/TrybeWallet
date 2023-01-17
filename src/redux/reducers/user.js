import { SET_LOGIN_DATA } from '../actions/actions';

const INITIAL_STATE = {
  email: '',
};

function loginDataReducer(state = INITIAL_STATE, action) {
  const { email } = action;

  switch (action.type) {
  case SET_LOGIN_DATA:
    return {
      ...state, email,
    };
  default: return state;
  }
}

export default loginDataReducer;
// Esse reducer será responsável por tratar as informações da pessoa usuária
