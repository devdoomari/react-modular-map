"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ReactMap = (function (_super) {
    __extends(ReactMap, _super);
    function ReactMap(props) {
        _super.call(this, props);
    }
    ReactMap.prototype.render = function () {
        return (React.createElement("div", null, this.props.mapProvider));
    };
    return ReactMap;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReactMap;
