"use strict";
class DragToMoveAround {
    constructor() {
    }
    initialize(eventsStream, controller) {
        const mouseDownStream = eventsStream.filter(event => event.type === 'mousedown');
        const mouseUpStream = eventsStream.filter(event => event.type === 'mouseup');
        const mouseMoveStream = eventsStream.filter(event => event.type === 'mousemove');
        mouseDownStream.subscribe(() => {
            const mousePositions = [];
            mouseMoveStream
                .takeUntil(mouseUpStream)
                .map((event) => {
                const left = event.offsetX;
                const top = event.offsetY;
                return { left: left, top: top };
            })
                .scan((positions, pos) => {
                positions.push(pos);
                return positions;
            }, mousePositions)
                .subscribe((positions) => {
                if (positions.length < 2) {
                    return;
                }
                const toPos = positions[positions.length - 1];
                const fromPos = positions[positions.length - 2];
                const posDelta = {
                    left: toPos.left - fromPos.left,
                    top: toPos.top - fromPos.top,
                };
                const centerPoint = controller.latLngToPoint(controller.getCenter());
                debugger;
                const newCenterPoint = {
                    left: posDelta.left + centerPoint.left,
                    top: posDelta.top + centerPoint.top,
                };
                const newCenter = controller.pointToLatLng(newCenterPoint);
                controller.setCenter(newCenter);
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DragToMoveAround;
