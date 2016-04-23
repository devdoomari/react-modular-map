import {
  autobind,
} from 'core-decorators';

import {
  IPoint, ILatLng,
} from '../src/interfaces';

export interface IXY {
  x: Number;
  y: Number;
}

export interface IMinOffset {
  xFromMin: Number;
  yFromMin: Number;
}

export interface IMapCalculatorArgs {
  center: ILatLng;
  unitLng: Number;
  unitLat: Number;
  width: Number;
  height: Number;
  minLat: Number;
  maxLat: Number;
  minLng: Number;
  maxLng: Number;
};

@autobind
export default class MapCalculator {
  center: ILatLng;
  unitLng: Number;
  unitLat: Number;
  width: Number;
  height: Number;
  minLat: Number;
  maxLat: Number;
  minLng: Number;
  maxLng: Number;
  constructor(args: IMapCalculatorArgs) {
    debugger;
    this.center = args.center;
    this.unitLng = args.unitLng;
    this.unitLat = args.unitLat;
    this.width = args.width;
    this.height = args.height;
    this.minLat = args.minLat;
    this.maxLat = args.maxLat;
    this.minLng = args.minLng;
    this.maxLng = args.maxLng;
  }

  latLngToXY(latlng: ILatLng): IXY {
    return {
      x: Number(latlng.lng) * Number(this.unitLng),
      y: Number(latlng.lat) * Number(this.unitLat),
    };
  }

  xyToLatLng(xy: IXY) {
    return {
      lat: Number(xy.y) / Number(this.unitLat),
      lng: Number(xy.x) / Number(this.unitLng),
    };
  }

  xyToOffsetFromMin(xy: IXY): IMinOffset {
    const offsetFromMinToOrigin = {
      x: Number(this.minLng) * Number(this.unitLng),
      y: Number(this.minLat) * Number(this.unitLat),
    };
    return {
      xFromMin: Number(xy.x) - offsetFromMinToOrigin.x,
      yFromMin: Number(xy.y) - offsetFromMinToOrigin.y,
    };
  }

  getViewEdgeXY(): IXY {
    const originToCenterXY = this.latLngToXY(this.center);
    return {
      x: Number(originToCenterXY.x) - (Number(this.width) / 2),
      y: Number(originToCenterXY.y) - (Number(this.height) / 2),
    };
  }

  getViewEdgeFromMin(): IMinOffset {
    const viewEdgeXY = this.getViewEdgeXY();
    return this.xyToOffsetFromMin(viewEdgeXY);
  }

  pointOnViewToLatLng(point: IPoint): ILatLng {
    const viewEdgeXY = this.getViewEdgeXY();
    const pointXY = {
      x: Number(viewEdgeXY.x) + Number(point.left),
      y: Number(viewEdgeXY.y) + Number(point.top),
    };
    return this.xyToLatLng(pointXY);
  }

  latlngToPointOnView(latlng: ILatLng): IPoint {
    const xy = this.latLngToXY(latlng);
    const viewEdgeXY = this.getViewEdgeXY();
    return {
      left: Number(xy.x) - Number(viewEdgeXY.x),
      top: Number(xy.y) - Number(viewEdgeXY.y),
    };
  }
}
