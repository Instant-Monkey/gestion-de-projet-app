import React, { Component} from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

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

const inputStyle = {
  width: '80%',
  margin: 'auto',
  display: 'block'

};

const buttonStyle = {
  display: 'block',
  margin: '5% 10%'
};

class PostIt extends Component {
  handleSubmit(event) { 
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.taskInput).value.trim();
    Tasks.insert({
      text,
      postIt_id: this.props._id,
      createdAt: new Date()
    });

    ReactDOM.findDOMNode(this.refs.taskInput).value = '';
  }

  renderTasks(){
    return this.props.tasks.map((task) => (
      <li key={task._id}>{task.text}</li>
    ));

  }

  render() { 
    return(
      <div className=" post-it-container col s12 m4 l3 ">
        <Card style={postItStyle}>
          <CardHeader
            title={this.props.title}
            actAsExpander={false}
            showExpandableButton={false}
          />
          <cardText>
            <ul>
              {this.renderTasks()}
            </ul>
          </cardText>
          <input
              type="text"
              ref="taskInput"
              placeholder="Type to add new tasks"
            />
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <RaisedButton
              label="Add Task"
              primary={true}
              style={buttonStyle}
              type="submit"
             />
         </form>
        </Card>
      </div>

    )
  }

}

PostIt.propTypes = {
  tasks: PropTypes.array.isRequired,
}

export default createContainer((props) => {
  const currentPostIt = props._id;

  return {
    tasks: Tasks.find({ postIt_id: currentPostIt}).fetch(), 
  };
}, PostIt)
