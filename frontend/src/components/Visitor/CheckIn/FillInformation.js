import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import Form from './Form';

class FillInformation extends Component {
  render() {
    const {
      clickBack,
    } = this.props;

    return (
      <div className="fullscreen">
        <div
          className="backContainer"
          onTouchTap={() => clickBack()}
        >
          <FontIcon className="material-icons back">
            keyboard_backspace
          </FontIcon>
          <p>Back</p>
        </div>
        <Form {...this.props}/>
      </div>
    );
  }
}

export default FillInformation
