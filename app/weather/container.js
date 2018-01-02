import React from 'react';
import weather from 'yahoo-weather';
import Upcoming from './upcoming.js';
import Current from './current.js';

const UPDATE_WAIT            = 30 * 60 * 1000;
const DEFAULT_FORECAST_COUNT = 2;

export default class WeatherContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({
            location: null,
            forecast: DEFAULT_FORECAST_COUNT
        }, props.store.getState().weather);

        props.store.subscribe(this.checkStoreState.bind(this));

        this.fetchWeather();
    }

    fetchWeather() {
        if (this.state.location) {
            weather(this.state.location)
                .then(this.updateWeather.bind(this));
        }
    }

    updateWeather(weatherData) {
        if (weatherData && weatherData.item) {
            this.setState(Object.assign({}, this.state, {current: weatherData.item.condition, upcoming: weatherData.item.forecast}));
        }

        setTimeout(this.fetchWeather.bind(this), UPDATE_WAIT);
    }

    checkStoreState() {
        this.setState(Object.assign({}, this.state, this.props.store.getState().weather));
    }

    render() {
        return <section id="weather" className="homeSection">
        {this.state.current ? <Current condition={this.state.current}/> : null}
        {this.state.upcoming ? this.state.upcoming.slice(1, 1 + this.state.forecast).map(function (item) {
            return <Upcoming key={item.date} condition={item}/>;
        }) : null}
        </section>;
    }
};
