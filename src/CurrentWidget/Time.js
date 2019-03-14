import React, { Component } from 'react';
import moment from 'moment';

class Time extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: new Date()
        };

        setInterval(this.timer.bind(this), 2000);
    }

    timer() {
        const newTime = new Date();

        if (moment(newTime).format('HH:mm') !== moment(this.state.time).format('HH:mm')) {
            this.setState({time: newTime});
        }
    }

    render() {
        return <div className='currentWidget_time'>{moment(this.state.time).format('HH:mm')}</div>;
    }
}

export default Time;
