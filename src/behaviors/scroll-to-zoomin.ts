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
    );

    mouseWheelStream.subscribe((event) => {
      const left = event.offsetX;
      const top = event.offsetY;
      const newCenter = controller.pointToLatLng({left, top});
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
