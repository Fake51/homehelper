import React, { Component } from 'react';
import {connect} from 'react-redux';
import Current from './Current';
import Forecast from './Forecast';

class Weather extends Component {
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
        tomorrow: state.forecast.tomorrow
    };
};

export default connect(stateToProps)(Weather);
