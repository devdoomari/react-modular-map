import * as Interfaces from '../interfaces';
import { IBoundsChangedHandler, ICenterChangedHandler, IZoomLevelChangedHandler, IMapProvider, IMapInitArgs } from '../interfaces/map_provider';
declare abstract class BaseMapProvider implements IMapProvider {
    initDefer: any;
    initPromise: any;
    constructor(options: any);
    abstract initialize(domNode: HTMLElement, options: IMapInitArgs): any;
    abstract setDimensions(dimension: Interfaces.IDimension): any;
    protected abstract __setCenter(center: Interfaces.ILatLng): void;
    protected abstract __setZoom(zoomLevel: Number): void;
    abstract onBoundsChanged(handler: IBoundsChangedHandler): any;
    abstract onZoomChanged(handler: IZoomLevelChangedHandler): any;
    abstract onCenterChanged(handler: ICenterChangedHandler): any;
    abstract getCenter(): Interfaces.ILatLng;
    abstract getZoomLevel(): Number;
    abstract pointToLatLng(point: Interfaces.IPoint): Interfaces.ILatLng;
    abstract latLngToPoint(latlng: Interfaces.ILatLng): Interfaces.IPoint;
    setCenter(center: Interfaces.ILatLng): Promise<void>;
    setZoom(zoomLevel: Number): Promise<void>;
}
export default BaseMapProvider;
