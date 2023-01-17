/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLoginData } from '../../redux/actions';
import './Login.css';
import LogoLogin from './images/LogoLogin2.png';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonDisabled: true,
  };

  handleChange = ({ target }) => {
    /* console.log(target); */
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateButton());
  };

  validateButton = () => {
    const { email, password } = this.state;
    const sizeArray = 5;
    const validateEmail = email.includes('@') && email.includes('.com');
    if (validateEmail && password.length > sizeArray) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(setLoginData(email));
    history.push('/carteira');
  };

  render() {
    const { buttonDisabled, email, password } = this.state;
    return (
      <main className="mainLogin">
        <body className="bodyLogin">
          <div className="boxInputs">
            <div className="tittleLogin">
              <p>Trybe Wallet</p>
              <img className="imagemLogin" src={ LogoLogin } alt="logoLogin" />
            </div>

            <div className="inputsLogin">
              <form className="formLogin" onSubmit={ this.handleSubmit }>
                <label htmlFor="email">
                  <input
                    placeholder="Email"
                    type="email"
                    data-testid="email-input"
                    id="email"
                    value={ email }
                    name="email"
                    required
                    onChange={ this.handleChange }
                  />
                </label>

                <label id="inputSenha" htmlFor="password">
                  <input
                    placeholder="Senha"
                    type="password"
                    data-testid="password-input"
                    id="password"
                    value={ password }
                    name="password"
                    required
                    onChange={ this.handleChange }
                  />
                </label>

                <button id="buttonCamp" type="submit" disabled={ buttonDisabled }>
                  Login
                </button>
              </form>
            </div>

            <div className="rodapeLogin">
              Para fazer Login insira um e-mail válido e uma senha de no mínimo
              6 dígitos
            </div>
          </div>
        </body>
      </main>
    );
  }
}

/* const mapDispatchToProps = (dispatch) => ({
  setLoginData: (user) => dispatch(setLoginData(user)),
}); */

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
