export const create = (type, attributes = {}, children = []) => {
  const element = document.createElement(type);

  for (const prop in attributes) {
    element.setAttribute(prop, attributes[prop]);
  }

  replaceChildren(element, children);

  return element;
};

export const replaceChildren = (container, children = []) => {
  container.innerHTML = null;

  children.forEach(child => {
    if (Array.isArray(child)) {
      container.appendChild(create(...child));
    } else if (typeof child === 'string') {
      container.appendChild(document.createTextNode(child));
    } else if (typeof child === 'object') {
      container.appendChild(child);
    }
  });
};
