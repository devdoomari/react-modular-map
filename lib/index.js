"use strict";
// http://stackoverflow.com/questions/30712638/typescript-export-imported-interface
var bounds_1 = require('./types/bounds');
exports.MapBounds = bounds_1.default;
var base_map_provider_1 = require('./types/base-map-provider');
exports.BaseMapProvider = base_map_provider_1.default;
var map_1 = require('./map');
exports.Map = map_1.default;
const Interfaces = require('./interfaces');
exports.Interfaces = Interfaces;
const Behaviors = require('./behaviors');
exports.Behaviors = Behaviors;
