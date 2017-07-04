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
import ActionSettingsBackupRestore from 'material-ui/svg-icons/action/settings-backup-restore.js';

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
      if (index != '0') {
        this.setState({
          selectedIndex: index,
        });
      } else {
        this.setState({
          selectedIndex: 0
        });
      }

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

  handleHashTagClick() {
    this.getActiveHashTags(this.id);
  }

  renderHashTags(){
    return this.props.hashTags.map((hashTag) => (
      <ListItem
        key={hashTag._id}
        id={hashTag._id}
        value={hashTag.hashTag}
        primaryText={hashTag.hashTag}
        onClick={this.handleHashTagClick}
        getActiveHashTags={this.props.getActiveHashTags}
        leftAvatar={
          <ActionLabel
            className="label-hash-tag"
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
          <SelectableList defaultValue={0}>
            <Subheader> My HashTags </Subheader>
              <ListItem
                value="0"
                primaryText="reset Hash Tags"
                leftAvatar={
                  <ActionSettingsBackupRestore
                    className="reset-hash-tags"
                  />
                }
              >
              </ListItem>
              {this.renderHashTags()}
          </SelectableList>
        </div>
    );
  }
}

HashTagsList.propTypes = {
  hashTags: PropTypes.array.isRequired,
  hashTag: PropTypes.object,
  getActiveHashTags: PropTypes.func
};

export default createContainer((params) => {

  Meteor.subscribe('hashTags');

  return {
    hashTags: HashTags.find({}).fetch(),
    getActiveHashTags: params.getActiveHashTags
  };
}, HashTagsList);
