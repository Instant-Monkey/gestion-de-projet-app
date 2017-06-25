import {Meteor} from 'meteor/meteor';
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import {List} from 'material-ui/List';

//Components
import Task from './Task.js';

//Api
import { HashTags } from '../../api/hashTags.js';
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

  handleHashTagSubmit(event) {
    event.preventDefault();
    const hashTag = this.hashTagInput.getValue().trim();
    Meteor.call('hashTags.insert', hashTag, this.props.postIt._id);

    this.hashTagInput.input.value = '';
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
          <form className="new-hashTag" onSubmit={this.handleHashTagSubmit.bind(this)} >
            <TextField
              hintText="nouveau hashtag"
              floatingLabelText="Entrez une nouvelle tâche "
              type="text"
              ref={node => this.hashTagInput = node}
              style={textFieldStyle}
            />
         </form>
        </Card>
      </div>

    );
  }

}

PostIt.propTypes = {
  tasks: PropTypes.array.isRequired,
  task: PropTypes.object,
  postIt: PropTypes.object,
  hashTags: PropTypes.array
};

export default createContainer((props) => {
  const currentPostIt = props.postIt._id;
  Meteor.subscribe('tasks');
  Meteor.subscribe('hashTags');

  return {
    tasks: Tasks.find({ postIt_id: currentPostIt, archived: false}, {sort: {createdAt: -1}}).fetch(),
    hashTags: HashTags.find({ postIt_id: currentPostIt}, {sort: {createdAt: 1}}).fetch()
  };
}, PostIt);
