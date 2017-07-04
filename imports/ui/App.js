import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import PostItsList from './components/PostItsList.js';
import HashTagList from './components/HashTagsList.js';
import Header from './layouts/Header.js';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeHashTags: [],
    };
  }



  getActiveHashTags(value) {
    let newArray = this.state.activeHashTags;
    newArray.push(value);
    this.setState({
      activeHashTags: newArray
    });


  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="app-container">
          <Header />
          <div className="row">
            <HashTagList getActiveHashTags={this.getActiveHashTags.bind(this)}/>
            <PostItsList activeHashTags={this.state.activeHashTags}/>
          </div>
        </div>
    </MuiThemeProvider>

    );
  }

}
