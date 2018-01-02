import React from 'react';
import moment from 'moment';

export default class ComingDays extends React.Component {
    renderDays() {
        const events = this.getFilteredEvents();
        let index = 0,
            days = [],
            nextDay,
            day;

        while (index < this.props.count) {
            day = moment().add(index, 'days').startOf('day');
            nextDay = moment().add(index + 1, 'days').startOf('day');

            days.push(<dt key={'dt' + day.valueOf()}>When</dt>);
            days.push(<dd key={'dd' + day.valueOf()}>{day.format('YYYY-MM-DD')}</dd>);

            events.forEach(function (event) {
                if (event[0].event.when.valueOf() >= day.valueOf() && event[0].event.when.valueOf() <= nextDay.valueOf()) {
                    event.forEach(function (item) {
                        days.push(<dt key={'dt' + item.event.uid}>{item.name}</dt>);
                        days.push(<dd key={'dd' + item.event.uid}>{item.event.what}</dd>);
                    });
                }
            });

            index++;
        }

        return days;
    }

    getFilteredEvents() {
        const now = moment().startOf('day').valueOf(),
            then = moment().startOf('day').add(this.props.count, 'days').valueOf();

        return this.props.data.filter(function (items) {
            return items[0].event.when.valueOf() >= now && items[0].event.when.valueOf() <= then;
        });
    }

    render() {
        return <dl>
            {this.renderDays()}
        </dl>
    }
}
