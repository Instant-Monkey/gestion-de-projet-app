import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import PostItsList from './components/PostItsList.js';
import Header from './layouts/Header.js';

export default class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className="app-container">
          <Header />
          <PostItsList />
        </div>
    </MuiThemeProvider>

    );
  }

}
