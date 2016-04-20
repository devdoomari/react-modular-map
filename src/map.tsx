import * as React from 'react';
import * as Rx from 'rxjs';

import BaseMapProvider from './types/base-map-provider';
export { BaseMapProvider };
import {
  ILatLng,
  IBehavior,
} from './interfaces';
import MapController from './map-controller';

export interface ReactMapProps {
  mapProvider: BaseMapProvider;
  style: any;
  width: Number;
  height: Number;
  behaviors: Array<IBehavior>;
}
export interface ReactMapState {

}
export default class ReactMap extends React.Component<ReactMapProps, ReactMapState> {
  eventsStream: any;
  refs: any;
  mapController: MapController;
  constructor(props) {
    super(props);
    this.eventsStream = new Rx.Subject<any>();
    this.mapController = new MapController({
      pointToLatLng: this.props.mapProvider.pointToLatLng,
      latLngToPoint: this.props.mapProvider.latLngToPoint,
      getCenter: this.props.mapProvider.getCenter,
      getZoomLevel: this.props.mapProvider.getZoomLevel,
    });
    this.initMapController(this.mapController);
    for (let i in this.props.behaviors) {
      const behavior = this.props.behaviors[i];
      behavior.initialize(this.eventsStream, this.mapController);
    }
  }
  initMapController = (mapController: MapController) => {
    mapController.subscribeSetCenter(this.handleSetCenter);
    mapController.subscribeSetZoom(this.handleSetZoom);
  };
  handleSetCenter = (center: ILatLng) => {
    this.props.mapProvider.setCenter(center);
  };
  handleSetZoom = (zoomLevel: Number) => {
    this.props.mapProvider.setZoom(zoomLevel);
  };
  handleMouseEvent = (reactEvent) => {
    const nativeEvent = reactEvent.nativeEvent;
    this.eventsStream.next(nativeEvent);
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
          onClick={this.handleMouseEvent}
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
