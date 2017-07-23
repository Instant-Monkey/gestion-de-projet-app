import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6


//Material-ui
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionLabel from 'material-ui/svg-icons/action/label';
import ActionSettingsBackupRestore from 'material-ui/svg-icons/action/settings-backup-restore.js';

const styleClicked = {
  backgroundColor: 'rgba(0,0,0,0.1)'
};

export default class HashTagsList extends Component {

  handleHashTagClick() {
    this.updateActiveHashTags(this._id);
  }

  isHashTagActive = (id) => {
    return this.props.activeHashTags.indexOf(id) != -1 ?  true : false ;
  }

  renderHashTags(){
    return this.props.hashTags.map((hashTag) => (
      <ListItem
        key={hashTag._id}
        _id={hashTag._id}
        value={hashTag.hashTag}
        primaryText={hashTag.hashTag}
        onClick={this.handleHashTagClick}
        updateActiveHashTags={this.props.updateActiveHashTags}
        activeHashTags={this.props.activeHashTags}
        style={ this.isHashTagActive(hashTag._id) ? styleClicked : {}}
        leftAvatar={
          <ActionLabel
            className="label-hash-tag"
            hoverColor="#000"
            style="margin-top:5px"
          />
        }
      />
    ));

  }

  render() {
    return(
        <div className=" col s12 m4 l2">
          <List defaultValue={4}>
            <Subheader> My HashTags </Subheader>
              <ListItem
                value="0"
                primaryText="reset Hash Tags"
                onClick={this.props.resetHashTags}
                leftAvatar={
                  <ActionSettingsBackupRestore
                    className="reset-hash-tags"
                  />
                }
              >
              </ListItem>
              {this.renderHashTags()}
          </List>
        </div>
    );
  }
}

HashTagsList.propTypes = {
  hashTags: PropTypes.array.isRequired,
  updateActiveHashTags: PropTypes.func,
  resetHashTags: PropTypes.func,
  activeHashTags: PropTypes.array
};
