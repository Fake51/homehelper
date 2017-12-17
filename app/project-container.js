import React from 'react';
import PlanToEatContainer from './plan-to-eat/container.js';
import ClockContainer from './clock/container.js';

export default class ProjectContainer extends React.Component {
    render() {
        return <div>
            <PlanToEatContainer/>
            <ClockContainer/>
        </div>;
    }
};
