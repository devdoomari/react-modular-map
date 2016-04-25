import * as Rx from 'rxjs';

import {
  IBehavior,
} from '../interfaces';
import MapController from '../map-controller';


export default class ClickToCenter implements IBehavior {
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
    const clickStream = mouseDownStream.flatMap((mouseDown) => {
      return mouseUpStream.timeoutWith(100, Rx.Observable.empty());
    });
    clickStream.subscribe((event) => {
      const left = event.offsetX;
      const top = event.offsetY;
      const newCenter = controller.pointToLatLng({left, top});
      controller.setCenter(newCenter);
    });
  }
}
