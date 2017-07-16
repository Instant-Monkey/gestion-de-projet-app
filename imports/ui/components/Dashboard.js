import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { HashTags } from '../../api/hashTags.js';
import { PostIts } from '../../api/postIts.js';

import HashTagList from './HashTagsList.js';
import PostItsList from './PostItsList.js';



class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeHashTags: [],
    };
  }

  updateActiveHashTags(value) {
    let newArray = this.state.activeHashTags;
    let indexValue = newArray.indexOf(value) ;
    if ( indexValue == -1 ) {
      newArray.push(value);
    } else {
      newArray.splice(indexValue, 1);
    }

    this.setState({
      activeHashTags: newArray
    });

  }

  render() {
    return (
      <div className="row dashboard-container">
        <HashTagList getActiveHashTags={this.updateActiveHashTags.bind(this)}  hashTags={this.props.hashTags}/>
        <PostItsList activeHashTags={this.state.activeHashTags} postIts={this.props.postIts}/>
      </div>
    );
  }

}

Dashboard.propTypes = {
  hashTags: PropTypes.array.isRequired,
  postIts: PropTypes.array.isRequired,
};

export default createContainer( () => {
  Meteor.subscribe('postIts');
  Meteor.subscribe('hashTags');
  return {
    postIts: PostIts.find({}).fetch(),
    hashTags: HashTags.find({}).fetch()
  };
}, Dashboard);
