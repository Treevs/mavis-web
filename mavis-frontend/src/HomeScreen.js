import React from 'react';
import { Player } from './Player';
const axios = require('axios');
const store = require('store');


class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      // portfolio: []
    }
    this.getPortfolioItemObj();
    this.getAllPlayers();
 
  }
 
  render() {
    return (
        <div>
          <h2>Portfolio</h2>
          {this.state.portfolio && 
          this.state.portfolio.map(function(item) {
            return <Player key={item._id} ticker={item.ticker} numberOfShares={item.numberOfShares} price={/*item.prettyPrice*/ item.currentPrice}>{item.ticker}</Player>
          })}

          <h2>All Players</h2>
          {this.state.objs && 
          this.state.objs.map(function(item) {
            return <Player key={item._id} ticker={item.ticker} numberOfShares={item.numberOfShares} price={item.price}>{item.ticker}</Player>
          })}
        </div>
    )
  }

  getPortfolioItemObj() {
    const token = "Token " + store.get('token');
    return axios.get('api/users/portfolio', {
      headers: {Authorization: token}
    })
    .then((response) => {
      var portfolio = response.data.portfolio;
      
      this.setState({
        portfolio: portfolio,
      });
    })
    .catch(function (error) {
      // handle error
      console.log("error")
      console.log(error)
    });
  
  }

  getAllPlayers() {
    return fetch('http://127.0.0.1:5000/players')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          objs: responseJson
        })
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  
}

export default HomeScreen;