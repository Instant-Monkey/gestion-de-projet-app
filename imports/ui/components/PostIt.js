import React, { Component} from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {yellow100} from 'material-ui/styles/colors';

const postItStyle = {
  backgroundColor: yellow100
};

export default class PostIt extends Component {
  render() { 
    return(
      <div className=" post-it-container col s12 m4 l3 xl2">
        <Card style={postItStyle}>
          <CardHeader
            title={this.props.title}
            actAsExpander={false}
            showExpandableButton={false}
          />
          <cardText>
            {this.props.text}
          </cardText>
        </Card>
      </div>

    )
  }

}
