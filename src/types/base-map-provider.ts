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
    /*
    initialize 3rd-party map api here.
     */
    this.initDefer = Q.defer<any>();
    this.initPromise = this.initDefer.promise;
  }
  abstract async initialize(domNode: HTMLElement, options: IMapInitArgs);
  abstract setDimensions(dimension: Interfaces.IDimension): any;
  protected abstract __setCenter(center: Interfaces.ILatLng): any;
  protected abstract __setZoom(zoomLevel: Number): any;
  abstract __onBoundsChanged(handler: IBoundsChangedHandler): any;
  abstract __onZoomLevelChanged(handler: IZoomLevelChangedHandler): any;
  abstract __onCenterChanged(handler: ICenterChangedHandler): any;

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

  async onBoundsChanged(handler: IBoundsChangedHandler) {
    await this.initPromise;
    this.__onBoundsChanged(handler);
  }

  async onCenterChanged(handler: ICenterChangedHandler) {
    await this.initPromise;
    this.__onCenterChanged(handler);
  }

  async onZoomLevelChanged(handler: IZoomLevelChangedHandler) {
    await this.initPromise;
    this.__onZoomLevelChanged(handler);
  }
}

export default BaseMapProvider;
