import * as React from 'react';
import BaseMapProvider from './types/baseMapProvider';
export { BaseMapProvider };
import * as Rx from 'rxjs';

export interface ReactMapProps {
  mapProvider: BaseMapProvider;
  style: any;
  width: Number;
  height: Number;
}
export interface ReactMapState {

}
export default class ReactMap extends React.Component<ReactMapProps, ReactMapState> {
  mouseEventsSubject: any;
  refs: any;
  constructor(props) {
    super(props);
    this.mouseEventsSubject = new Rx.Subject<any>();
    this.mouseEventsSubject.subscribe((data) => {
      console.log(`GOT EVENT: ${data}`);
    });
  }
  handleMouseEvent = (reactEvent) => {
    const nativeEvent = reactEvent.nativeEvent;
    this.mouseEventsSubject.next(nativeEvent);
  };
  componentDidMount = () => {
    const map = this.refs.mapDiv;
    this.props.mapProvider.initialize(map, null);
    this.props.mapProvider.setDimensions({
      width: this.props.style.width,
      height: this.props.style.height,
    });
  };
  render() {
    return (
      <div onMouseDown={this.handleMouseEvent}
           onMouseUp={this.handleMouseEvent}
           onDragStart={this.handleMouseEvent}
           onDragEnd={this.handleMouseEvent}
      >
        <div ref="mapDiv"/>
      </div>
    );
  }
}
