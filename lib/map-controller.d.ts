import { ILatLng } from './interfaces';
export interface IMapControllerArgs {
    pointToLatLng: any;
    latLngToPoint: any;
    getCenter: any;
    getZoomLevel: any;
}
export default class MapController {
    eventEmitter: any;
    pointToLatLng: any;
    latLngToPoint: any;
    getCenter: any;
    getZoomLevel: any;
    constructor(args: IMapControllerArgs);
    subscribeSetCenter(func: any): void;
    subscribeSetZoom(func: any): void;
    setCenter(center: ILatLng): void;
    setZoom(zoomLevel: Number): void;
}
