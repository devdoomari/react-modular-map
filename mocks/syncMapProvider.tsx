/*
Synchronous-map provider

 - setCenter()
      => pointToLatLng, latLngToPoint are updated immediately.
*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  BaseMapProvider,
  Interfaces,
} from '../src';

interface ISyncMapViewProps = {
  center: Interfaces.ILatLng;
}
class SyncMapView extends React.Component<any, any> {

}

export class SyncMapProvider extends BaseMapProvider {
  constructor(options: any) {
    super(options);
  }
  initialize(domNode: HTMLElement, options: any) {

  }
  __setCenter(center: Interfaces.ILatLng) {

  }
  __setZoom(zoomLevel: Number) {

  }
  onBoundsChanged(handler: IBoundsChangedHandler) {

  }
  onZoomChanged(handler: IZoomLevelChangedHandler) {

  }
  onCenterChanged(handler: ICenterChangedHandler) {

  }
  pointToLatLng(point: Interfaces.IPoint): Interfaces.ILatLng {

  }
  latLngToPoint(latlng: Interfaces.ILatLng): Interfaces.IPoint {

  }


}
