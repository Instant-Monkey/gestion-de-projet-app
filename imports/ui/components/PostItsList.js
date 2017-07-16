import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6

//Components
import PostIt from './postIt/PostIt.js';

//Material-ui
import TextField from 'material-ui/TextField';

export default class PostItsList extends Component {

  renderPostIts(postIts){
    return postIts.map((postIt) => (
    <PostIt key={postIt._id} postIt={postIt} deletePostIt={this.deleteThisPostIt} />
      ));
  }

  filterPostIts(){
    if (this.props.activeHashTags.length > 0) {
      let filteredPostIts = [];
      this.props.postIts.map((postIt) => (
          this.props.activeHashTags.map((hashTag) => {
            if (postIt.hashTags.indexOf(hashTag) != -1 ) {
              if(filteredPostIts.indexOf(postIt) == -1 ) {
                filteredPostIts.push(postIt);
              }

            }

          })

        ));

      return filteredPostIts;

    } else {
      return this.props.postIts;
    }


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
      <div className="post-it-list-container col s12 m8 l10">
        <form className="new-task" onSubmit={this.handlePostItSubmit.bind(this)} >
          <TextField
            hintText="Appuyez sur entrée pour valider"
            floatingLabelText="Entrez un nouveau postIt "
            type="text"
            ref={node => this.postItInput = node}
          />
       </form>
        <div className="row">
            {this.renderPostIts(this.filterPostIts())}
        </div>
      </div>
    );
  }
}

PostItsList.propTypes = {
  postIts: PropTypes.array.isRequired,
  postIt: PropTypes.object,
  activeHashTags: PropTypes.array
};
