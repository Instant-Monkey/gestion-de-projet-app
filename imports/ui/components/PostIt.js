import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

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
    Tasks.insert({
      text,
      postIt_id: this.props.postIt._id,
      createdAt: new Date()
    });
    this.taskInput.input.value = '';
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  renderTasks(){
    return this.props.tasks.map((task) => (
      <Task
        task={task}
        key={task._id}
        deleteTask={this.deleteThisTask}
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
          <cardText>
            <ul>
              {this.renderTasks()}
            </ul>
          </cardText>

          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <TextField
              hintText="Faire les courses, faire caca..."
              floatingLabelText="Entrez une nouvelle tâche "
              type="text"
              ref={node => this.taskInput = node}
              style={textFieldStyle}
            />
            <RaisedButton
              label="Add Task"
              primary={true}
              style={buttonStyle}
              type="submit"
             />
         </form>
        </Card>
      </div>

    );
  }

}

PostIt.propTypes = {
  tasks: PropTypes.array.isRequired,
  postIt: PropTypes.object,
};

export default createContainer((props) => {
  const currentPostIt = props.postIt._id;

  return {
    tasks: Tasks.find({ postIt_id: currentPostIt}).fetch(),
  };
}, PostIt);
