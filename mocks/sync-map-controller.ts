import { EventEmitter2 as EventEmitter } from 'eventemitter2';

const CENTER_CHANGED = 'CENTER_CHANGED';
const ZOOMLEVEL_CHANGED = 'ZOOMLEVEL_CHANGED';
const DIMENSION_CHANGED = 'DIMENSION_CHANGED';

import {
  Interfaces,
} from '../src';

export default class MapController {
  eventEmitter: any;
  latLngToPoint: any;
  pointToLatLng: any;
  getCenter: any;
  constructor() {
    this.eventEmitter = new EventEmitter();
  }
  setPointToLatLng(func) {
    this.pointToLatLng = func;
  }
  setLatLngToPoint(func) {
    this.latLngToPoint = func;
  }
  setGetCenter(func) {
    this.getCenter = func;
  }
  subscribeCenterChanged(func) {
    this.eventEmitter.on(CENTER_CHANGED, func);
  }
  unsubscribeCenterChanged(func) {
    this.eventEmitter.off(CENTER_CHANGED, func);
  }
  subscribeZoomLevelChanged(func) {
    this.eventEmitter.on(ZOOMLEVEL_CHANGED, func);
  }
  unsubscribeZoomLevelChanged(func) {
    this.eventEmitter.off(ZOOMLEVEL_CHANGED, func);
  }
  subscribeDimensionChanged(func) {
    this.eventEmitter.on(DIMENSION_CHANGED, func);
  }
  unsubscribeDimensionChanged(func) {
    this.eventEmitter.off(DIMENSION_CHANGED, func);
  }

  setCenter(center: Interfaces.ILatLng) {
    this.eventEmitter.emit(CENTER_CHANGED, center);
  }
  setZoomLevel(zoomLevel: Number) {
    this.eventEmitter.emit(ZOOMLEVEL_CHANGED, zoomLevel);
  }
  setDimensions(dimension: Interfaces.IDimension) {
    this.eventEmitter.emit(DIMENSION_CHANGED, dimension);
  }

}
