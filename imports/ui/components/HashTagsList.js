import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { createContainer } from 'meteor/react-meteor-data';

//api
import {HashTags} from '../../api/hashTags.js';

//Material-ui
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionLabel from 'material-ui/svg-icons/action/label';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

class HashTagsList extends Component {

  renderHashTags(){
    return this.props.hashTags.map((hashTag) => (
      <ListItem
        key={hashTag._id}
        value={hashTag.hashTag}
        primaryText={hashTag.hashTag}
        leftAvatar={
          <ActionLabel
            className="delete-task"
            hoverColor="#000"
            style="margin-top:5px"
          />
        }
      />
    ));

  }7

  render() {
    return(
        <div className=" col s12 m4 l2">
          <SelectableList defaultValue={3}>
            <Subheader> My HashTags </Subheader>
              {this.renderHashTags()}
          </SelectableList>
        </div>
    );
  }
}

HashTagsList.propTypes = {
  hashTags: PropTypes.array.isRequired,
  hashTag: PropTypes.object
};

export default createContainer(() => {

  Meteor.subscribe('hashTags');

  return {
    hashTags: HashTags.find({}).fetch(),
  };
}, HashTagsList);
