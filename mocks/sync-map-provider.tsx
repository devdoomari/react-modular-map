/*
Synchronous-map provider

 - setCenter()
      => pointToLatLng, latLngToPoint are updated immediately.
*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EventEmitter2 as EventEmitter } from 'eventemitter2';
import SyncMapView from './sync-map-view';

import {
  BaseMapProvider,
  Interfaces,
} from '../src';

import MapController from './map_controller';

export default class SyncMapProvider extends BaseMapProvider {
  height: Number;
  width: Number;
  center: Interfaces.ILatLng;
  zoomLevel: Number;
  domNode: HTMLElement;
  mapController: MapController;

  constructor(options: any) {
    super(options);
    this.mapController = new MapController();
  }
  initialize(domNode: HTMLElement, options: any) {
    this.domNode = domNode;
    ReactDOM.render(
      <SyncMapView controller={this.mapController}/>
    , this.domNode);
    this.initDefer.resolve();
  }
  setDimensions(dimension: Interfaces.IDimension) {
    this.width = dimension.width;
    this.height = dimension.height;
    this.mapController.setDimensions(dimension);
  }
  __setCenter(center: Interfaces.ILatLng) {
    this.center = center;
    this.mapController.setCenter(center);
  }
  __setZoom(zoomLevel: Number) {
    this.zoomLevel = zoomLevel;
    this.mapController.setZoomLevel(zoomLevel);
  }
  onBoundsChanged(handler: Interfaces.IBoundsChangedHandler) {

  }
  onZoomChanged(handler: Interfaces.IZoomLevelChangedHandler) {

  }
  onCenterChanged(handler: Interfaces.ICenterChangedHandler) {

  }
  pointToLatLng(point: Interfaces.IPoint): Interfaces.ILatLng {
    return {
      lat: 1,
      lng: 2,
    };
  }
  latLngToPoint(latlng: Interfaces.ILatLng): Interfaces.IPoint {
    return {
      x: 1,
      y: 1,
    }
  }


}
