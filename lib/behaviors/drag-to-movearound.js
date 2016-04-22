"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DragToMoveAround = function () {
    function DragToMoveAround() {
        _classCallCheck(this, DragToMoveAround);
    }

    _createClass(DragToMoveAround, [{
        key: 'initialize',
        value: function initialize(eventsStream, controller) {
            var mouseDownStream = eventsStream.filter(function (event) {
                return event.type === 'mousedown';
            });
            var mouseUpStream = eventsStream.filter(function (event) {
                return event.type === 'mouseup';
            });
            var mouseMoveStream = eventsStream.filter(function (event) {
                return event.type === 'mousemove';
            });
            mouseDownStream.subscribe(function () {
                var mousePositions = [];
                mouseMoveStream.takeUntil(mouseUpStream).map(function (event) {
                    var left = event.offsetX;
                    var top = event.offsetY;
                    return { left: left, top: top };
                }).scan(function (positions, pos) {
                    positions.push(pos);
                    return positions;
                }, mousePositions).subscribe(function (positions) {
                    if (positions.length < 2) {
                        return;
                    }
                    var toPos = positions[positions.length - 1];
                    var fromPos = positions[positions.length - 2];
                    var posDelta = {
                        left: toPos.left - fromPos.left,
                        top: toPos.top - fromPos.top
                    };
                    var centerPoint = controller.latLngToPoint(controller.getCenter());
                    debugger;
                    var newCenterPoint = {
                        left: posDelta.left + centerPoint.left,
                        top: posDelta.top + centerPoint.top
                    };
                    var newCenter = controller.pointToLatLng(newCenterPoint);
                    controller.setCenter(newCenter);
                });
            });
        }
    }]);

    return DragToMoveAround;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DragToMoveAround;