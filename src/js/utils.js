export const create = (type, attributes = {}, children = []) => {
  const element = document.createElement(type);

  for (const prop in attributes) {
    element.setAttribute(prop, attributes[prop]);
  }

  children.forEach(child => {
    if (Array.isArray(child)) {
      element.appendChild(create(...child));
    } else if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (typeof child === 'object') {
      element.appendChild(child);
    }
  });

  return element;
};
