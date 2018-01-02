import React from 'react';
import CalendarData from './data.js';
import UpcomingEvents from './upcoming.js';
import ComingDays from './days.js';

const LAYOUT_UPCOMING     = 'LAYOUT_UPCOMING';
const LAYOUT_DAYS         = 'LAYOUT_DAYS';
const DEFAULT_UPDATE_WAIT = 30 * 60 * 1000;
const DEFAULT_VISIBLE     = 5;

export default class CalendarContainer extends React.Component {
    constructor(props) {
        const state = props.store.getState();

        super(props);

        this.data = new CalendarData();

        this.state = Object.assign({
            events: [],
            layout: LAYOUT_UPCOMING,
            visibleCount: DEFAULT_VISIBLE,
            calendars: []
        }, state.calendar);

        props.store.subscribe(this.checkStoreState.bind(this));

        this.fetchData();
    }

    fetchData() {
        if (this.state.calendars.length) {
            this.data.fetchUpcomingEvents(this.state.calendars)
                .then(this.data.mergeResults)
                .then(this.updateState.bind(this));
        }
    }

    checkStoreState() {
        const state = this.props.store.getState();

        if (state.calendar.calendars === this.state.calendars && state.calendar.layout === this.state.layout) {
            return;
        }

        this.setState(Object.assign({}, this.state, state.calendar));

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.fetchData();
    }

    updateState(events) {
        this.setState(Object.assign({}, this.state, {events}));

        this.timeout = null;

        this.timeout = setTimeout(this.fetchData.bind(this), DEFAULT_UPDATE_WAIT);
    }

    renderUpcoming() {
        return this.state.events.slice(0, this.state.visibleCount).map(function (part) {
            return <UpcomingEvents key={part[0].event.when.toString()} data={part}/>
        });
    }

    renderDays() {
        return <ComingDays data={this.state.events} count={this.state.visibleCount}/>
    }

    render() {
        return <section id="calendar" className="homeSection">
        {this.state.layout === LAYOUT_UPCOMING ? this.renderUpcoming() : this.renderDays()}
        </section>;
    }
};
