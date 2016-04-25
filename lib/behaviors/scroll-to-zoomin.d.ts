import * as Rx from 'rxjs';
import { IBehavior } from '../interfaces';
import MapController from '../map-controller';
export default class ScrollToZoomIn implements IBehavior {
    constructor();
    initialize(eventsStream: Rx.Subject<any>, controller: MapController): void;
}
