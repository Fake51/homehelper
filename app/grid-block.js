import React from 'react';

export default class GridBlock extends React.PureComponent {
    render() {
        return <div className='gridBlock'>{this.props.children}</div>;
    }
}
