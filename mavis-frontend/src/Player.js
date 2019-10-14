import React from 'react';
const store = require('store');
const axios = require('axios');


export class Player extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      formattedPrice: "0"
    }
    this.buy = this.buy.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.formatPrice();
  }

  formatPrice() {
    var formattedPrice = (this.props.price/10000).toFixed(2)
    this.setState({formattedPrice: formattedPrice})
  }

  buy() {
    const token = "Token " + store.get('token');
    // const token = store.get('token');
    const user = store.get('user');
    const headers = {Authorization: token};
    console.log(this.state.value + " shares of " + this.props.ticker + " @" + this.state.formattedPrice);

    var buy = axios.post('api/players/buy', {
      user: user,
      ticker: this.props.ticker,
      shares: this.state.value
    }, {headers: headers })
    .then((response) => {
      
    })
    .catch(function (error) {
      // handle error
      console.log("error")
      console.log(error)
      console.log(token)
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <div>
          {this.props.ticker} 
          -
          ${this.state.formattedPrice}
        </div>
        <div>
          <button onClick={this.buy}>Buy</button>
          <button>Sell</button>
          <input type="text" onChange={this.handleChange} /> shares
        </div>
      </div>
    );
  }
  
}
