import React from 'react'
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

export class PlayerChart extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {

    }

    this.data = [
      {x: 0, y: 8},
      {x: 1, y: 5},
      {x: 2, y: 4},
      {x: 3, y: 9},
      {x: 4, y: 1},
      {x: 5, y: 7},
      {x: 6, y: 6},
      {x: 7, y: 3},
      {x: 8, y: 2},
      {x: 9, y: 0}
    ];


  }

  componentDidMount() {
 
  }
 

  render() {
    return (
      <div>
        <XYPlot height={300} width= {300}>
          {/* <VerticalGridLines /> */}
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries data={this.data} />
        </XYPlot>
        {/* <XYPlot
          width={300}
          height={300}>
          <HorizontalGridLines />
          <LineSeries
            data={[
              {x: 1, y: 10},
              {x: 2, y: 5},
              {x: 3, y: 15}
            ]}/>
          <XAxis />
          <YAxis />
        </XYPlot> */}
      </div>
    )
  }
  
}
