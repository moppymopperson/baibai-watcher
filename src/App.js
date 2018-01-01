import React, { Component } from 'react'
import Plot from './Plot'
import './App.css'

class App extends Component {
  componentWillMount() {
    this.updateDimensions()
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
    console.log(this.state)
  }

  render() {
    return (
      <div className="App">
        <div className="Container">
          <Plot width={this.state.width} height={this.state.height} />
        </div>
      </div>
    )
  }
}

export default App
