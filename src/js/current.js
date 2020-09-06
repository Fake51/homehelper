import currentWeather from "./currentWeather";
import currentDateTime from "./currentDateTime";
import { create } from "./utils";

const current = () => {
  const section = create('section', {class: 'current'}, [].concat(currentDateTime(), currentWeather()));

  return section;
}

export default current;
