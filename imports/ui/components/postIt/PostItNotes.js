import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';


import TextField from 'material-ui/TextField';

const textFieldStyle = {
  display: 'block',
  margin: 'auto'
};

export default class PostItNotes extends Component {


  UpdateNotes(event) {
    event.preventDefault();
    const text = this.taskInput.getValue().trim();

    Meteor.call('tasks.insert', text, this.props.postIt._id);

    this.taskInput.input.value = '';
  }


  render() {
    return (
      <div className='postIt-tasks-list'>
        <p>{this.props.postIt.freeText}</p>
      </div>



    );
  }
}

PostItNotes.propTypes = {
  postIt: PropTypes.object

};
