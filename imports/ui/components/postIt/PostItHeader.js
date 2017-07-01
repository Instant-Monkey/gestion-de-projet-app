import React, { Component} from 'react';
import PropTypes from 'prop-types';

//Material
import {CardHeader} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default class PostItHeader extends Component {
  render() {
    return (
      <div className="postIt-header row ">
        <CardHeader
          title={this.props.postIt.title}
          actAsExpander={false}
          showExpandableButton={false}
          className="col s10"
        />
        <IconMenu
           iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
           anchorOrigin={{horizontal: 'right', vertical: 'top'}}
           targetOrigin={{horizontal: 'right', vertical: 'top'}}
           className="col s2"
         >
           <MenuItem primaryText="Refresh" />
           <MenuItem primaryText="Send feedback" />
           <MenuItem primaryText="Settings" />
           <MenuItem primaryText="Help" />
           <MenuItem primaryText="Supprimer le postIt" onClick={this.props.deletePostIt.bind(this)}/>
         </IconMenu>
      </div>

    );
  }
}

PostItHeader.propTypes = {
  postIt: PropTypes.object,
  deletePostIt: PropTypes.func

};
