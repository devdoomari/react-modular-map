/// <reference path="../../node_modules/rxjs/Rx.d.ts" />
import * as Rx from 'rxjs';
import { IBehavior } from '../interfaces';
import MapController from '../map-controller';
export default class ClickToCenter implements IBehavior {
    constructor();
    initialize(eventsStream: Rx.Subject<any>, controller: MapController): void;
}
