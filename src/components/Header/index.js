import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';
import piggyBank from './images/piggyBank.png';
/* import { fetchApi } from '../services'; */

class Header extends Component {
  render() {
    const { user, sumExpense } = this.props;
    return (
      <header className="headerWallet">
        <img src={ piggyBank } alt="piggyBank" />
        <div id="usuarioHeader" data-testid="email-field">
          {`Bem vindo ${user}`}
        </div>
        <div id="somaTotalHeader" data-testid="total-field">
          {`Total das despesas: ${sumExpense} BRL`}
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  sumExpense: state.wallet.sumExpense,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
  sumExpense: PropTypes.string.isRequired,
  /* expenses: PropTypes.arrayOf(PropType.object.isRequired).isRequired, */
};
export default connect(mapStateToProps)(Header);
