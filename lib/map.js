"use strict";
const React = require('react');
const Rx = require('rxjs');
const base_map_provider_1 = require('./types/base-map-provider');
exports.BaseMapProvider = base_map_provider_1.default;
const map_controller_1 = require('./map-controller');
class ReactMap extends React.Component {
    constructor(props) {
        super(props);
        this.initMapController = (mapController) => {
            mapController.subscribeSetCenter(this.handleSetCenter);
            mapController.subscribeSetZoom(this.handleSetZoom);
        };
        this.handleSetCenter = (center) => {
            this.props.mapProvider.setCenter(center);
        };
        this.handleSetZoom = (zoomLevel) => {
            this.props.mapProvider.setZoom(zoomLevel);
        };
        this.handleMouseEvent = (reactEvent) => {
            const nativeEvent = reactEvent.nativeEvent;
            this.eventsStream.next(nativeEvent);
        };
        this.componentDidMount = () => {
            const map = this.refs.mapDiv;
            this.props.mapProvider.initialize(map, null);
            this.props.mapProvider.setDimensions({
                width: this.props.style.width,
                height: this.props.style.height,
            });
        };
        this.eventsStream = new Rx.Subject();
        this.mapController = new map_controller_1.default({
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
    }
    render() {
        return (React.createElement("div", null, React.createElement("div", {ref: "mapDiv", key: "map", style: {
            width: this.props.style.width,
            height: this.props.style.height,
            zIndex: -30,
            position: 'absolute',
        }}), React.createElement("div", {key: "eventCatcher", onMouseDown: this.handleMouseEvent, onMouseUp: this.handleMouseEvent, onMouseMove: this.handleMouseEvent, onDragStart: this.handleMouseEvent, onDragEnd: this.handleMouseEvent, onClick: this.handleMouseEvent, style: {
            width: this.props.style.width,
            height: this.props.style.height,
            position: 'absolute',
        }})));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReactMap;
