import current from "./current";
import calendar from "./calendar";
import dinner from "./dinner";

const app = (rootId) => {
  const rootElement = document.getElementById(rootId);

  rootElement.appendChild(current());
  rootElement.appendChild(calendar());
  rootElement.appendChild(dinner());
};

export default app;
