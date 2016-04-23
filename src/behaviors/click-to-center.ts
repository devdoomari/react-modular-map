import * as Rx from 'rxjs';

import {
  IBehavior,
} from '../interfaces';
import MapController from '../map-controller';


export default class ClickToCenter implements IBehavior {
  constructor() {
  }
  initialize(eventsStream: Rx.Subject<any>, controller: MapController) {
    const clickStream = eventsStream.filter((event) => {
      return event.type === 'click';
    });
    clickStream.subscribe((event) => {
      const left = event.offsetX;
      const top = event.offsetY;
      const newCenter = controller.pointToLatLng({left, top});
      controller.setCenter(newCenter);
    });
  }
}
