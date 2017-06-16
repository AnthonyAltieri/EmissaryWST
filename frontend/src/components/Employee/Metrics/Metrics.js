/**
 * @author Anthony Altieri on 6/4/17.
 */
import React, { Component } from 'react';
import SectionHeader from '../SectionHeader';
var ZingChart = require('zingchart-react').core;
import * as VisitorActions from '../../../actions/Visitor';
import * as VisitorsApi from '../../../api/Visitors';
import * as AppointmentsApi from '../../../api/Appointments';
import * as AppointmentsActions from '../../../actions/Appointments';
import * as AppointmentActions from '../../../actions/Appointment';
import {connect} from 'react-redux';
import { toastr } from 'react-redux-toastr';
var PieChart = require('zingchart-react').pie;
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";
import moment from 'moment';


function transformAppointmentList(appointmentList) {
  console.log("APPLIST", appointmentList)

  if (appointmentList.length == 0)
    return appointmentList;
  let fullCount = appointmentList.length;
  let checkInCount = appointmentList.filter( function(appt) {
    return appt.checkIn;
  }).length;
  let notCheckedInCount = fullCount - checkInCount;

  console.log([
    { text : "Checked In", values : [checkInCount] },
    { text : "Not Checked In", values : [notCheckedInCount] },
  ])

  return [
    { text : "Checked In", values : [checkInCount] },
    { text : "Not Checked In", values : [notCheckedInCount] },
  ]
}



function transformVisitorsList(visitorsList) {
  if (!visitorsList || visitorsList.length == 0)
    return [];
  let visitPerHourObj = {};
  for (var i = 0; i < visitorsList.length; i++)
  {
    let visitorTime = moment(visitorsList[i].checkin_time).minutes(0).seconds(0).milliseconds(0).toDate().getTime() + "";
    if (visitorTime in visitPerHourObj) {
      visitPerHourObj[visitorTime]++;
    }
    else {
      visitPerHourObj[visitorTime] = 1;
    }
  }

  let visitPerHour = [];
  let startTime = moment(visitorsList[0].checkin_time).minutes(0).seconds(0).milliseconds(0).toDate().getTime();
  let lastTime = moment(visitorsList[visitorsList.length - 1].checkin_time).minutes(0).seconds(0).milliseconds(0).toDate().getTime();
  let hoursInMilli = 3600000;

  for (var i = startTime; i <= lastTime; i += hoursInMilli)
  {
    if ((i + "") in visitPerHourObj) {
      visitPerHour.push(visitPerHourObj[(i + "")]);
    }
    else {
      visitPerHour.push(0);
    }
  }

  return visitPerHour;
}

class Metrics extends Component {
  async componentDidMount() {
    const { companyId, setVisitors } = this.props;
    console.log('componentDidMount()');

    // get visitors
    try {
      const payload = await VisitorsApi.getAllByCompanyId(companyId);
      console.log("PAYLOAD", payload)
      if (payload.error) {
        t//oastr.error('Error fetching visitors try again later');
        return;
      }

      setVisitors(payload);
      // Do stuff with payload, probably send an action to populate state

    } catch (e) {
      //toastr.error('Error fetching visitors try again later');
    }

    // get appointments
    try {
      const payload = await AppointmentsApi.getAllByCompanyId(companyId);
      console.log("APPOINTMENT PAYLOAD", payload)
      if (payload.error) {
        //toastr.error('Error fetching appointments try again later');
        return;
      }

      setAppointments(payload);
      // Do stuff with payload, probably send an action to populate state

    } catch (e) {
      //toastr.error('Error fetching appointments try again later');
    }

  }

  render() {
    const {
      companyId,
      visitorList,
      appointmentList,
    } = this.props;

    const startX = (visitorList && visitorList.length > 0) ? moment(visitorList[0].checkin_time).minutes(0).seconds(0).milliseconds(0).toDate().getTime() : 0;
    const myConfig = {
     	type: 'line',
     	backgroundColor:'#2C2C39',
     	title:{
     	  text:'Visitor Check Ins',
     	  adjustLayout: true,
     	  fontColor:"#E3E3E5",
     	  marginTop: 7
     	},
     	plotarea:{
     	  margin:'dynamic 70'
     	},
     	plot:{
     	  aspect: 'spline',
     	  lineWidth: 2,
     	  marker:{
     	    borderWidth: 0,
     	    size: 5
     	  }
     	},
     	scaleX:{
     	  lineColor: '#E3E3E5',
     	  zooming: true,
     	  zoomTo:[0,15],
     	  minValue: startX,
     	  step: 'hour',
     	  item:{
     	    fontColor:'#E3E3E5'
     	  },
     	  transform:{
     	    type: 'date',
     	    all: '%D %M %d<br>%h:%i'
     	  }
     	},
     	scaleY:{
     	  minorTicks: 1,
     	  lineColor: '#E3E3E5',
     	  tick:{
     	    lineColor: '#E3E3E5'
     	  },
     	  minorTick:{
     	    lineColor: '#E3E3E5'
     	  },
     	  minorGuide:{
     	    visible: true,
     	    lineWidth: 1,
     	    lineColor: '#E3E3E5',
     	    alpha: 0.7,
     	    lineStyle: 'dashed'
     	  },
     	  guide:{
     	    lineStyle: 'dashed'
     	  },
     	  item:{
     	    fontColor:'#E3E3E5'
     	  }
     	},
     	tooltip:{
     	  borderWidth: 0,
     	  borderRadius: 3
     	},
     	preview:{
     	  adjustLayout: true,
     	  borderColor:'#E3E3E5',
     	  mask:{
     	    backgroundColor:'#E3E3E5'
     	  }
     	},
     	crosshairX:{
     	  plotLabel:{
     	    multiple: true,
     	    borderRadius: 3
     	  },
     	  scaleLabel:{
     	    backgroundColor:'#53535e',
     	    borderRadius: 3
     	  },
     	  marker:{
     	    size: 7,
     	    alpha: 0.5
     	  }
     	},
     	crosshairY:{
     	  lineColor:'#E3E3E5',
     	  type:'multiple',
     	  scaleLabel:{
     	    decimals: 2,
     	    borderRadius: 3,
     	    offsetX: -5,
     	    fontColor:"#2C2C39",
     	    bold: true
     	  }
     	},

    	series: [
    		{
    			values: transformVisitorsList(visitorList),
    			lineColor:'#E34247',
    			marker:{
    			  backgroundColor:'#E34247'
    			}
    		},
    	]
    };

    return(
      <div className="stage">
        <SectionHeader text="Metrics"/>
          <div className="employeePageForms" >
            <div className="fullwidth">
              <center>
              <PieChart id="pieChart" style={{margin:'10px'}} height="300" width="600" series={transformAppointmentList(appointmentList)} legend="true" theme="light" title="Checked In Users"/>
              <ZingChart id="myChart" height="300" width="600" data={myConfig} />
              </center>
            </div>
          </div>

      </div>
    )
  }
}

const stateToProps = (s) => ({
  companyId: s.company.id,
  visitorList: s.visitor.visitors.visitors,
  appointmentList: s.appointments.list,
});

const dispatchToProps = (d) => ({
  setVisitors: visitors => d(VisitorActions.setVisitors(visitors)),
  setAppointments: appointments => d(AppointmentsActions.set(appointments)),
});

Metrics = connect(stateToProps, dispatchToProps)(Metrics);
export default Metrics;
