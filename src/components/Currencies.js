import React from 'react';

import { diffAmounts, formatMoney, fetch } from '../utils';

class Currencies extends React.Component {
  constructor() {
    super();

    this.state = {
      totalAmount: 0.0,
      initialAmount: 0.0
    };

    fetch('/currencies?currency=EUR').then(response => {
      response.json().then(funds => {
        const initialAmount = funds.map(h => {
          return h.initial_amount;
        }).reduce((a, b) => {
          return a + b;
        });

        const totalAmount = funds.map(h => {
          return h.amount;
        }).reduce((a, b) => {
          return a + b;
        });

        this.setState({
          totalAmount: totalAmount,
          initialAmount: initialAmount
        });

        funds = funds.map(h => {
          return { label: h.amount_currency, value: h.amount };
        });

        window.Morris.Donut({
          element: 'morris-donut-chart-ws',
          data: funds,
          formatter: (y, data) => {
            return formatMoney(y, 'EUR');
          },
          resize: true
        });
      });
    });
  }

  render() {
    const diff = diffAmounts(this.state.initialAmount, this.state.totalAmount, 'EUR');
    const initialAmount = `Initial amount: ${formatMoney(this.state.initialAmount, 'EUR')} (${diff})`;

    return(
      <div className="col-lg-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title pull-left">
              <h3 className="panel-title"><i className="fa fa-money fa-fw"></i> Currencies</h3>
            </div>

            <div className="clearfix"></div>
          </div>
          <div className="panel-body">
            <div id="morris-donut-chart-ws"></div>

            <h3 className="text-center">
              <span className="label label-default" title={initialAmount}>
                {formatMoney(this.state.totalAmount, 'EUR')}
              </span>
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Currencies;
