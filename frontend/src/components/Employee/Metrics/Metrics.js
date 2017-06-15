/**
 * @author Anthony Altieri on 6/4/17.
 */
import React, { Component } from 'react';
import SectionHeader from '../SectionHeader';
var ZingChart = require('zingchart-react').core;

class Metrics extends Component {
  render() {
    var myConfig = {
      type: "bar",
      series : [
        { values : [35,42,67,89,25,34,67,85] }
      ]
    };

    return(
      <div className="stage">
        <SectionHeader text="Metrics"/>
          <div className="employeePageForms" >
            <div className="fullwidth">
              <ZingChart id="myChart" height="300" width="600" data={myConfig} />
            </div>
          </div>

      </div>
    )
  }
}

export default Metrics;
