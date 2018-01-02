import React from 'react';
import DateLayout from '../common/date.js';

export default class Item extends React.Component {
    render() {
        return <li><DateLayout date={this.props.plan.when}/></li>
    }
}
/*
                <dd>{this.props.plan.when}</dd>
                <dt className="plan_itemLabel">What</dt>
                <dd>{this.props.plan.what}</dd>
                <dt className="plan_itemLabel">How</dt>
                <dd>{this.props.plan.how.length ? <a href="this.props.plan.how">Recipe</a> : ''}</dd>
                */
