import {createStore} from 'redux';

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

const store = createStore((oldState, action) => dummyData);

export default store;
