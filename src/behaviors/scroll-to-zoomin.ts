import * as Rx from 'rxjs';

import {
  IBehavior,
} from '../interfaces';
import MapController from '../map-controller';


export default class ScrollToZoomIn implements IBehavior {
  constructor() {
  }
  initialize(eventsStream: Rx.Subject<any>, controller: MapController) {
    const mouseWheelStream = eventsStream.filter(
      event => event.type === 'wheel'
    ).throttleTime(600);

    mouseWheelStream.subscribe((event) => {
      const left = event.offsetX;
      const top = event.offsetY;
      const cursorAt = controller.pointToLatLng({left, top});
      const center = controller.getCenter();
      const newCenter = {
        lat: (cursorAt.lat * 0.3) + (center.lat * 0.7),
        lng: (cursorAt.lng * 0.3) + (center.lng * 0.7),
      };
      controller.setCenter(newCenter);
      let zoom = controller.getZoomLevel();
      if (event.deltaY > 0) {
        zoom = zoom + 1;
      }
      else if (event.deltaY < 0) {
        zoom = zoom - 1;
      }
      controller.setZoomLevel(zoom);
    });
  }
}
