import React, { Component } from 'react';
import Time from './Time';
import Weather from './Weather';
import './CurrentWidget.scss';

class CurrentWidget extends Component {
    render() {
        return <div className='currentWidget'>
            <Time/>
            <Weather/>
        </div>;
    }
}

export default CurrentWidget;
