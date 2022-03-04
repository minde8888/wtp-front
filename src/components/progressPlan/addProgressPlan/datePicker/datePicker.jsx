import React, { Component } from 'react';
import { LinkedCalendar } from 'rb-datepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

class DatePicker extends Component {
    onDatesChange = ({ startDate, endDate }) => {
        console.log(({ startDate, endDate }));
    }
    render() {
        return (
            <LinkedCalendar onDatesChange={this.onDatesChange} showDropdowns={false} />
        );
    }
}

export default DatePicker;