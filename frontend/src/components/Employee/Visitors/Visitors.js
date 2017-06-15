/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import SectionHeader from '../SectionHeader';
import ResponsiveTable from '../ResponsiveTable';
import * as VisitorsApi from '../../../api/Visitors';
import * as VisitorActions from '../../../actions/Visitor';
import moment from 'moment';


function transformVisitorList(visitorList) {
  if (visitorList.length == 0)
    return visitorList;
  let visitorRows = visitorList.visitors.map( function (visitor) {
    let time = moment(visitor.checkin_time).format('MMM Do YYYY h:mm a')
    return {
      firstName: visitor.first_name,
      lastName: visitor.last_name,
      appointmentTime: time,
      checkInTime: time,
    }
  });

  return visitorRows;
}

const headers = [
  {
    display: 'First name',
    key: 'firstName'
  },
  {
    display: 'Last name',
    key: 'lastName'
  },
  {
    display: 'Appointment Time',
    key: 'appointmentTime'
  },
  {
    display: 'Check-In Time',
    key: 'checkInTime'
  },
]


class Visitors extends Component {
  async componentDidMount() {
    const { companyId, setVisitors } = this.props;
    console.log('componentDidMount()');
    try {
      const payload = await VisitorsApi.getAllByCompanyId(companyId);
      console.log("PAYLOAD", payload)
      if (payload.error) {
        toastr.error('Error fetching appointments try again later');
        return;
      }

      setVisitors(payload);
      // Do stuff with payload, probably send an action to populate state

    } catch (e) {
      toastr.error('Error fetching appointments try again later');
    }

  }

  render() {
    const {
      companyId,
      visitorList,
    } = this.props;

    return (
      <div className="stage">
        <SectionHeader text="Visitors"/>
        <div className="tableContainer">
          <ResponsiveTable
            headers={headers}
            rows={transformVisitorList(visitorList)}
            containerClassName="tableContainer"
          />
        </div>
      </div>
    );
  }
}

const stateToProps = (s) => ({
  companyId: s.company.id,
  visitorList: s.visitor.visitors,
});

const dispatchToProps = (d) => ({
  setVisitors: visitors => d(VisitorActions.setVisitors(visitors)),
});

Visitors = connect(stateToProps, dispatchToProps)(Visitors);
export default Visitors;
