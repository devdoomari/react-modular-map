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
  mouseEventsStream: any;
  mouseDownStream: any;
  mouseUpStream: any;
  mouseMoveStream: any;
  refs: any;
  constructor(props) {
    super(props);
    this.initMouseStream();
  }
  initMouseStream = () => {
    this.mouseEventsStream = new Rx.Subject<any>();
    this.mouseDownStream = this.mouseEventsStream.filter(
      event => event.type === 'mousedown'
    );
    this.mouseUpStream = this.mouseEventsStream.filter(
      event => event.type === 'mouseup'
    );
    this.mouseMoveStream = this.mouseEventsStream.filter(
      event => event.type === 'mousemove'
    );
    this.mouseEventsStream.subscribe((mouseEvent) => {
      console.log(`GOT EVENT: ${mouseEvent.type}`);
    });
  }
  handleMouseEvent = (reactEvent) => {
    const nativeEvent = reactEvent.nativeEvent;
    this.mouseEventsStream.next(nativeEvent);
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
      <div
      >
        <div ref="mapDiv"
             key="map"
             style={{
               width: this.props.style.width,
               height: this.props.style.height,
               zIndex: -30,
               position: 'absolute',
             }}
        />
        <div
          key="eventCatcher"
          onMouseDown={this.handleMouseEvent}
          onMouseUp={this.handleMouseEvent}
          onMouseMove={this.handleMouseEvent}
          onDragStart={this.handleMouseEvent}
          onDragEnd={this.handleMouseEvent}
          style={{
            width: this.props.style.width,
            height: this.props.style.height,
            position: 'absolute',
          }}
        />
      </div>
    );
  }
}
