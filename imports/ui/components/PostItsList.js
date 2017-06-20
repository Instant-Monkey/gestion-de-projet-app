import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { createContainer } from 'meteor/react-meteor-data';

//Api
import { PostIts } from '../../api/postIts.js';

//Components
import PostIt from './PostIt.js';

class PostItsList extends Component {
  getPostIts(){
    return [
      {_id: 1, title: 'Postit number 1', text: 'text of postit 1'},
      {_id: 2, title: 'Postit number 2', text: 'text of postit 2'},
      {_id: 3, title: 'Postit number 3', text: 'text of postit 3'},
      {_id: 4, title: 'Postit number 4', text: 'text of postit 4'},
      {_id: 5, title: 'Postit number 5', text: 'text of postit 5'},
      {_id: 6, title: 'Postit number 6', text: 'text of postit 6'}
    ];
  }

  renderPostIts(){
    return this.props.postIts.map((postIt) => (
      <PostIt key={postIt._id} postIt={postIt} />
    ));

  }

  render() {
    return(
      <div className="row">
          {this.renderPostIts()}
      </div>
    );
  }
}

PostItsList.propTypes = {
  postIts: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    postIts: PostIts.find({}).fetch(),
  };
}, PostItsList);
