import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { createContainer } from 'meteor/react-meteor-data';

//Api
import { PostIts } from '../../api/postIts.js';

//Components
import PostIt from './PostIt.js';

//Material-ui
import TextField from 'material-ui/TextField';

class PostItsList extends Component {

  renderPostIts(){
    return this.props.postIts.map((postIt) => (
      <PostIt key={postIt._id} postIt={postIt} deletePostIt={this.deleteThisPostIt} />
    ));

  }

  handlePostItSubmit(event){
    event.preventDefault();
    const text = this.postItInput.getValue().trim();

    Meteor.call('postIt.insert', text);

    this.postItInput.input.value = '';
  }

  deleteThisPostIt(){
    Meteor.call('postIts.remove', this.props.postIt._id);
  }


  render() {
    return(
      <div className="app-container">
        <form className="new-task" onSubmit={this.handlePostItSubmit.bind(this)} >
          <TextField
            hintText="Appuyez sur entrée pour valider"
            floatingLabelText="Entrez un nouveau postIt "
            type="text"
            ref={node => this.postItInput = node}
          />
       </form>
        <div className="row">
            {this.renderPostIts()}
        </div>
      </div>
    );
  }
}

PostItsList.propTypes = {
  postIts: PropTypes.array.isRequired,
  postIt: PropTypes.object
};

export default createContainer(() => {

  Meteor.subscribe('postIts');

  return {
    postIts: PostIts.find({}).fetch(),
  };
}, PostItsList);
