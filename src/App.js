import React, { Component } from 'react'
import Plot from './Plot'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ビット売買</h1>
        </header>
        <div className="Container">
          <Plot />
        </div>
      </div>
    )
  }
}

export default App
