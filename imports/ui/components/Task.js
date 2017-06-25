import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {ListItem} from 'material-ui/List';
import ContentArchive from 'material-ui/svg-icons/content/archive';

export default class Task extends Component {

  render() {
    return(
      <ListItem
        key={this.props.task._id}
        className="task"
        primaryText={this.props.task.text}
        rightIcon={
          <ContentArchive
            className="delete-task"
            hoverColor="#000"
            onClick={this.props.archiveTask.bind(this)}
          />
        }

      />
    );
  }
}

Task.propTypes = {
  task: PropTypes.object,
  archiveTask: PropTypes.func,
  _id: PropTypes.string
};
