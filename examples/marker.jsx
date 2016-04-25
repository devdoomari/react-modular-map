import React, {
  Component,
} from 'react';

export default class Marker extends Component {
  constructor(props) {
    super(props);
    debugger;
  }
  render() {
    const newPos = this.props.latLngToPoint(this.props.center);
    return (
      <div>
        <h1> marker </h1>
        <h5> {JSON.stringify(this.props)} </h5>
      </div>
    );
  }
}
