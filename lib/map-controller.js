"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventemitter2_1 = require('eventemitter2');
var SET_CENTER = 'SET_CENTER';
var SET_ZOOMLEVEL = 'SET_ZOOMLEVEL';

var MapController = function () {
    function MapController(args) {
        _classCallCheck(this, MapController);

        this.eventEmitter = new eventemitter2_1.EventEmitter2();
        this.pointToLatLng = args.pointToLatLng;
        this.latLngToPoint = args.latLngToPoint;
        this.getZoomLevel = args.getZoomLevel;
        this.getCenter = args.getCenter;
    }

    _createClass(MapController, [{
        key: 'subscribeSetCenter',
        value: function subscribeSetCenter(func) {
            this.eventEmitter.on(SET_CENTER, func);
        }
    }, {
        key: 'subscribeSetZoom',
        value: function subscribeSetZoom(func) {
            this.eventEmitter.on(SET_ZOOMLEVEL, func);
        }
    }, {
        key: 'setCenter',
        value: function setCenter(center) {
            this.eventEmitter.emit(SET_CENTER, center);
        }
    }, {
        key: 'setZoom',
        value: function setZoom(zoomLevel) {
            this.eventEmitter.emit(SET_ZOOMLEVEL, zoomLevel);
        }
    }]);

    return MapController;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MapController;