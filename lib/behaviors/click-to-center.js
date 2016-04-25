"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClickToCenter = function () {
    function ClickToCenter() {
        _classCallCheck(this, ClickToCenter);
    }

    _createClass(ClickToCenter, [{
        key: "initialize",
        value: function initialize(eventsStream, controller) {
            var clickStream = eventsStream.filter(function (event) {
                return event.type === 'click';
            });
            clickStream.subscribe(function (event) {
                var left = event.offsetX;
                var top = event.offsetY;
                var newCenter = controller.pointToLatLng({ left: left, top: top });
                controller.setCenter(newCenter);
            });
        }
    }]);

    return ClickToCenter;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClickToCenter;