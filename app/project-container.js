import React from 'react';
import PlanToEatContainer from './plan-to-eat/container.js';
import ClockContainer from './clock/container.js';
import WeatherContainer from './weather/container.js';
import CalendarContainer from './calendar/container.js';

import PlanToEatReducer from './plan-to-eat/reducer.js';
import ClockReducer from './clock/reducer.js';
import WeatherReducer from './weather/reducer.js';
import CalendarReducer from './calendar/reducer.js';

import {createStore, combineReducers} from 'redux';
import {loadConfig} from './config-handler.js';

import GridBlock from './grid-block.js';

export default class ProjectContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {store: null};

        loadConfig()
            .then(config => this.setState({store: createStore(combineReducers({
                planToEat: PlanToEatReducer,
                clock: ClockReducer,
                weather: WeatherReducer,
                calendar: CalendarReducer
            }), config)}));
    }

    render() {
        if (this.state.store) {
            return <div className='gridContainer'>
                <GridBlock>
                    <PlanToEatContainer store={this.state.store}/>
                </GridBlock>
                <GridBlock>
                    <CalendarContainer store={this.state.store}/>
                </GridBlock>
                <GridBlock>
                    <ClockContainer store={this.state.store}/>
                    <WeatherContainer store={this.state.store}/>
                </GridBlock>
            </div>;
        }

        return <div>Loading</div>;
    }
};
