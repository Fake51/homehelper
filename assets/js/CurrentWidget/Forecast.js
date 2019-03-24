import React, { Component } from 'react';

class Forecast extends Component {
    render() {
        return <div className='currentWidget_todayForecast'><span className='currentWidget_todayForecast_day'>High: {this.props.high}&deg; - low: {this.props.low}&deg;</span><span className='currentWidget_todayForecast_night'>Night: {this.props.night}&deg;</span></div>;
    }
}

export default Forecast;
