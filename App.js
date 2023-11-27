import React, { useState } from "react";
import { Label, Input, Button, Table, Modal, Select } from "semantic-ui-react";
import Calendar from "rc-calendar";
import DatePicker from "rc-calendar/lib/Picker";
import axios from "axios";
import moment from "moment";

import 'rc-calendar/assets/index.css';
import 'semantic-ui-css/semantic.min.css';

const App = () => {
  //
  
  const deptCode = [
    {key: '1', value: '10', text: 'Administration'},
    {key: '2', value: '20', text: 'Marketing'},
    {key: '3', value: '30', text: 'Purchasing'},
    {key: '4', value: '40', text: 'Human Resources'},
    {key: '5', value: '50', text: 'Shipping'},
    {key: '6', value: '60', text: 'IT'},
    {key: '7', value: '70', text: 'Public Relations'},
    {key: '8', value: '80', text: 'Sales'},
    {key: '9', value: '90', text: 'Executive'},
    {key: '10', value: '100', text: 'Finance'},
    {key: '11', value: '110', text: 'Accounting'},
    {key: '12', value: '120', text: 'Treasury'},
    {key: '13', value: '130', text: 'Corporate Tax'},
    {key: '14', value: '140', text: 'Control And Credit'},
    {key: '15', value: '150', text: 'Shareholder Services'},
    {key: '16', value: '160', text: 'Benefits'},
    {key: '17', value: '170', text: 'Manufacturing'},
    {key: '18', value: '180', text: 'Construction'},
    {key: '19', value: '190', text: 'Contracting'},
    {key: '20', value: '200', text: 'Operations'},
    {key: '21', value: '210', text: 'IT Support'},
    {key: '22', value: '220', text: 'NOC'},
    {key: '23', value: '230', text: 'IT Helpdesk'},
    {key: '24', value: '240', text: 'Government Sales'},
    {key: '25', value: '250', text: 'Retail Sales'},
    {key: '26', value: '260', text: 'Recruiting'},
    {key: '27', value: '270', text: 'Payroll'},
  ];

  return (
    <div className="container">

    </div>
  );
}

export default App;
