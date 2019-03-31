import React, { Component } from 'react';

class Forecast extends Component {
    render() {
        const {low, high, description, night, wind, rain, humidity} = this.props.data;

        return <div className='currentWidget_todayForecast'><h4>{this.props.title}</h4><dl><dt>Day</dt><dd>{Math.round(low)}&deg; - {Math.round(high)}&deg; {description}</dd><dt>Night</dt><dd>{Math.round(night)}&deg;</dd><dt>Wind</dt><dd>{wind}</dd><dt>Rain</dt><dd>{rain}</dd><dt>Humidity</dt><dd>{humidity}</dd></dl></div>;
    }
}

export default Forecast;
