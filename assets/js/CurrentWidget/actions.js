export const UPDATE_WEATHER = 'UPDATE_WEATHER';
const API = 'API';

export const updateWeather = content => {
    return {
        type: UPDATE_WEATHER,
        payload: content
    }
};

export const apiFetchWeather = () => {
    return {
        type: API,
        payload: {
            url: '/weather/current',
            success: updateWeather,
            failure: console.log
        }
    };
};
