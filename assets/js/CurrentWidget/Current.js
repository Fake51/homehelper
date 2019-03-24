import React, { Component } from 'react';

class Current extends Component {
    getDescriptionEmoji() {
        switch (this.props.description) {
            case 'sunny':
                return '☀';

            default:
                return this.props.description;
        }
    }

    render() {
        return <div className='currentWidget_temperature'>{this.props.temperature}&deg; {this.getDescriptionEmoji()}</div>;
    }
}

export default Current;
