import currentWeather from "./currentWeather";
import currentDateTime from "./currentDateTime";
import { create } from "./utils";

const current = () => {
  const section = create('section', {}, [].concat(currentDateTime(), currentWeather()));

  return section;
}

export default current;
