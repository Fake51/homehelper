import React from 'react';

export default class Plan extends React.Component {
    render() {
        return <dl className="plan_item">
                <dt className="plan_itemLabel">When</dt>
                <dd>{this.props.plan.when}</dd>
                <dt className="plan_itemLabel">What</dt>
                <dd>{this.props.plan.what}</dd>
                <dt className="plan_itemLabel">How</dt>
                <dd>{this.props.plan.how.length ? <a href="this.props.plan.how">Recipe</a> : ''}</dd>
               </dl>
    }
}
