import * as React from 'react';
import * as BaseMapProvider from './types/baseMapProvider';

export interface ReactMapProps {
  mapProvider: BaseMapProvider;
}
export interface ReactMapState {

}
export default class ReactMap extends React.Component<ReactMapProps, ReactMapState> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div onMouseDown={this.handleMouseDown}
           onMouseUp={this.handleMouseUp}
           onDragStart={this.handleDragStart}
           onDragEnd={this.handleDragEnd}
      >
        <div ref="mapDiv"/>
      </div>
    );
  }
}
