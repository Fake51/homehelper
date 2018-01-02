import ical from 'ical.js';

function fetchCalendar({name, url}) {
    return fetch('http://localhost:8080/getcalendar.php?url=' + encodeURIComponent(url))
        .then(function (response) {
            return response.text()
                .then(function (text) {
                    return {
                        name,
                        data: text
                    };
                });
        })
}

function getEventsFromData(data) {
    const parsed = ical.parse(data),
        calendar = new ical.Component(parsed),
        subs = calendar.getAllSubcomponents('vevent');

    return subs.map(function (component) {
        let event = new ical.Event(component);

        return {
            when: event.startDate.toJSDate(),
            what: event.summary,
            uid: event.uid
        };
    });
}

function convertToEvents(results) {
    return results.map(function (result) {
        return {
            name: result.name,
            events: getEventsFromData(result.data)
        };
    });
}

function filterToFuture(results) {
    const now = (new Date()).valueOf();

    return results.map(function (result) {
        return {
            name: result.name,
            events: result.events.filter(function (event) {
                return event.when.valueOf() > now;
            })
        }
    });
}

export default class CalendarData {
    fetchEvents(calendars) {
        return Promise.all(calendars.map(fetchCalendar))
            .then(convertToEvents);
    }

    fetchUpcomingEvents(calendars) {
        return this.fetchEvents(calendars)
            .then(filterToFuture);
    }

    mergeResults(results) {
        const intermediate = results.reduce(function (agg, next) {
            next.events.forEach(function (event) {
                const date = event.when,
                    key = date.getFullYear() + date.getMonth() + date.getDate();

                if (!agg[key]) {
                    agg[key] = [];
                }

                agg[key].push({
                    name: next.name,
                    event
                });
            });

            return agg;
        }, {});

        let merged = [],    
            x;

        for (x in intermediate) {
            if (intermediate.hasOwnProperty(x)) {
                merged.push(intermediate[x]);
            }
        }

        return merged.sort(function (a, b) {
            return a[0].event.when.valueOf() < b[0].event.when.valueOf() ? -1 : 1;
        });
    }
}
