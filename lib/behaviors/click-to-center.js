"use strict";
class ClickToCenter {
    constructor() {
    }
    initialize(eventsStream, controller) {
        const clickStream = eventsStream.filter((event) => {
            return event.type === 'click';
        });
        clickStream.subscribe((event) => {
            const x = event.offsetX;
            const y = event.offsetY;
            const newCenter = controller.pointToLatLng({ x: x, y: y });
            controller.setCenter(newCenter);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClickToCenter;
