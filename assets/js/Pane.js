import React, { Component } from 'react';
import './Pane.scss';

class Pane extends Component {
    constructor(props) {
        super(props);

        this.children = props.children;
        this.direction = props.direction;
    }

    render() {
        return <div className={this.direction + '-pane-container'}>
        {this.children.map((child, index) => {
            return <div key={index} className='pane'>{Array.isArray(child) ? <Pane key={index} children={child} direction={this.direction === 'horizontal' ? 'vertical' : 'horizontal'}/> : child}</div>;
        })}
        </div>;
    }
}

export default Pane;
