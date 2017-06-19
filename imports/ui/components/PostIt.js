import React, { Component} from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
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
      <Card className="post-it-container" className="col s12 m7 l3">
        <CardHeader
          title={this.props.title}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <cartText>
          {this.props.text}
        </cartText>
      </Card>
    )
  }

}
