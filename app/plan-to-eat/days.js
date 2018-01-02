import React from 'react';
import Plan from './plan.js';
import moment from 'moment';

export default class Days extends React.Component {
    render() {
        let index = 0,
            days = [],
            plan;

        while (index < this.props.count) {
            plan = {
                when: moment().add(index, 'days').startOf('day').format('YYYY-MM-DD'),
                what: 'Nothing planned',
                how: ''
            };

            days.push(<Plan plan={plan} key={plan.when}/>);
            index++;
        }

        return days;
    }
}
