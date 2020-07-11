const events = [];
const granularity = 1000;

setInterval(() => {
  events.forEach(event => {
    event.timeElapsed += granularity;

    if (event.timeElapsed >= event.interval) {
      event.timeElapsed = 0;
      setTimeout(event.callback, 0);
    }
  });
}, granularity);

export const addEvent = (callback, interval) => {
  const id = `event_${events.length}`;

  events.push({
    id,
    interval,
    timeElapsed: 0,
    callback
  });

  return id;
};

export const removeEvent = id => {
  events = events.filter(event => event.id !== id);
};
