"use strict";
const eventemitter2_1 = require('eventemitter2');
const SET_CENTER = 'SET_CENTER';
const SET_ZOOMLEVEL = 'SET_ZOOMLEVEL';
class MapController {
    constructor(args) {
        this.eventEmitter = new eventemitter2_1.EventEmitter2();
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
    setCenter(center) {
        this.eventEmitter.emit(SET_CENTER, center);
    }
    setZoom(zoomLevel) {
        this.eventEmitter.emit(SET_ZOOMLEVEL, zoomLevel);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MapController;
