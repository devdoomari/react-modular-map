"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Rx = require('rxjs');
var base_map_provider_1 = require('./types/base-map-provider');
exports.BaseMapProvider = base_map_provider_1.default;
var map_controller_1 = require('./map-controller');

var ReactMap = function (_React$Component) {
    _inherits(ReactMap, _React$Component);

    function ReactMap(props) {
        _classCallCheck(this, ReactMap);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactMap).call(this, props));

        _this.initMapController = function (mapController) {
            mapController.subscribeSetCenter(_this.handleSetCenter);
            mapController.subscribeSetZoom(_this.handleSetZoom);
        };
        _this.handleSetCenter = function (center) {
            _this.props.mapProvider.setCenter(center);
        };
        _this.handleSetZoom = function (zoomLevel) {
            _this.props.mapProvider.setZoom(zoomLevel);
        };
        _this.handleMouseEvent = function (reactEvent) {
            var nativeEvent = reactEvent.nativeEvent;
            _this.eventsStream.next(nativeEvent);
        };
        _this.componentDidMount = function () {
            var map = _this.refs.mapDiv;
            _this.props.mapProvider.initialize(map, null);
            _this.props.mapProvider.setDimensions({
                width: _this.props.style.width,
                height: _this.props.style.height
            });
        };
        _this.eventsStream = new Rx.Subject();
        _this.mapController = new map_controller_1.default({
            pointToLatLng: _this.props.mapProvider.pointToLatLng,
            latLngToPoint: _this.props.mapProvider.latLngToPoint,
            getCenter: _this.props.mapProvider.getCenter,
            getZoomLevel: _this.props.mapProvider.getZoomLevel
        });
        _this.initMapController(_this.mapController);
        for (var i in _this.props.behaviors) {
            var behavior = _this.props.behaviors[i];
            behavior.initialize(_this.eventsStream, _this.mapController);
        }
        return _this;
    }

    _createClass(ReactMap, [{
        key: 'render',
        value: function render() {
            return React.createElement("div", null, React.createElement("div", { ref: "mapDiv", key: "map", style: {
                    width: this.props.style.width,
                    height: this.props.style.height,
                    zIndex: -30,
                    position: 'absolute'
                } }), React.createElement("div", { key: "eventCatcher", onMouseDown: this.handleMouseEvent, onMouseUp: this.handleMouseEvent, onMouseMove: this.handleMouseEvent, onDragStart: this.handleMouseEvent, onDragEnd: this.handleMouseEvent, onClick: this.handleMouseEvent, style: {
                    width: this.props.style.width,
                    height: this.props.style.height,
                    position: 'absolute'
                } }));
        }
    }]);

    return ReactMap;
}(React.Component);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReactMap;