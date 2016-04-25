import Bounds from '../types/bounds';
import { ILatLng } from './latlng';
import { IPoint } from './point';
import { IDimension } from './dimension';
export interface IBoundsChangedHandler {
    (bounds: Bounds): any;
}
export interface IZoomLevelChangedHandler {
    (zoomLevel: Number): any;
}
export interface ICenterChangedHandler {
    (center: ILatLng): any;
}
export interface IMapInitArgs {
    center?: ILatLng;
    dimension?: IDimension;
}
export interface IMapProvider {
    setCenter(latlng: ILatLng): any;
    setZoom(zoomLevel: Number): any;
    pointToLatLng(p: IPoint): any;
    onBoundsChanged(handler: IBoundsChangedHandler): any;
    onZoomLevelChanged(handler: IZoomLevelChangedHandler): any;
    onCenterChanged(handler: ICenterChangedHandler): any;
}
