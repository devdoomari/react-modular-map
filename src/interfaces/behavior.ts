import * as Rx from 'rxjs';
import MapController from '../map-controller';

export interface IBehavior {
  initialize(eventStream: Rx.Subject<any>, controller: MapController);
}
