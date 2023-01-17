import React from 'react';
import './Wallet.css';
import Header from '../../components/Header';
import WalletForm from '../../components/WalletForm';
import Table from '../../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div className="bodyMain">
        <div className="headerMain">
          <Header />
          <WalletForm />
        </div>
        <div className="walltetMain">
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
