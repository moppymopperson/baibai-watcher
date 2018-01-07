import React, { Component } from 'react'
import {
  VictoryChart,
  VictoryArea,
  VictoryGroup,
  VictoryZoomContainer,
  VictoryScatter,
  VictoryTooltip
} from 'victory'
import Websocket from 'react-websocket'

export default class Plot extends Component {
  constructor(props) {
    super(props)
    this.domain = this.domain.bind(this)
    this.state = {
      prices: [],
      trades: []
    }
  }

  render() {
    return (
      <VictoryChart
        className="Plot"
        width={700}
        height={400}
        domain={this.domain()}
        domainPadding={{ top: 0, left: 0, bottom: 0, right: 0 }}
        padding={{ top: 10, left: 30, bottom: 0, right: 0 }}
        containerComponent={<VictoryZoomContainer zoomDimension="x" />}
      >
        <VictoryGroup>
          <VictoryArea
            style={{ data: { fill: '#9b59b6' } }}
            data={this.state.prices}
          />
          {this.scatterPlot()}
          <Websocket
            url="ws://localhost:8080"
            onMessage={data => this.handleData(data)}
          />
        </VictoryGroup>
      </VictoryChart>
    )
  }

  scatterPlot() {
    if (this.state.trades.length === 0) {
      return null
    }
    return (
      <VictoryScatter
        style={{
          data: { fill: d => (d.type === 'buy' ? '#1abc9c' : '#e74c3c') }
        }}
        labelComponent={<VictoryTooltip />}
        data={this.state.trades}
      />
    )
  }

  domain() {
    if (this.state.prices.length < 2) {
      return { x: [0, 100], y: [0, 100] }
    } else {
      const prices = this.state.prices.map(price => price.y)
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)
      return { y: [minPrice, maxPrice] }
    }
  }

  handleData(data) {
    console.log('received new data' + data)
    const json = JSON.parse(data)
    if (json.prices) {
      const samples = json.prices.map(x => ({
        x: new Date(x.date),
        y: x.price
      }))
      this.setState(prevState => ({
        prices: [...samples, ...prevState.prices]
      }))
    }

    if (json.trades) {
      const samples = json.trades.map(trade => ({
        x: new Date(trade.date),
        y: trade.price,
        symbol: trade.type === 'buy' ? 'triangleUp' : 'triangleDown',
        size: 20,
        type: trade.type,
        label: `${trade.shares} shares @ ${trade.price}`
      }))
      this.setState(prevState => ({
        trades: [...samples, ...prevState.trades]
      }))
    }
  }
}
