import React from 'react';
import { Player } from './Player';

class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
    this.getPortfolioItemObj();
  }
 
  render() {
    return (
        <div>
          {this.state.objs && 
          this.state.objs.map(function(item) {
            return <Player key={item._id} ticker={item.ticker} price={item.price}>{item.ticker}</Player>
          })}
        </div>
    )
  }

  getPortfolioItemObj() {
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