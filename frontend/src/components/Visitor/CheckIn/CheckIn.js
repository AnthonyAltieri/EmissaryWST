import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Granim from 'granim'
import Resting from './Resting';
import FillInformation from './FillInformation';
import * as CredentialsActions from '../../../actions/Credentials';
import * as VisitorActions from '../../../actions/Visitor';


class CheckIn extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.leaveCheckIn();
  }


  render() {
    const {
      goToWelcome,
      clickCheckIn,
      clickBack,
      isFillingOutInformation,
      companyName,
    } = this.props;

    return (
      <div className="checkIn noOverflow">
        <canvas
          id="granim-canvas"
          ref={(node) => {
            const granimInstance = new Granim({
              element: '#granim-canvas',
              name: 'background',
              opacity: [1, 1],
              states: {
                'default-state': {
                  gradients: [
                   ['#1CD8D2', '#93EDC7']
                  ]
                }
              }
            })
          }}
        >
        </canvas>
        <div className="content">
          {isFillingOutInformation
            ? <FillInformation {...this.props} clickBack={clickBack} />
          : <Resting goToWelcome={goToWelcome} clickCheckIn={clickCheckIn} companyName={companyName}/>
          }
        </div>
      </div>
    );
  }
}

const stateToProps = (s) => ({
  isFillingOutInformation: s.visitor.isFillingOutInformation,
  companyName: s.company.name,
  isFirstnameError: !!s.credentials.firstnameError,
  firstnameError: s.credentials.firstnameError,
  isLastnameError: !!s.credentials.lastnameError,
  lastnameError: s.credentials.lastnameError,
  isPhoneNumberError: !!s.credentials.phoneNumberError,
  phoneNumberError: s.credentials.phoneNumberError,
  companyId: s.company.id,
});
const dispatchToProps = (d) => ({
  goToWelcome: () => d(push('/welcome')),
  leaveCheckIn: () => d(VisitorActions.leaveCheckIn()),
  clickCheckIn: () => d(VisitorActions.clickCheckIn()),
  clickBack: () => d(VisitorActions.clickBack()),
  displayFirstnameError : error => d(CredentialsActions.firstnameError(error)),
  displayLastnameError: error => d(CredentialsActions.lastnameError(error)),
  displayPhoneNumberError: error => d(CredentialsActions.phoneNumberError(error)),
  firstnameOk: () => d(CredentialsActions.firstnameOk()),
  lastnameOk: () => d(CredentialsActions.lastnameOk()),
  phoneNumberOk: () => d(CredentialsActions.phoneNumberOk()),
  checkInVisitor: (companyId, firstName, lastName, phoneNumber, checkinTime, additionalInfo) => d(
    VisitorActions.checkInVisitor(companyId, firstName, lastName, phoneNumber, checkinTime, additionalInfo)
  ),
});

CheckIn = connect(stateToProps, dispatchToProps)(CheckIn);

export default CheckIn
