import {
  Promise,
} from 'q';

import Bounds from './bounds';

export interface BoundsChangedHandler {
  (bounds: Bounds): any;
}
export interface ZoomLevelChangedHandler {
  (zoomLevel: Number): any;
}

export default class BaseMapProvider {
  constructor() {

  }
  initialize() {

  }
  setCenter(lat: Number, lng: Number) {

  }
  setZoom(zoomLevel: Number) {

  }

  onBoundsChanged(handler: BoundsChangedHandler) {

  }
  onZoomChanged(handler: ZoomLevelChangedHandler) {

  }
  onCenterChanged() {

  }
}
