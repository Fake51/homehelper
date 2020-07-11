import { create } from "./utils";

const calendar = () => {
  return create('section', {}, [
    ['h1', {}, ['Calendar']],
  ]);
}

export default calendar;
