import React from 'react';

export class Player extends React.Component {
  render() {
    return (
      <div>
        {this.props.name}
      </div>
    );
  }
  
}
