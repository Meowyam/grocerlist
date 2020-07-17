import React, { Component } from 'react'
import update from 'immutability-helper'
import axios from 'axios'

class GroceriesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groceries: [],
      inputValue: ''
    }
  }

  getGroceries() {
    axios.get('/api/v1/groceries')
      .then(response => {
        this.setState({groceries: response.data})
      })
      .catch(error => console.log(error))
  }

  createGrocery = (e) => {
    if (e.key === 'Enter') {
      axios.post('/api/v1/groceries', {grocery: {title: e.target.value}})
        .then(response => {
          const groceries = update(this.state.groceries, {
            $splice: [[0, 0, response.data]]
          })
          this.setState({
            groceries: groceries,
            inputValue: ''
          })
        })
        .catch(error => console.log(error))
    }
  }

  updateGrocery = (e, id) => {
    axios.put(`/api/v1/groceries/${id}`, {grocery: {done: e.target.checked}})
      .then(response => {
        const groceryIndex = this.state.groceries.findIndex(x => x.id === response.data.id)
        const groceries = update(this.state.groceries, {
          [groceryIndex]: {$set: response.data}
        })
        this.setState({
          groceries: groceries
        })
      })
      .catch(error => console.log(error))
  }

  deleteGrocery = (id) => {
    axios.delete(`/api/v1/groceries/${id}`)
      .then(response => {
        const groceryIndex = this.state.groceries.findIndex(x => x.id === id)
        const groceries = update(this.state.groceries, {
          $splice: [[groceryIndex, 1]]
        })
        this.setState({
          groceries: groceries
        })
      })
      .catch(error => console.log(error))
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value})
  }

  componentDidMount() {
    this.getGroceries()
  }

  render() {
    return(
      <div>
        <div className="inputContainer">
          <input className="groceryInput" type="text"
            placeholder="Add grocery" maxLength="50"
            onKeyPress={this.createGrocery}
            value={this.state.inputValue} onChange={this.handleChange} />
        </div>
        <div className="listWrapper">
          <ul className="groceryList">
            {this.state.groceries.map((grocery) => {
              return(
                <li className="grocery" grocery={grocery} key={grocery.id}>
                  <input className="groceryCheckbox" type="checkbox"
                   checked={grocery.done}
                   onChange={(e) => this.updateGrocery(e, grocery.id)} />
                  <label className="groceryLabel">{grocery.title}</label>
                  <span className="deleteGroceryBtn"
                   onClick={(e) => this.deleteGrocery(grocery.id)}>x</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

    )
  }
}

export default GroceriesContainer
