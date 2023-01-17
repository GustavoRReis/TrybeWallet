import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ButtonForm.css';

export default class ButtonForm extends Component {
  render() {
    const { text, formSubmit } = this.props;
    return (

      <button
        type="button"
        onClick={ formSubmit }
      >
        { text }

      </button>

    );
  }
}

ButtonForm.propTypes = {
  text: PropTypes.string.isRequired,
  formSubmit: PropTypes.func.isRequired,
};
