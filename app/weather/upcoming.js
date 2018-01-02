import React from 'react';

export default class WeatherDisplay extends React.Component {
    render() {
        return <div>
            <span className="weather_date">{this.props.condition.date}</span>
            <span className="weather_temp">{this.props.condition.low}</span> - <span className="weather_temp">{this.props.condition.high}&#8451;</span>
            <span className="weather_description">{this.props.condition.text}</span>
        </div>;
    }
}
