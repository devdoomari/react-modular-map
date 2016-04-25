import * as React from 'react';
import * as Rx from 'rxjs';
import * as _ from 'lodash';

import {
  autobind,
} from 'core-decorators';

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

  initialCenter: ILatLng;
  initialZoomLevel: Number;

  onCenterChanged(center): any;
  onZoomLevelChanged(zoomLevel): any;
}
export interface ReactMapState {
  center: ILatLng;
  zoomLevel: Number;
  providerInitialized: Boolean;
}

@autobind
export default class ReactMap extends React.Component<ReactMapProps, any> {
  eventsStream: any;
  refs: any;
  mapController: MapController;

  static defaultProps = {
    onCenterChanged() {},
    onZoomLevelChanged() {},
  }
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
      center: this.props.initialCenter,
      zoomLevel: this.props.initialZoomLevel,
      providerInitialized: false,
    };
  }
  initMapController = (mapController: MapController) => {
    mapController.subscribeSetCenter(this.handleSetCenter);
    mapController.subscribeSetZoom(this.handleSetZoom);
  };

  componentDidMount = async () => {
    const mapDiv = this.refs.mapDiv;
    await this.props.mapProvider.initialize(mapDiv, {
      center: this.props.initialCenter,
      dimension: {
        width: this.props.style.width,
        height: this.props.style.height,
      },
    });
    this.props.mapProvider.onCenterChanged(this.handleCenterChanged);
    this.props.mapProvider.onZoomLevelChanged(this.handleZoomLevelChanged);
    this.setState({providerInitialized: true});
  };

  handleCenterChanged = (center: ILatLng) => {
    this.setState({center});
    this.props.onCenterChanged(center);
  }
  handleZoomLevelChanged = (zoomLevel: Number) => {
    this.props.onZoomLevelChanged(zoomLevel);
    this.setState({zoomLevel});
  }

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

  processChildren = (children) => {
    if (!this.state.providerInitialized) {
      return null;
    }
    return React.Children.map(this.props.children, (child: React.ReactElement<any>)=> {
      const newChild = React.cloneElement(child,
        Object.assign({}, child.props, {
          pointToLatLng: this.props.mapProvider.pointToLatLng,
          latLngToPoint: this.props.mapProvider.latLngToPoint,
          width: this.props.style.width,
          height: this.props.style.height,
          center: this.state.center,
          zoomLevel: this.state.zoomLevel,
        }), child.props.children
      );
      return (
        <div style={{
          position: 'absolute',
          left: 0, top: 0,
        }}
        >
          {newChild}
        </div>
      );
    });
  }
  render() {
    const children = this.processChildren(this.props.children);
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
              position: 'relative',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}
