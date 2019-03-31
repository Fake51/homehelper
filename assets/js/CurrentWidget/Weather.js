import React, { Component } from 'react';
import {connect} from 'react-redux';
import Current from './Current';
import Forecast from './Forecast';
import {apiFetchWeather} from './actions';

class Weather extends Component {
    constructor(props) {
        super(props);

        if (props.updateInterval) {
            setInterval(props.apiFetchWeather, props.updateInterval);
        }
    }

    render() {
        const {today, tomorrow, current} = this.props;

        return <div>
            <Current current={current}/>
            <Forecast data={today} title='Today'/>
            <Forecast data={tomorrow} title='Tomorrow'/>
        </div>;
    }
}

const stateToProps = state => {
    return {
        current: state.forecast.current,
        today: state.forecast.today,
        tomorrow: state.forecast.tomorrow,
        updateInterval: state.config.weatherUpdateInterval
    };
};

const dispatchToProps = {apiFetchWeather};

export default connect(stateToProps, dispatchToProps)(Weather);
