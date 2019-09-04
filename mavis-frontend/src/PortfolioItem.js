import React from 'react';

export class PortfolioItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      formattedPrice: "0"
    }

  }

  componentDidMount() {
    this.formatPrice();
  }

  formatPrice() {
    var formattedPrice = (this.props.price/10000).toFixed(2)
    this.setState({formattedPrice: formattedPrice})
  }
  render() {
    return (
      <div>
        {this.props.ticker} 
        -
        ${this.state.formattedPrice}
      </div>
    );
  }
  
}
