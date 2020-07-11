import { format } from "date-fns";
import weatherRequest from "./weatherRequest";
import { addEvent } from "./eventLoop";
import { create } from "./utils";

/*
const renderForecast = (date, day) => {
  return (
    <>
      <span>{format(date, "d/M")}</span>
      <span>
        {`${day.day.temp} ${day.day.wind}`}
        <br />
        {`UV ${day.day.uv} • Rain ${day.day.rain}`}
      </span>
      <span>{`${day.night.temp}`}</span>
    </>
  );
};
*/

const updateElements = (container, data) => {
  const { now, forecast } = data;
  const day0 = new Date();
  const day1 = new Date(day0.valueOf() + 86000000);
  const day2 = new Date(day1.valueOf() + 86000000);

  document.getElementById('currentWeather_now').innerText = `${now.temp} • ${now.wind} • UV ${now.uv} Rain ${now.rain}`;
  document.getElementById('forecast_1_date').innerText = format(day0, "d/M");
  document.getElementById('forecast_2_date').innerText = format(day1, "d/M");
  document.getElementById('forecast_3_date').innerText = format(day2, "d/M");

  document.getElementById('forecast_1_day').innerText = `${forecast[0].day.temp} ${forecast[0].day.wind} UV ${forecast[0].day.uv} • Rain ${forecast[0].day.rain}`;
  document.getElementById('forecast_2_day').innerText = `${forecast[1].day.temp} ${forecast[1].day.wind} UV ${forecast[1].day.uv} • Rain ${forecast[1].day.rain}`;
  document.getElementById('forecast_3_day').innerText = `${forecast[2].day.temp} ${forecast[2].day.wind} UV ${forecast[2].day.uv} • Rain ${forecast[2].day.rain}`;

  document.getElementById('forecast_1_night').innerText = `${forecast[0].night.temp}`;
  document.getElementById('forecast_2_night').innerText = `${forecast[1].night.temp}`;
  document.getElementById('forecast_3_night').innerText = `${forecast[2].night.temp}`;
};

const updateWeather = (updater) => {
  weatherRequest(updater);
};

const currentWeather = () => {
  const container = create('div', {}, [
    ['p', {id: 'currentWeather_now'}],
    ['div', {id: 'currentWeather_forecast', class: 'forecast'}, [
      ['span'],
      ['span', {}, ['Day']],
      ['span', {}, ['Night']],
      ['span', {id: 'forecast_1_date'}],
      ['span', {id: 'forecast_1_day'}],
      ['span', {id: 'forecast_1_night'}],
      ['span', {id: 'forecast_2_date'}],
      ['span', {id: 'forecast_2_day'}],
      ['span', {id: 'forecast_2_night'}],
      ['span', {id: 'forecast_3_date'}],
      ['span', {id: 'forecast_3_day'}],
      ['span', {id: 'forecast_3_night'}],
    ]]
  ]);
  const updater = updateElements.bind(null, container);

  addEvent(updateWeather.bind(null, updater), 5 * 60 * 1000);

  updateWeather(updater);

  return container;
}

export default currentWeather;
