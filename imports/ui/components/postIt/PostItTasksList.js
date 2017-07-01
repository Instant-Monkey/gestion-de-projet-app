import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';

//Components
import Task from './Task.js';

//Material
import {List} from 'material-ui/List';
import TextField from 'material-ui/TextField';

const textFieldStyle = {
  display: 'block',
  margin: 'auto'
};

export default class PostItTasksList extends Component {

  archiveThisTask() {
    Meteor.call('tasks.archive', this.props.task._id);
  }

  handleTaskSubmit(event) {
    event.preventDefault();
    const text = this.taskInput.getValue().trim();

    Meteor.call('tasks.insert', text, this.props.postIt._id);

    this.taskInput.input.value = '';
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
    return (
      <div className='postIt-tasks-list'>
        <form className="new-task" onSubmit={this.handleTaskSubmit.bind(this)} >
          <TextField
            hintText="Appuyez sur entrée pour valider"
            floatingLabelText="Entrez une nouvelle tâche "
            type="text"
            ref={node => this.taskInput = node}
            style={textFieldStyle}
          />
       </form>
        <List>
          {this.renderTasks()}
        </List>
      </div>



    );
  }
}

PostItTasksList.propTypes = {
  tasks: PropTypes.array,
  task: PropTypes.object,
  postIt: PropTypes.object

};
