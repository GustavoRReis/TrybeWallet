import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decreaseExpense,
  deleteExpenseTable, setEdit } from '../../redux/actions';
import './Table.css';

class Table extends Component {
  buttonRemoveExpense = (event) => {
    event.preventDefault();
    const { expenses, dispatch } = this.props;
    const deleteTable = expenses.filter(({ id }) => id !== Number(event.target.id));
    dispatch(deleteExpenseTable(deleteTable));
    let newSumExpense = 0;
    deleteTable.forEach(({ value, exchangeRates, currency }) => {
      const cotacao = Number(exchangeRates[currency].ask);
      const sum = (value * cotacao);
      newSumExpense += sum;
      /* return newSumExpense; */
    });
    dispatch(decreaseExpense(newSumExpense));
  };

  buttonEditExpense = ({ id }) => {
    const { dispatch } = this.props;
    dispatch(setEdit({ id }));
    /* console.log(expenses.map((e) => e.id === idEdit));
    dispatch(editExpense(payload)); */
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="tableWalltet">
        {/* <thead className="tableHead">
            <tr>
              <th> Descrição </th>
              <th> Tag </th>
              <th> Método de pagamento </th>
              <th> Valor </th>
              <th> Moeda </th>
              <th> Câmbio utilizado </th>
              <th> Valor convertido </th>
              <th> Moeda de conversão </th>
              <th> Editar/Excluir </th>
            </tr>
          </thead> */}
        <div className="divBody">
          {expenses.map(
            ({
              id,
              description,
              tag,
              method,
              value,
              exchangeRates,
              currency,
            }) => (
              <ul key={ id }>
                <li>
                  <p> Descrição </p>
                  {description}
                </li>

                <li>
                  <p>Categoria</p>
                  {tag}
                </li>
                <li>
                  <p> Método de pagamento </p>
                  {method}
                </li>
                <li>
                  <p> Valor </p>
                  {Number(value).toFixed(2)}
                </li>
                <li>
                  <p> Moeda </p>
                  {exchangeRates[currency].name}
                </li>
                <li>
                  <p> Câmbio utilizado </p>
                  {Number(exchangeRates[currency].ask).toFixed(2)}
                </li>
                <li>
                  <p> Valor convertido </p>
                  {(Number(exchangeRates[currency].ask) * value).toFixed(2)}
                </li>
                <li>
                  <p> Moeda de conversão </p>
                  Real
                </li>
                <li>
                  <button
                    id="buttonEditar"
                    type="submit"
                    data-testid="edit-btn"
                    onClick={ () => {
                      this.buttonEditExpense({ id });
                    } }
                  >
                    Editar
                  </button>
                  <button
                    className="buttonExcluir"
                    type="submit"
                    data-testid="delete-btn"
                    id={ id }
                    onClick={ this.buttonRemoveExpense }
                  >
                    Excluir
                  </button>
                </li>
              </ul>
            ),
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idEdit: state.wallet.idEdit,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
