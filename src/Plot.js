import React, { Component } from 'react'
import { VictoryChart, VictoryArea } from 'victory'
import Websocket from 'react-websocket'

export default class Plot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{ x: new Date(), y: 0 }]
    }
  }

  render() {
    return (
      <VictoryChart
        className="Plot"
        padding={{ top: 10, left: 30, bottom: 0, right: 0 }}
      >
        <VictoryArea
          style={{ data: { fill: '#c43a31' } }}
          data={this.state.data}
        />
        <Websocket
          url="ws://127.0.0.1:8080"
          onMessage={data => {
            const json = JSON.parse(data)
            const cost = json.price
            const date = new Date(json.date)
            const sample = { x: date, y: cost }
            this.setState(prevState => ({
              data: [...prevState.data, sample]
            }))
            console.log('New Data: ' + sample)
            console.log('Data length: ' + this.state.data.length)
          }}
        />
      </VictoryChart>
    )
  }
}
