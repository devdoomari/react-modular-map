"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;

var Bounds = function Bounds(p) {
    _classCallCheck(this, Bounds);

    this.minLat = p.minLat;
    this.maxLat = p.maxLat;
    this.minLng = p.minLng;
    this.maxLng = p.maxLng;
};

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Bounds;