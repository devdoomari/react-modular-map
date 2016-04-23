import { EventEmitter2 as EventEmitter } from 'eventemitter2';

const SET_CENTER = 'SET_CENTER';
const SET_ZOOMLEVEL = 'SET_ZOOMLEVEL';

import {
  ILatLng, IPoint,
} from './interfaces';

export interface IMapControllerArgs {
  pointToLatLng(point: IPoint): ILatLng;
  latLngToPoint(latlng: ILatLng): IPoint;
  getCenter(): ILatLng;
  getZoomLevel(): Number;
}
export default class MapController {
  eventEmitter: any;
  pointToLatLng: any;
  latLngToPoint: any;
  getCenter: any;
  getZoomLevel: any;
  constructor(args: IMapControllerArgs) {
    this.eventEmitter = new EventEmitter();
    this.pointToLatLng = args.pointToLatLng;
    this.latLngToPoint = args.latLngToPoint;
    this.getZoomLevel = args.getZoomLevel;
    this.getCenter = args.getCenter;
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
}
