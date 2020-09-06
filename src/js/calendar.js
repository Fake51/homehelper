import { create } from "./utils";

// todo calendar integration https://developers.google.com/calendar/quickstart/js#python-2.x
const calendar = () => {
  return create('section', {}, [
    ['h1', {}, ['Calendar']],
  ]);
}

export default calendar;
