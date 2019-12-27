import React from 'react';
import { PlayerChart } from './PlayerChart';
const store = require('store');
const axios = require('axios');


export class Player extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      formattedPrice: "0",
      expandedView: false
    }
    this.buy = this.buy.bind(this);
    this.sell = this.sell.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.holdUpThere = this.holdUpThere.bind(this);
    this.toggleExpandedView = this.toggleExpandedView.bind(this);
  }

  componentDidMount() {
    this.getCurrentPrice();
  }


  getCurrentPrice() {
    fetch('http://127.0.0.1:5000/players/'+this.props.ticker)
            .then((response) => response.json())
            .then((responseJson) => {
              var formattedPrice = (responseJson.price/10000).toFixed(2)
              this.setState({
                formattedPrice: formattedPrice
              })
              console.log(responseJson);
              
            })
            .catch((error) => {
              console.error(error);
            });
  }

  holdUpThere(e) {
    e.stopPropagation();
  }
  buy(e) {
    e.stopPropagation();

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

  sell(e) {
    e.stopPropagation();

    const token = "Token " + store.get('token');
    // const token = store.get('token');
    const user = store.get('user');
    const headers = {Authorization: token};
    console.log(this.state.value + " shares of " + this.props.ticker + " @" + this.state.formattedPrice);

    var sell = axios.post('api/players/sell', {
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

  stylePercentChange() {
    var change = this.props.percentChange
    var modifier = "";
    if(change.charAt(0) == "+") {
      modifier = "positive-change";
    } else if(change.charAt(0) == "-") {
      modifier = "negative-change";
    }
    return <span className={"percent " + modifier}>({this.props.percentChange})</span>
  }

  toggleExpandedView() {
    this.setState(state => ({
      expandedView: !state.expandedView
    }));
  }

  render() {
    return (
      <div className="stock-card" onClick={this.toggleExpandedView}>
        <div className="stock-header">
          {this.props.ticker} 
          -
          ${this.state.formattedPrice}

          {this.props.percentChange &&
          
            this.stylePercentChange()
          }
        </div>
        <div className={"stock-body " + (this.state.expandedView ? 'open' : 'closed')}>
          {/* {this.state.expandedView &&  */}
            <PlayerChart></PlayerChart>
          {/* } */}

        </div>
        <div className="stock-controls" onClick={this.holdUpThere}>
          <button onClick={this.buy}>Buy</button>
          <button onClick={this.sell}>Sell</button>
          <input type="text" onChange={this.handleChange} /> {this.props.numberOfShares} shares
        </div>
      </div>
    );
  }
  
}
