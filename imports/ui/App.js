import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './layouts/Header.js';
import Dashboard from './components/Dashboard.js';

export default class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className="app-container">
          <Header />
          <Dashboard /> 
        </div>
    </MuiThemeProvider>

    );
  }

}
