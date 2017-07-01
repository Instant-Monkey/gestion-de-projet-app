import React, { Component} from 'react';
import PropTypes from 'prop-types';

//Material Ui
import Chip from 'material-ui/Chip';
import {ListItem} from 'material-ui/List';
import ContentArchive from 'material-ui/svg-icons/content/archive';

export default class HashTag extends Component {

  render() {
    return(
      <Chip
        onRequestDelete={this.props.deleteHashTag.bind(this)}
        key={this.props.hashTag._id}
      >
        {this.props.hashTag.hashTag}
      </Chip>
    );
  }
}

HashTag.propTypes = {
  hashTag: PropTypes.object,
  deleteHashTag: PropTypes.func,
};
