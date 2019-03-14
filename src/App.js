import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pane from './Pane';
import CurrentWidget from './CurrentWidget/CurrentWidget';
import {Provider} from 'react-redux';
import store from './store';

const widgetStructure = [
    <CurrentWidget/>,
    [<CurrentWidget/>, <CurrentWidget/>],
    <CurrentWidget/>,
];

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
            <Pane children={widgetStructure} direction='horizontal'/>
        </div>
      </Provider>
    );
  }
}

export default App;
