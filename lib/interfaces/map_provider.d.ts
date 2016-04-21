import Bounds from '../types/bounds';
import { ILatLng } from './latlng';
import { IPoint } from './point';
export interface IBoundsChangedHandler {
    (bounds: Bounds): any;
}
export interface IZoomLevelChangedHandler {
    (zoomLevel: Number): any;
}
export interface ICenterChangedHandler {
    (center: ILatLng): any;
}
export interface IMapProvider {
    setCenter(latlng: ILatLng): void;
    setZoom(zoomLevel: Number): void;
    pointToLatLng(p: IPoint): void;
    onBoundsChanged(handler: IBoundsChangedHandler): void;
    onZoomChanged(handler: IZoomLevelChangedHandler): void;
    onCenterChanged(handler: ICenterChangedHandler): void;
}
