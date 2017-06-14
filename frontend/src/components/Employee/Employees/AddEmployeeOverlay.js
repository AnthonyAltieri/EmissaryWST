import React from 'react';
import Card from '../../Overlay/Card';
import Input from '../../Input/TextInputBox';
import JumboRaisedButton from '../../Buttons/JumboRaisedButton';
import colors from '../../../colors';

const AddEmployeeOverlay = ({
  isVisible,
  hideOverlay,
}) => {
  return (
    <Card
      isVisible={isVisible}
      hideOverlay={hideOverlay}
    >
      <Input
        placeholder="First name"
        type="name"
      />
      <br />
      <Input
        placeholder="Last name"
        type="name"
      />
      <br />
      <Input
        placeholder="Phone number"
        type="phonenumber"
      />
      <br />
      <Input
        placeholder="Email"
        type="email"
      />
      <br />
      <JumboRaisedButton
        label="Add"
        backgroundColor={colors.green}
        labelColor="#fff"
        onTouchTap={() => {
          // TODO: implement
        }}
      />
    </Card>
  );
}

export default AddEmployeeOverlay