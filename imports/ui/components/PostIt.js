import {Meteor} from 'meteor/meteor';
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';


//Components
import Task from './postIt/Task.js';
import HashTag from './postIt/HashTag.js';
import PostItHeader from './postIt/PostItHeader.js';

//Api
import { HashTags } from '../../api/hashTags.js';
import { Tasks } from '../../api/tasks.js';


//Material
import {Card, CardText} from 'material-ui/Card';
import {yellow100} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';



const postItStyle = {
  backgroundColor: yellow100,
  height: '100%',
  marginBottom: '20px'
};


const buttonStyle = {
  display: 'block',
  margin: '5% 10%'
};

const textFieldStyle = {
  display: 'block',
  margin: 'auto'
};

const hashTagWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap'
};

class PostIt extends Component {
  handleTaskSubmit(event) {
    event.preventDefault();
    const text = this.taskInput.getValue().trim();

    Meteor.call('tasks.insert', text, this.props.postIt._id);

    this.taskInput.input.value = '';
  }

  archiveThisTask() {
    Meteor.call('tasks.archive', this.props.task._id);
  }

  deleteThisHashtag() {
    Meteor.call('hashTags.remove', this.props.hashTag._id);
  }

  handleHashTagSubmit(event) {
    event.preventDefault();
    let hashTag = this.hashTagInput.getValue().trim();

    if (hashTag.charAt(0) != '#') {
      hashTag = '#' + hashTag;
    }

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

  renderChips(){
    return this.props.hashTags.map((hashTag) => (
      <HashTag
        hashTag={hashTag}
        key={hashTag._id}
        deleteHashTag={this.deleteThisHashtag}
      />
    ));
  }

  render() {
    return(
      <div className=" post-it-container col s12 m4 l3 ">
        <Card style={postItStyle}>
          <PostItHeader postIt={this.props.postIt} deletePostIt={this.props.deletePostIt} />
          <form className="new-task" onSubmit={this.handleTaskSubmit.bind(this)} >
            <TextField
              hintText="Appuyez sur entrée pour valider"
              floatingLabelText="Entrez une nouvelle tâche "
              type="text"
              ref={node => this.taskInput = node}
              style={textFieldStyle}
            />
         </form>

          <CardText>
            <List>
              {this.renderTasks()}
            </List>
          </CardText>
          <Divider />
          <form className="new-hashTag" onSubmit={this.handleHashTagSubmit.bind(this)} >
            <TextField
              hintText="pas besoin de #"
              floatingLabelText="nouveau #hashtag "
              type="text"
              ref={node => this.hashTagInput = node}
              style={textFieldStyle}
            />
         </form>
         <div className="hashTags-wrapper" style={hashTagWrapperStyle}>
           {this.renderChips()}
         </div>

        </Card>
      </div>

    );
  }

}

PostIt.propTypes = {
  tasks: PropTypes.array.isRequired,
  task: PropTypes.object,
  postIt: PropTypes.object,
  hashTags: PropTypes.array,
  hashTag: PropTypes.object,
  deletePostIt: PropTypes.func
};

export default createContainer((props) => {
  const currentPostIt = props.postIt._id;
  Meteor.subscribe('tasks');
  Meteor.subscribe('hashTags');

  return {
    tasks: Tasks.find({ postIt_id: currentPostIt, archived: false}, {sort: {createdAt: -1}}).fetch(),
    hashTags: HashTags.find({ postIt_ids: currentPostIt}, {sort: {createdAt: 1}}).fetch()
  };
}, PostIt);
