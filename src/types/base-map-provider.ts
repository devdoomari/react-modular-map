import * as React from 'react';

import Bounds from './bounds';
import * as Interfaces from '../interfaces';
import {
  IBoundsChangedHandler,
  ICenterChangedHandler,
  IZoomLevelChangedHandler,
  IMapProvider,
  IMapInitArgs,
} from '../interfaces/map_provider';
import * as Q from 'q';

abstract class BaseMapProvider implements IMapProvider {
  initDefer: any;
  initPromise: any;
  constructor(options: any) {
    this.initDefer = Q.defer<any>();
    this.initPromise = this.initDefer.promise;
  }
  abstract async initialize(domNode: HTMLElement, options: IMapInitArgs);
  abstract setDimensions(dimension: Interfaces.IDimension);
  protected abstract __setCenter(center: Interfaces.ILatLng): void;
  protected abstract __setZoom(zoomLevel: Number): void;
  abstract onBoundsChanged(handler: IBoundsChangedHandler);
  abstract onZoomChanged(handler: IZoomLevelChangedHandler);
  abstract onCenterChanged(handler: ICenterChangedHandler);

  abstract getCenter(): Interfaces.ILatLng;
  abstract getZoomLevel(): Number;
  abstract pointToLatLng(point: Interfaces.IPoint): Interfaces.ILatLng;
  abstract latLngToPoint(latlng: Interfaces.ILatLng): Interfaces.IPoint;
  async setCenter(center: Interfaces.ILatLng) {
    await this.initPromise;
    this.__setCenter(center);
  }

  async setZoom(zoomLevel: Number) {
    await this.initPromise;
    this.__setZoom(zoomLevel);
  }
}

export default BaseMapProvider;
