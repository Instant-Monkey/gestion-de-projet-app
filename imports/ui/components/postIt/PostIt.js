import {Meteor} from 'meteor/meteor';
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';


//Components
import HashTag from './HashTag.js';
import PostItHeader from './PostItHeader.js';
import PostItTasksList from './PostItTasksList.js';
import PostItNotes from './PostItNotes.js';

//Api
import { HashTags } from '../../../api/hashTags.js';
import { Tasks } from '../../../api/tasks.js';


//Material
import {Card, CardText} from 'material-ui/Card';
import {yellow100} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';



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

  deleteThisHashtag() {
    Meteor.call('hashTags.remove', this.props.hashTag._id);
  }

  changePostItMode() {
    Meteor.call('PostIts.changeMode', this.props.postIt._id, this.props.postIt.taskDisplayer);
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

  renderChips(){
    return this.props.hashTags.map((hashTag) => (
      <HashTag
        hashTag={hashTag}
        key={hashTag._id}
        deleteHashTag={this.deleteThisHashtag}
      />
    ));
  }

  renderPostItBody() {
    if (this.props.postIt.taskDisplayer) {
      return <PostItTasksList tasks={this.props.tasks} postIt={this.props.postIt}/>;
    } else {
      return <PostItNotes postIt={this.props.postIt} /> ;
    }
  }

  render() {
    return(
      <div className=" post-it-container col s12 m6 l4 xl3 ">
        <Card style={postItStyle}>
          <PostItHeader postIt={this.props.postIt} deletePostIt={this.props.deletePostIt} changePostItMode={this.changePostItMode} />

          <CardText>
            {this.renderPostItBody()}
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
