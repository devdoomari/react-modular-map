"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var React = require('react');
var Rx = require('rxjs');
var core_decorators_1 = require('core-decorators');
var base_map_provider_1 = require('./types/base-map-provider');
exports.BaseMapProvider = base_map_provider_1.default;
var map_controller_1 = require('./map-controller');
var ReactMap = function (_React$Component) {
    _inherits(ReactMap, _React$Component);

    function ReactMap(props) {
        _classCallCheck(this, ReactMap);

        var _this = _possibleConstructorReturn(this, (ReactMap.__proto__ || Object.getPrototypeOf(ReactMap)).call(this, props));

        _this.initMapController = function (mapController) {
            mapController.subscribeSetCenter(_this.handleSetCenter);
            mapController.subscribeSetZoom(_this.handleSetZoom);
        };
        _this.componentDidMount = function () {
            return __awaiter(_this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
                var mapDiv;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                mapDiv = this.refs.mapDiv;
                                _context.next = 3;
                                return this.props.mapProvider.initialize(mapDiv, {
                                    center: this.props.initialCenter,
                                    dimension: {
                                        width: this.props.style.width,
                                        height: this.props.style.height
                                    }
                                });

                            case 3:
                                this.props.mapProvider.onCenterChanged(this.handleCenterChanged);
                                this.props.mapProvider.onZoomLevelChanged(this.handleZoomLevelChanged);
                                this.setState({ providerInitialized: true });

                            case 6:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        };
        _this.handleCenterChanged = function (center) {
            _this.setState({ center: center });
            _this.props.onCenterChanged(center);
        };
        _this.handleZoomLevelChanged = function (zoomLevel) {
            _this.props.onZoomLevelChanged(zoomLevel);
            _this.setState({ zoomLevel: zoomLevel });
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
        _this.processChildren = function (children) {
            if (!_this.state.providerInitialized) {
                return null;
            }
            return React.Children.map(_this.props.children, function (child, nth) {
                var newChild = React.cloneElement(child, Object.assign({}, child.props, {
                    pointToLatLng: _this.props.mapProvider.pointToLatLng,
                    latLngToPoint: _this.props.mapProvider.latLngToPoint,
                    width: _this.props.style.width,
                    height: _this.props.style.height,
                    center: _this.state.center,
                    zoomLevel: _this.state.zoomLevel
                }), child.props.children);
                return React.createElement("div", { key: nth, style: {
                        position: 'absolute',
                        left: 0, top: 0
                    } }, newChild);
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
        _this.state = {
            center: _this.props.initialCenter,
            zoomLevel: _this.props.initialZoomLevel,
            providerInitialized: false
        };
        return _this;
    }

    _createClass(ReactMap, [{
        key: "render",
        value: function render() {
            var children = this.processChildren(this.props.children);
            return React.createElement("div", null, React.createElement("div", { ref: "mapDiv", key: "map", style: {
                    width: this.props.style.width,
                    height: this.props.style.height,
                    zIndex: -30,
                    position: 'absolute'
                } }), React.createElement("div", { key: "eventCatcher", onMouseDown: this.handleMouseEvent, onMouseUp: this.handleMouseEvent, onMouseMove: this.handleMouseEvent, onDragStart: this.handleMouseEvent, onDragEnd: this.handleMouseEvent, onClick: this.handleMouseEvent, onWheel: this.handleMouseEvent, style: {
                    width: this.props.style.width,
                    height: this.props.style.height,
                    position: 'absolute'
                } }, React.createElement("div", { key: "overlaysHolder", style: {
                    width: this.props.style.width,
                    height: this.props.style.height,
                    position: 'relative'
                } }, children)));
        }
    }]);

    return ReactMap;
}(React.Component);
ReactMap.defaultProps = {
    onCenterChanged: function onCenterChanged() {},
    onZoomLevelChanged: function onZoomLevelChanged() {}
};
ReactMap = __decorate([core_decorators_1.autobind, __metadata('design:paramtypes', [Object])], ReactMap);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReactMap;