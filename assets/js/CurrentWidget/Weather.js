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
        const {today, tomorrow} = this.props;

        return <div>
            <Current temperature={this.props.today.current}/>
            <Forecast title='Today' high={today.high} low={today.low} night={today.night} description={today.description}/>
            <Forecast title='Tomorrow' high={tomorrow.high} low={tomorrow.low} night={tomorrow.night} description={tomorrow.description}/>
        </div>;
    }
}

const stateToProps = state => {
    return {
        today: state.forecast.today,
        tomorrow: state.forecast.tomorrow,
        updateInterval: state.config.weatherUpdateInterval
    };
};

const dispatchToProps = {apiFetchWeather};

export default connect(stateToProps, dispatchToProps)(Weather);
