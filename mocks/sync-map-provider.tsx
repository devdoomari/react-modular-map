/*
Synchronous-map provider

 - setCenter()
      => pointToLatLng, latLngToPoint are updated immediately.
*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EventEmitter2 as EventEmitter } from 'eventemitter2';
import {
  autobind,
} from 'core-decorators';

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
  @autobind
  initialize(domNode: HTMLElement, options: any) {
    this.domNode = domNode;
    ReactDOM.render(
      <SyncMapView controller={this.mapController}/>
    , this.domNode);
    this.initDefer.resolve();
  }
  @autobind
  setDimensions(dimension: Interfaces.IDimension) {
    this.width = dimension.width;
    this.height = dimension.height;
    this.mapController.setDimensions(dimension);
  }
  @autobind
  __setCenter(center: Interfaces.ILatLng) {
    this.mapController.setCenter(center);
  }
  @autobind
  __setZoom(zoomLevel: Number) {
    this.zoomLevel = zoomLevel;
    this.mapController.setZoomLevel(zoomLevel);
  }
  @autobind
  getCenter(): Interfaces.ILatLng {
    return this.mapController.getCenter();
  }
  @autobind
  getZoomLevel() {
    return this.zoomLevel;
  }
  onBoundsChanged(handler: Interfaces.IBoundsChangedHandler) {

  }
  onZoomChanged(handler: Interfaces.IZoomLevelChangedHandler) {

  }
  onCenterChanged(handler: Interfaces.ICenterChangedHandler) {

  }
  @autobind
  pointToLatLng(point: Interfaces.IPoint): Interfaces.ILatLng {
    return this.mapController.pointToLatLng(point);
  }
  @autobind
  latLngToPoint(latlng: Interfaces.ILatLng): Interfaces.IPoint {
    return this.mapController.latLngToPoint(latlng);
  }


}
