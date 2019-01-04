import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { dummy } from './dummy';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleNextPrev = this.handleNextPrev.bind(this);

    this.state = {
      search: '',
      chunk: 0
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleNextPrev(e) {
    const { name: action } = e.target;
    let { chunk } = this.state;
    if ((action === 'prev' && !chunk) || (action === 'next' && chunk + 1 === _.chunk(dummy, 10).length)) {
      return
    }

    if (action === 'prev') {
      chunk--
    } else {
      chunk++
    }

    this.setState({
      chunk: action === 'prev' ? chunk-- : chunk++
    })
  }

  renderTableRows() {
    let filteredArray = dummy;

    if (this.state.search.trim()) {
      filteredArray = dummy.filter(person => {
        return person.name.toLowerCase().includes(this.state.search.trim().toLowerCase())
      })
    }

    const paginatedArray = _.chunk(filteredArray, 10);

    return paginatedArray[this.state.chunk].map((person, idx) => {
      const { name, age, married } = person;
      return (
        <tr key={idx}>
          <td>{name}</td>
          <td>{age}</td>
          <td>{married ? 'is married' : 'single'}</td>
        </tr>
      )
    });
  }

  render() {
    return (
      <div className="App">
        <input
          name="search"
          type="text"
          onChange={this.handleChange}
          value={this.state.search}
        />
        <button
          name="prev"
          onClick={this.handleNextPrev}
        >
          Prev
        </button>
        <button
          name="next"
          onClick={this.handleNextPrev}
        >
          Next
        </button>
        <table>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Is Married?</th>
          </tr>
          {this.renderTableRows()}
        </table>
      </div>
    );
  }
}

export default App;
