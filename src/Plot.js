import React, { Component } from 'react'
import {
  VictoryChart,
  VictoryArea,
  VictoryGroup,
  VictoryZoomContainer,
  VictoryScatter
} from 'victory'
import Websocket from 'react-websocket'

export default class Plot extends Component {
  constructor(props) {
    super(props)
    this.domain = this.domain.bind(this)
    this.state = {
      data: []
    }
  }

  render() {
    return (
      <VictoryChart
        className="Plot"
        domain={this.domain()}
        domainPadding={{ top: 0, left: 0, bottom: 0, right: 0 }}
        padding={{ top: 10, left: 30, bottom: 0, right: 0 }}
        containerComponent={<VictoryZoomContainer zoomDimension="x" />}
      >
        <VictoryGroup>
          <VictoryArea
            style={{ data: { fill: '#c43a31' } }}
            data={this.state.data}
          />
          <Websocket
            url="ws://127.0.0.1:8080"
            onMessage={data => {
              const json = JSON.parse(data)
              const samples = json.map(x => ({
                x: new Date(x.date),
                y: x.price
              }))
              this.setState(prevState => ({
                data: [...samples, ...prevState.data]
              }))
            }}
          />
        </VictoryGroup>
      </VictoryChart>
    )
  }

  domain() {
    if (this.state.data.length < 2) {
      return { x: [0, 100], y: [0, 100] }
    } else {
      const prices = this.state.data.map(data => data.y)
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)
      return { y: [minPrice, maxPrice] }
    }
  }
}
