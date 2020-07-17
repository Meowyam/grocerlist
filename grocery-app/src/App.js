import React, { Component } from 'react'
import './App.css'
import GroceriesContainer from './components/GroceriesContainer'

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>Grocerise!</h1>
        </div>
        <GroceriesContainer />
      </div>
    )
  }
}

export default App;
