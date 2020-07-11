import { create } from "./utils";

const dinner = () => {
  return create('section', {}, [
    ['h1', {}, ['Dinner']],
  ]);
}

export default dinner;
