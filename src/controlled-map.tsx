import * as React from 'react';
import * as Rx from 'rxjs';
import * as _ from 'lodash';

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

  // controlled input
  lat: Number;
  lng: Number;
  zoomLevel: Number;
  eventStreamSubscriber(): any;
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
    this.state = {

    };
  }
  initMapController = (mapController: MapController) => {
    mapController.subscribeSetCenter(this.handleSetCenter);
    mapController.subscribeSetZoom(this.handleSetZoom);
  };

  componentDidMount = () => {
    const mapDiv = this.refs.mapDiv;
    this.props.mapProvider.initialize(mapDiv, {
      center: {
        lat: this.props.lat,
        lng: this.props.lng,
      },
      dimension: {
        width: this.props.style.width,
        height: this.props.style.height,
      },
    });

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

  render() {
    const children = React.Children.map(this.props.children, (child: React.ReactElement<any>)=> {
      const newChild = React.cloneElement(child,
        Object.assign({}, child.props, {
          pointToLatLng: this.props.mapProvider.pointToLatLng,
          latLngToPoint: this.props.mapProvider.latLngToPoint,
        }), child.props.children
      );
      return newChild;
    });
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
        >
          <div
            key="overlaysHolder"
            style={{
              width: this.props.style.width,
              height: this.props.style.height,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}
