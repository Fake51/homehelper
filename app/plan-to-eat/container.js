import React from 'react';
import PlanToEatData from './data.js';
import Plan from './plan.js';
import Days from './days.js';
import Item from './item.js';
import moment from 'moment';

const LAYOUT_UPCOMING     = 'LAYOUT_UPCOMING';
const LAYOUT_DAYS         = 'LAYOUT_DAYS';
const DEFAULT_UPDATE_WAIT = 30 * 60 * 1000;
const DEFAULT_VISIBLE     = 5;

export default class PlanToEatContainer extends React.Component {
    constructor(props) {
        const state = props.store.getState();

        super(props);

        this.data = new PlanToEatData();

        this.state = Object.assign({
            plans: [],
            id: null,
            layout: LAYOUT_UPCOMING,
            visibleCount: DEFAULT_VISIBLE
        }, state.planToEat);

        props.store.subscribe(this.checkStoreState.bind(this));

        this.fetchData();
    }

    fetchData() {
        if (this.state.id) {
            this.data.fetchPlan(this.state.id)
                .then(this.updateState.bind(this));
        }
    }

    checkStoreState() {
        const state = this.props.store.getState();

        this.setState(Object.assign({}, this.state, state.planToEat));
    }

    updateState(json) {
        this.setState(Object.assign({}, this.state, {plans: json}));

        setTimeout(this.fetchData.bind(this), DEFAULT_UPDATE_WAIT);
    }

    getDays() {
        let index = 0,
            days = [],
            plan;

        while (index < this.state.visibleCount) {
            plan = {
                when: moment().add(index, 'days').startOf('day'),
                what: 'Nothing planned',
                how: ''
            };

            days.push(plan);
            index++;
        }

        return days;
    }

    renderUpcoming() {
        return <ul>
            {this.state.plans.map(function (plan) {
                return <Item key={plan.when.valueOf()} plan={plan}></Item>;
            })}
        </ul>;
    }

    renderDays() {
        return <ul>
            {this.getDays().map(function (plan) {
                return <Item key={plan.when.valueOf()} plan={plan}></Item>;
            })}
        </ul> 
        /*<Days plans={this.state.plans} count={this.state.visibleCount}/>*/
    }

    render() {
        return <section id="plan-to-eat" className="homeSection">
        {this.state.layout === LAYOUT_UPCOMING ? this.renderUpcoming() : this.renderDays()}
        </section>;
    }
};
