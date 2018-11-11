import React, { Component } from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

class CollapsableCheckbox extends Component {
  state = {
    opened: false,
    checked: []
  };

  componentDidMount() {
    if (this.props.initialState) {
      this.setState({
        opened: this.props.initialState
      });
    }
  }

  handleClick = () => {
    this.setState({
      opened: !this.state.opened
    });
  };

  handleAngleView = () => {
    return this.state.opened ? (
      <FontAwesomeIcon icon={faAngleUp} className="icon" />
    ) : (
      <FontAwesomeIcon icon={faAngleDown} className="icon" />
    );
  };

  toogleCheck = item => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(item);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState(
      {
        checked: newChecked
      },
      () => this.props.handleFilters(newChecked)
    );
  };

  renderList = () =>
    this.props.list
      ? this.props.list.map(item => (
          <ListItem key={item._id} style={{ padding: '10px 0' }}>
            <ListItemText>{item.name}</ListItemText>

            <ListItemSecondaryAction>
              <Checkbox
                onChange={e => this.toogleCheck(item._id)}
                checked={this.state.checked.indexOf(item._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  render() {
    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: '10px 23px 0px 0' }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleAngleView()}
          </ListItem>
          <Collapse in={this.state.opened} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapsableCheckbox;
