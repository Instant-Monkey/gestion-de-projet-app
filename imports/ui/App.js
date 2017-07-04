import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import PostItsList from './components/PostItsList.js';
import HashTagList from './components/HashTagsList.js';
import Header from './layouts/Header.js';

export default class App extends Component {

  getActiveHashTags() {
    if (this.value) {
      return this.value;
    }

  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="app-container">
          <Header />
          <div className="row">
            <HashTagList getActiveHashTags={this.getActiveHashTags}/>
            <PostItsList activeHashTags={this.getActiveHashTags()}/>
          </div>
        </div>
    </MuiThemeProvider>

    );
  }

}
