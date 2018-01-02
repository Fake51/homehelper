import React from 'react';
import moment from 'moment';

export default class DateFormat extends React.PureComponent {
    render() {
        return <span className="dateFormat">
            <span className="dateFormat_day">
                {moment(this.props.date).format('dddd')}
            </span>
            <span className="dateFormat_precise">
            {moment(this.props.date).format('DD/MM')}
            </span>
        </span>
    }
}
