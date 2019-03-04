import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pane from './Pane';

const widgetStructure = [
    1,
    [2, 3],
    4,
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pane children={widgetStructure} direction='horizontal'/>
      </div>
    );
  }
}

export default App;
