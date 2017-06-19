import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';

import {deepOrange500} from 'material-ui/styles/colors';

const headerStyle = { 
  backgroundColor: deepOrange500
}

export default class Header extends Component {
  render() {
    return(
      <AppBar title="Gestion de projet" style={headerStyle}/>
    )

  }

}
