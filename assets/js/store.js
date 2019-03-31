import {createStore, combineReducers, applyMiddleware} from 'redux';
import {UPDATE_WEATHER} from './CurrentWidget/actions.js';

const dummyData = {
    forecast: {
        today: {
            description: 'sunny',
            current: 9,
            high: 12,
            low: 5,
            night: 3
        },
        tomorrow: {
            description: 'sunny',
            high: 15,
            low: 7,
            night: 4
        }
    }
};

const forecast = (state = {}, action) => {
    switch (action.type) {
    case UPDATE_WEATHER:
        return action.payload;

    default:
        return state;
    }
};

const config = (state = {}, action) => {
    return {
        weatherUpdateInterval: 5000
    };
};

const initialState = {forecast: {today: {}, tomorrow: {}, current: {}}, config: {weatherUpdateInterval: 5000}};

const apiFetch = store => next => action => {
    if (action.type === 'API') {
        fetch('http://127.0.0.1:8000' + action.payload.url)
            .then(value => {
                return value.json();
            })
            .then(json => {
                store.dispatch(action.payload.success(json));
            })
            .catch(error => {
                store.dispatch(action.payload.failure(error));
            });
    } else {
        return next(action);
    }
};

const store = createStore(combineReducers({forecast, config}), initialState, applyMiddleware(apiFetch));

export default store;
