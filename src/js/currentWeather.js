import { format } from "date-fns";
import oWMRequest from "./openWeatherMapRequest";
import dmiRequest from "./dmiRequest";
import { addEvent } from "./eventLoop";
import { create, replaceChildren } from "./utils";
import { weatherConfig } from "../../config";

// todo improve this spaghetti
// todo add touch option to show hourly breakdown for today and tomorrow
const updateElements = (container, data) => {
  const { now, forecast } = data;
  const day0 = new Date();
  const day1 = new Date(day0.valueOf() + 86000000);
  const day2 = new Date(day1.valueOf() + 86000000);

  replaceChildren(
    document.getElementById('currentWeather_now'),
    [['img', {src: `${now.icon}`}], `${now.temp} ${now.wind} UV ${now.uv}`]
  );

  replaceChildren(
    document.getElementById('forecast_1_day'),
    [['img', {src: `${forecast[0].day.icon}`}], `${forecast[0].day.temp} ${forecast[0].day.wind} UV ${forecast[0].day.uv}`]
  );
  replaceChildren(
    document.getElementById('forecast_2_day'),
    [['img', {src: `${forecast[1].day.icon}`}], `${forecast[1].day.temp} ${forecast[1].day.wind} UV ${forecast[1].day.uv}`]
  );
  replaceChildren(
    document.getElementById('forecast_3_day'),
    [['img', {src: `${forecast[2].day.icon}`}], `${forecast[2].day.temp} ${forecast[2].day.wind} UV ${forecast[2].day.uv}`]
  );

  replaceChildren(
    document.getElementById('forecast_1_night'), [`${forecast[0].night.temp}`]
  );
  replaceChildren(
    document.getElementById('forecast_2_night'), [`${forecast[1].night.temp}`]
  );
  replaceChildren(
    document.getElementById('forecast_3_night'), [`${forecast[2].night.temp}`]
  );
};

const updateWeather = (updater) => {
  switch (weatherConfig.service) {
    case "openweathermap":
      oWMRequest(updater);
      break;

    case "dmi":
      dmiRequest(updater);
      break;
  }
};

const currentWeather = () => {
  const container = create('div', {class: 'currentWeather'}, [
    ['p', {id: 'currentWeather_now'}],
    ['div', {id: 'currentWeather_forecast', class: 'forecast'}, [
      ['span'],
      ['span', {}, [
        ['img', {src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxwYXRoIGQ9Ik0yNTUuMDEsMTU1LjEzOGMtNTQuODQ3LDAtOTkuMzE3LDQ0LjQ3LTk5LjMxNyw5OS4zMDljMCw1NC44NTQsNDQuNDcsOTkuMzI1LDk5LjMxNyw5OS4zMjUgICBjNTQuODQ3LDAsOTkuMzA5LTQ0LjQ3MSw5OS4zMDktOTkuMzI1QzM1NC4zMTgsMTk5LjYwNywzMDkuODU2LDE1NS4xMzgsMjU1LjAxLDE1NS4xMzh6IE0yNTUuMDEsMzI3LjUwNiAgIGMtNDAuMzQ4LDAtNzMuMDUyLTMyLjcwNC03My4wNTItNzMuMDZjMC00MC4zMzksMzIuNzA0LTczLjA0OCw3My4wNTItNzMuMDQ4YzQwLjM0NywwLDczLjA2LDMyLjcwOSw3My4wNiw3My4wNDggICBDMzI4LjA2OSwyOTQuODAyLDI5NS4zNTYsMzI3LjUwNiwyNTUuMDEsMzI3LjUwNnoiIGZpbGw9IiMwMTAxMDEiLz48cGF0aCBkPSJNMjU2LjcxNSwxMzguMDY2YzAsMC00My4yNTctODEuNzU2LDAtODEuNzU2QzI5OS45OCw1Ni4zMSwyNTYuNzE1LDEzOC4wNjYsMjU2LjcxNSwxMzguMDY2eiIgZmlsbD0iIzAxMDEwMSIvPjxwYXRoIGQ9Ik0zNDAuMjcsMTczLjY1MWMwLDAsMjcuMjE5LTg4LjM5Miw1Ny43OTktNTcuNzkxQzQyOC42NDgsMTQ2LjQzNywzNDAuMjcsMTczLjY1MSwzNDAuMjcsMTczLjY1MXoiIGZpbGw9IiMwMTAxMDEiLz48cGF0aCBkPSJNMzc0LjE4NywyNTcuOTEyYzAsMCw4MS43NDctNDMuMjc0LDgxLjczMSwwQzQ1NS45LDMwMS4xNTYsMzc0LjE4NywyNTcuOTEyLDM3NC4xODcsMjU3LjkxMnoiIGZpbGw9IiMwMTAxMDEiLz48cGF0aCBkPSJNMzM4LjU4LDM0MS40NzljMCwwLDg4LjQyMSwyNy4xODYsNTcuNzk5LDU3Ljc4MkMzNjUuNzk5LDQyOS44MzMsMzM4LjU4LDM0MS40NzksMzM4LjU4LDM0MS40Nzl6IiBmaWxsPSIjMDEwMTAxIi8+PHBhdGggZD0iTTI1NC4zMzIsMzc1LjM3OWMwLDAsNDMuMjkxLDgxLjczOSwwLDgxLjczOUMyMTEuMDgzLDQ1Ny4wODUsMjU0LjMzMiwzNzUuMzc5LDI1NC4zMzIsMzc1LjM3OXoiIGZpbGw9IiMwMTAxMDEiLz48cGF0aCBkPSJNMTcwLjc3OCwzMzkuNzcyYzAsMC0yNy4xOTQsODguNDA0LTU3Ljc5OSw1Ny44QzgyLjQxNiwzNjYuOTgzLDE3MC43NzgsMzM5Ljc3MiwxNzAuNzc4LDMzOS43NzJ6IiBmaWxsPSIjMDEwMTAxIi8+PHBhdGggZD0iTTEzNi44NywyNTUuNTA4YzAsMC04MS43NCw0My4yOTEtODEuNzQsMEM1NS4xNDcsMjEyLjI4LDEzNi44NywyNTUuNTA4LDEzNi44NywyNTUuNTA4eiIgZmlsbD0iIzAxMDEwMSIvPjxwYXRoIGQ9Ik0xNzIuNDc2LDE3MS45NTRjMCwwLTg4LjQwNC0yNy4xODItNTcuNzk5LTU3Ljc5OUMxNDUuMjQ5LDgzLjYwNCwxNzIuNDc2LDE3MS45NTQsMTcyLjQ3NiwxNzEuOTU0eiIgZmlsbD0iIzAxMDEwMSIvPjwvZz48L3N2Zz4=', height: '40px'}]
      ]],
      ['span', {}, [
        ['img', {src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxwYXRoIGQ9Ik0zMDkuNjExLDM2Ny42M2MtOTEuMDQzLDAtMTY0LjgzNS03My44MDEtMTY0LjgzNS0xNjQuODYzYzAtNjIuNzc4LDM1LjQ5LTExNi42OTUsODcuMTE1LTE0NC41MzIgICBDMTMzLjk5OCw3MC42MjgsNTguMjMyLDE1NC4wNDEsNTguMjMyLDI1NS4zMTFjMCwxMDkuODAzLDg5LjAyNCwxOTguODYzLDE5OC44NSwxOTguODYzYzEwMS4yNiwwLDE4NC42NjktNzUuNzkzLDE5Ny4wOC0xNzMuNjc4ICAgQzQyNi4zMTYsMzMyLjE0OSwzNzIuMzc2LDM2Ny42MywzMDkuNjExLDM2Ny42M3oiIGZpbGw9IiMwMTAxMDEiLz48cG9seWdvbiBmaWxsPSIjMDEwMTAxIiBwb2ludHM9IjMyOS45MjUsMzAyLjUzMyAzNjQuODA2LDI4NC4xODUgMzk5LjY4OCwzMDIuNTMzIDM5My4wMjEsMjYzLjY5MSA0MjEuMjI3LDIzNi4xOTYgMzgyLjI0MiwyMzAuNTMgICAgMzY0LjgwNiwxOTUuMTk3IDM0Ny4zNiwyMzAuNTMgMzA4LjM4NiwyMzYuMTk2IDMzNi41OTEsMjYzLjY5MSAgIi8+PC9nPjwvc3ZnPg==', height: '40px'}]
      ]],
      ['span', {}, ['TODAY']],
      ['span', {id: 'forecast_1_day'}],
      ['span', {id: 'forecast_1_night'}],
      ['span', {}, ['+1']],
      ['span', {id: 'forecast_2_day'}],
      ['span', {id: 'forecast_2_night'}],
      ['span', {}, ['+2']],
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
