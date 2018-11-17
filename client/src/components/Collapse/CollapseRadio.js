import React, { Component } from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';

class CollapseRadio extends Component {
  state = {
    value: '0',
    opened: false
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

  handleOnChange = e => {
    const { value } = e.target;
    this.setState(
      {
        value
      },
      () => this.props.handleFilters(value)
    );
  };

  renderList = () =>
    this.props.list
      ? this.props.list.map(item => (
          <FormControlLabel
            key={item._id}
            value={item._id}
            control={<Radio />}
            label={item.name}
          />
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
              <RadioGroup
                aria-label="prices"
                name="prices"
                value={this.state.value}
                onChange={e => this.handleOnChange(e)}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseRadio;
