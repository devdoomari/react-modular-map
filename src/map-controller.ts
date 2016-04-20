import { EventEmitter2 as EventEmitter } from 'eventemitter2';

const SET_CENTER = 'SET_CENTER';
const SET_ZOOMLEVEL = 'SET_ZOOMLEVEL';

import {
  ILatLng, IPoint,
} from './interfaces';

export interface IMapControllerArgs {
  pointToLatLng: any;
  latLngToPoint: any;
}
export default class MapController {
  eventEmitter: any;
  _pointToLatLng: any;
  _latLngToPoint: any;
  constructor(args: IMapControllerArgs) {
    this.eventEmitter = new EventEmitter();
    this._pointToLatLng = args.pointToLatLng;
    this._latLngToPoint = args.latLngToPoint;
  }
  subscribeSetCenter(func) {
    this.eventEmitter.on(SET_CENTER, func);
  }
  subscribeSetZoom(func) {
    this.eventEmitter.on(SET_ZOOMLEVEL, func);
  }
  setCenter(center: ILatLng) {
    this.eventEmitter.emit(SET_CENTER, center);
  }
  setZoom(zoomLevel: Number) {
    this.eventEmitter.emit(SET_ZOOMLEVEL, zoomLevel);
  }
  pointToLatLng(point: IPoint) {
    return this._pointToLatLng(point);
  }
  latLngToPoint(latlng: ILatLng) {
    return this._latLngToPoint(latlng);
  }
}
