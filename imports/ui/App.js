import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import PostIt from './components/PostIt.js';
import Header from './layouts/Header.js';

export default class App extends Component {

  getPostIts(){
    return [
      {_id: 1, title: 'Postit number 1', text: 'text of postit 1'},
      {_id: 2, title: 'Postit number 2', text: 'text of postit 2'},
      {_id: 3, title: 'Postit number 3', text: 'text of postit 3'},
      {_id: 4, title: 'Postit number 4', text: 'text of postit 4'},
      {_id: 5, title: 'Postit number 5', text: 'text of postit 5'},
      {_id: 6, title: 'Postit number 6', text: 'text of postit 6'}
    ]
  }

  renderPostIts(){
    return this.getPostIts().map((postIt) => (
      <PostIt key={postIt._id} title={postIt.title} text={postIt.text} />
    ));

  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="app-container">
          <Header />
          <div className="row">
              {this.renderPostIts()}
          </div>

        </div>
    </MuiThemeProvider>

  )
  }

}
