import React from 'react';
import { Player } from './Player';
const axios = require('axios');
const store = require('store');


class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      portfolio: []
    }
    this.getPortfolioItemObj();
  }
 
  render() {
    return (
        <div>
          {this.state.portfolio && 
          this.state.portfolio.map(function(item) {
            return <Player key={item._id} ticker={item.ticker} price={/*item.prettyPrice*/ item.purchasePrice}>{item.ticker}</Player>
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
      console.log(response.data.portfolio)
      // alert(response.data.user.email)
      this.setState({
        portfolio: response.data.portfolio,
      })
    })
    .catch(function (error) {
      // handle error
      console.log("error")
      console.log(error)
    });
    
    // return fetch('http://127.0.0.1:5000/players')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this.setState({
    //       objs: responseJson
    //     })
    //     return responseJson;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }
}

export default HomeScreen;