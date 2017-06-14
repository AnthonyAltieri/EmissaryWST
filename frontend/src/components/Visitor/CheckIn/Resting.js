import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import DateTime from './DateTime';
import CheckInButton from './CheckInButton';

const Resting = ({
  goToWelcome,
  clickCheckIn,
}) => {
  return (
    <div className="fullscreen relative c around">
      <FontIcon
        className="material-icons exit"
        onTouchTap={() => goToWelcome()}
      >
        clear
      </FontIcon>
      <div className="r center">
        <div className="glass">
          <h1>Altieri Consulting</h1>
        </div>
      </div>
      <div className="r center">
        <DateTime />
      </div>
      <div className="r center">
        <CheckInButton
          onClick={clickCheckIn}
        />
      </div>
    </div>
  );
}

export default Resting