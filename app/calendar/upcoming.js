import React from 'react';
import moment from 'moment';

export default class UpcomingEvents extends React.Component {
    render() {
        return <dl>
            <dt>When</dt>
            <dd>{moment(this.props.data[0].event.when).format('YYYY-MM-DD')}</dd>
            {this.props.data.map(function (bit) {
                return ([
                    <dt>Calendar</dt>,
                    <dd>{bit.name}</dd>,
                    <dt>What</dt>,
                    <dd>{bit.event.what}</dd>
                ]);
            })}
        </dl>;
    }
}
