import React, {
  Component,
} from 'react';

export default class Marker extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const newPos = this.props.latLngToPoint(this.props.position);
    return (
      <div
        style={{
          left: newPos.left,
          top: newPos.top,
          position: 'relative',
        }}
      >
        <h1> marker </h1>
        <h5> {JSON.stringify(this.props)} </h5>
      </div>
    );
  }
}
