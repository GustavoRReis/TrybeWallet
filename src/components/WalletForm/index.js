/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { Component } from 'react';
import './WalletForm.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpense, editTotalValue,
  setExpenses, setTotalValue } from '../../redux/actions';
import { fetchApi, getApiCurrency } from '../../services';
import ButtonForm from '../ButtonForm';

const alimentação = 'Alimentação';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: alimentação,
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getApiCurrency());
  }

  handleChange = ({ target }) => {
    /* console.log(target.value); */
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  formSubmit = async (event) => {
    event.preventDefault();
    const { dispatch, editor/* , id: idNumber */ } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    this.setState({ id: id + 1 });
    const exchangeRates = await (fetchApi());
    delete exchangeRates.USDT;
    if (!editor) {
      dispatch(setExpenses({
        id,
        value,
        currency,
        method,
        tag,
        description,
        exchangeRates,
      }));
      this.setState({
        value: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: alimentação,
        description: '',
      });
      const sum = ((value) * (exchangeRates[currency].ask));
      dispatch(setTotalValue((sum)));
    }
    if (editor) {
      dispatch(editExpense({
        value,
        description,
        currency,
        method,
        tag,
      }));
      const { expenses } = this.props;
      const newTotalValue = expenses;
      let total = 0;
      newTotalValue.forEach(({ exchangeRates: ex, currency: curr, value: vl }) => {
        total += parseFloat(ex[curr].ask) * parseFloat(vl);
      });
      dispatch(editTotalValue((total).toFixed(2)));
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: alimentação,
      });
    }
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <section className="formularioWallet">
        <div>
          <form className="bodyWallterForm">
            <label htmlFor="valueExpense">
              Valor
              <br />
              <input
                className="inputsWallet"
                placeholder="R$"
                type="number"
                data-testid="value-input"
                id="valueExpense"
                name="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="descriptionExpense">
              Descrição
              <br />
              <input
                className="inputsWallet"
                placeholder="Descreva sua despesa"
                type="text"
                data-testid="description-input"
                id="descriptionExpense"
                onChange={ this.handleChange }
                value={ description }
                name="description"
              />
            </label>

            <label htmlFor="currency">
              Moeda
              <br />
              <select
                className="inputsWallet"
                data-testid="currency-input"
                id="currency"
                onChange={ this.handleChange }
                value={ currency }
                name="currency"
              >
                {currencies.map((curr, index) => (
                  <option key={ index } value={ curr }>
                    {curr}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="paymentMethod">
              Método de Pagamento
              <br />
              <select
                className="inputsWallet"
                data-testid="method-input"
                id="paymentMethod"
                onChange={ this.handleChange }
                value={ method }
                name="method"
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>

            <label htmlFor="category">
              Categoria
              <br />
              <select
                className="inputsWallet"
                data-testid="tag-input"
                id="category"
                onChange={ this.handleChange }
                value={ tag }
                name="tag"
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>

            {editor ? (
              <ButtonForm text="Editar despesas" formSubmit={ this.formSubmit } />
            ) : (
              <ButtonForm
                text="Adicionar despesas"
                formSubmit={ this.formSubmit }
              />
            )}
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  sumExpense: state.wallet.sumExpense,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
  editor: PropTypes.bool.isRequired,
  /* sumExpense: PropTypes.string.isRequired, */
  expenses: PropTypes.arrayOf(Array).isRequired,
  /* id: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired, */
};

export default connect(mapStateToProps)(WalletForm);
