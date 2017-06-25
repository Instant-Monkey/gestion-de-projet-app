import {Meteor} from 'meteor/meteor';
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import {List} from 'material-ui/List';

import Task from './Task.js';
//Api
import { Tasks } from '../../api/tasks.js';

//Material
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {yellow100} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const postItStyle = {
  backgroundColor: yellow100,
  height: '100%'
};


const buttonStyle = {
  display: 'block',
  margin: '5% 10%'
};

const textFieldStyle = {
  display: 'block',
  margin: 'auto'
};

class PostIt extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const text = this.taskInput.getValue().trim();

    Meteor.call('tasks.insert', text, this.props.postIt._id);

    this.taskInput.input.value = '';
  }

  archiveThisTask() {
    Meteor.call('tasks.archive', this.props.task._id);
  }

  renderTasks(){
    return this.props.tasks.map((task) => (
      <Task
        task={task}
        key={task._id}
        archiveTask={this.archiveThisTask}

      />
    ));

  }

  render() {
    return(
      <div className=" post-it-container col s12 m4 l3 ">
        <Card style={postItStyle}>
          <CardHeader
            title={this.props.postIt.title}
            actAsExpander={false}
            showExpandableButton={false}
          />
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <TextField
              hintText="Appuyez sur entrée pour valider"
              floatingLabelText="Entrez une nouvelle tâche "
              type="text"
              ref={node => this.taskInput = node}
              style={textFieldStyle}
            />
         </form>
          <cardText>
            <List>
              {this.renderTasks()}
            </List>
          </cardText>
        </Card>
      </div>

    );
  }

}

PostIt.propTypes = {
  tasks: PropTypes.array.isRequired,
  task: PropTypes.object,
  postIt: PropTypes.object,
};

export default createContainer((props) => {
  const currentPostIt = props.postIt._id;
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({ postIt_id: currentPostIt, archived: false}, {sort: {createdAt: -1}}).fetch(),
  };
}, PostIt);
