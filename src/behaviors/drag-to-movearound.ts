import * as Rx from 'rxjs';

import {
  IBehavior,
} from '../interfaces';
import MapController from '../map-controller';

export default class DragToMoveAround implements IBehavior {
  constructor() {

  }
  initialize(eventsStream: Rx.Subject<any>, controller: MapController) {
    const mouseDownStream = eventsStream.filter(
      event => event.type === 'mousedown'
    );
    const mouseUpStream = eventsStream.filter(
      event => event.type === 'mouseup'
    );
    const mouseMoveStream = eventsStream.filter(
      event => event.type === 'mousemove'
    );

    mouseDownStream.subscribe(() => {
      const mousePositions: Array<any> = [];
      mouseMoveStream
        .takeUntil(mouseUpStream)
        .map((event) => {
          const left = event.offsetX;
          const top = event.offsetY;
          return {left, top};
        })
        // TODO: Throttle by onCenterChanged.
        .scan((positions, pos) => {
          positions.push(pos);
          return positions;
        }, mousePositions)
        .subscribe((positions) => {
          if (positions.length < 2) { return; }
          const toPos = positions[positions.length - 1];
          const fromPos = positions[positions.length - 2];
          const posDelta = {
            left: fromPos.left - toPos.left,
            top: fromPos.top - toPos.top,
          };
          const centerPoint = controller.latLngToPoint(
            controller.getCenter()
          );
          const newCenterPoint = {
            left: posDelta.left + centerPoint.left,
            top: posDelta.top + centerPoint.top,
          };
          const newCenter = controller.pointToLatLng(
            newCenterPoint
          );
          controller.setCenter(newCenter);
        });

    });
  }
}
