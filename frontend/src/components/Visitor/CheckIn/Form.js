import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Input from '../../Input/TextInputBox';
import JumboRaisedButton from '../../Buttons/JumboRaisedButton';
import FontIcon from 'material-ui/FontIcon';
import colors from '../../../colors';
import { validatePhoneNumber } from '../../../utils/Validation';
import * as VisitorApi from '../../../api/Visitors';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';

const Form = ({
  isPhoneNumberError,
  phoneNumberError,
  displayPhoneNumberError,
  phoneNumberOk,
  isFirstnameError,
  firstnameError,
  displayFirstnameError,
  firstnameOk,
  isLastnameError,
  lastnameError,
  displayLastnameError,
  lastnameOk,
  companyId,
  checkInVisitor,
}) => {

    let firstname = '';
    let lastname = '';
    let phoneNumber = '';
    let additionalInfo = [];

    return (
      <div className="formContainer">
        <Paper className="formCard">
          <Input
            type="name"
            placeholder="First name"
            containerClassName="inputContainer"
            isError={isFirstnameError}
            errorMessage={firstnameError}
            inputRef={(node) => {
              if (!node) return;
              firstname = node.value;
            }}
            onChange={(event) => {
              firstname = event.target.value;
            }}
          />
          <Input
            type="name"
            placeholder="Last name"
            containerClassName="inputContainer"
            isError={isLastnameError}
            errorMessage={lastnameError}
            inputRef={(node) => {
              if (!node) return;
              lastname = node.value;
            }}
            onChange={(event) => {
              lastname = event.target.value;
            }}
          />
          <Input
            type="phone"
            placeholder="Phone number"
            containerClassName="inputContainer"
            isError={isPhoneNumberError}
            errorMessage={phoneNumberError}
            inputRef={(node) => {
              if (!node) return;
              phoneNumber = node.value;
            }}
            onChange={(event) => {
              phoneNumber = event.target.value;
            }}
          />
          <JumboRaisedButton
            fullWidth
            label="Check In"
            backgroundColor={colors.bright}
            labelColor={'#FFFFFF'}
            icon={<FontIcon className="fa fa-check icon"/>}
            onTouchTap={ async () => {

              let hasError = false;

              if (!firstname || firstname.trim().length === 0) {
                hasError = true;
                displayFirstnameError('First name required');
              }
              else {
                firstnameOk();
              }

              if (!lastname || lastname.trim().length === 0) {
                hasError = true;
                displayLastnameError('Last name required');
              }
              else {
                lastnameOk();
              }

              if (!validatePhoneNumber(phoneNumber)) {
                hasError = true;
                displayPhoneNumberError('Phone number required');
              }
              else {
                phoneNumberOk();
              }


              if (hasError) return;


              try {
                let date = new Date()
                const payload = await VisitorApi.create(
                  companyId,
                  firstname,
                  lastname,
                  phoneNumber,
                  date,
                  additionalInfo
                );

                if (payload.error) {
                  toastr.error(
                    'Error checking in',
                    'Having trouble checking in'
                  );
                  return;
                }
                toastr.success('Check in success');

                checkInVisitor(companyId, firstname, lastname, phoneNumber, moment(date).format('MMM Do YYYY h:mm a'), additionalInfo)
                /*
                checkInVisitor(
                  payload['_id'],
                  payload['name'],
                  payload['email'],
                  payload['phone_number'],
                  payload['paid_time'],
                ); */
                firstnameOk();
                lastnameOk();
                phoneNumberOk();
              } catch (e) {
                console.error('Check in error', e);
                toastr.error('Server error', 'Please try again later');
              }

            } }/>
        </Paper>
      </div>
    );
}

export default Form
