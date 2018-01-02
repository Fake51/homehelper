import React from 'react';
import moment from 'moment';

export default class ClockContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign(props.store.getState().clock, {now: new Date()});

        props.store.subscribe(this.checkStoreState.bind(this));

        setTimeout(this.updateClock.bind(this), 2000);
    }

    checkStoreState() {
    }

    updateClock() {
        this.setState(Object.assign({}, this.state, {now: new Date()}));

        setTimeout(this.updateClock.bind(this), 2000);
    }

    render() {
        return <section id="clock" className="homeSection">
            <div>{moment(this.state.now).format(this.state.time)}</div>
            <div>{moment(this.state.now).format(this.state.date)}</div>
        </section>;
    }
};
