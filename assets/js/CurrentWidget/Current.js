import React, { Component } from 'react';

class Current extends Component {
    getDescriptionEmoji() {
        switch (this.props.current.description) {
            case 'clear sky':
            case 'sunny':
                return '☀';

            default:
                return this.props.current.description;
        }
    }

    render() {
        const {temperature, rain, wind} = this.props.current;
        return <div className='currentWidget_temperature'>{Math.round(temperature)}&deg; {this.getDescriptionEmoji()} ({rain}) - {wind}</div>;
    }
}

export default Current;
