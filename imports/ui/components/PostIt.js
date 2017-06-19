import React, { Component} from "react";
import Paper from 'material-ui/Paper'
import {yellow100} from 'material-ui/styles/colors';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: yellow100
};

export default class PostIt extends Component {
  render() { 
    return(
      <div className="post-it-container">
        <Paper style={style} zDepth={2}/>
      </div>
    )
  }

}
