import {
  autobind,
} from 'core-decorators';

import {
  Interfaces,
} from '../src';

export interface IOffsetFromMinLatLng {
  leftFromMinLng: Number;
  topFromMinLat: Number;
};

export interface IOffsetFromOrigin {
  leftFromOrigin: Number;
  topFromOrigin: Number;
};

export interface ILatLngFromMinLatLng {
  latFromMinLat: Number;
  lngFromMinLng: Number;
};

export interface IPointOnView {
  leftOnView: Number;
  topOnView: Number;
};

export interface MapCalculatorArgs {
  center: Interfaces.ILatLng;
  unitLng: Number;
  unitLat: Number;
  width: Number;
  height: Number;
  minLat: Number;
  maxLat: Number;
  minLng: Number;
  maxLng: Number;
};
export default class MapCalculator {
  center: Interfaces.ILatLng;
  unitLng: Number;
  unitLat: Number;
  width: Number;
  height: Number;
  minLat: Number;
  maxLat: Number;
  minLng: Number;
  maxLng: Number;
  constructor(args: MapCalculatorArgs) {
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
  @autobind
  getLatLngFromMinLatLng(latlng: Interfaces.ILatLng): ILatLngFromMinLatLng {
    const originLatLngFromMinLatLng = this.getOriginLatLngFromMinLatLng();
    return {
      latFromMinLat: Number(originLatLngFromMinLatLng.lat) + Number(latlng.lat),
      lngFromMinLng: Number(originLatLngFromMinLatLng.lng) + Number(latlng.lng),
    };
  }
  @autobind
  toLatLngFromOrigin(latlngFromMin: ILatLngFromMinLatLng): Interfaces.ILatLng {
    const originLatLngFromMinLatLng = this.getOriginLatLngFromMinLatLng();
    return {
      lat: Number(latlngFromMin.latFromMinLat) - Number(originLatLngFromMinLatLng.lat),
      lng: Number(latlngFromMin.lngFromMinLng) - Number(originLatLngFromMinLatLng.lng),
    }
  }
  @autobind
  getOriginLatLngFromMinLatLng(): Interfaces.ILatLng {
    return {
      lat: (-this.minLat) * Number(this.unitLat),
      lng: (-this.minLng) * Number(this.unitLng),
    };
  }
  @autobind
  getPointOffsetOnMap(latlng: Interfaces.ILatLng): IOffsetFromMinLatLng {
    const latlngFromMinLatLn = this.getLatLngFromMinLatLng(latlng);
    return {
      topFromMinLat: Number(latlngFromMinLatLn.latFromMinLat) * Number(this.unitLat),
      leftFromMinLng: Number(latlngFromMinLatLn.lngFromMinLng) * Number(this.unitLng),
    };
  }
  @autobind
  getPointOffsetFromOrigin(latlng: Interfaces.ILatLng): Interfaces.IPoint {
    return {
      top: Number(latlng.lat) * Number(this.unitLat),
      left: Number(latlng.lng) * Number(this.unitLng),
    };
  }
  @autobind
  getViewOffsetOnMap(): IOffsetFromMinLatLng {
    const centerPointOffsetOnMap = this.getPointOffsetOnMap(this.center);
    return {
      leftFromMinLng:
        Number(centerPointOffsetOnMap.leftFromMinLng) - (Number(this.width) / 2),
      topFromMinLat:
        Number(centerPointOffsetOnMap.topFromMinLat) - (Number(this.height) / 2),
    };
  }
  @autobind
  getOffsetFromOrigin(latlng: Interfaces.ILatLng): Interfaces.IPoint {
    return {
      top: Number(latlng.lat) * Number(this.unitLat),
      left: Number(latlng.lng) * Number(this.unitLng),
    };
  }
  @autobind
  getViewOffsetFromOrigin(): IOffsetFromOrigin {
    const centerOffsetFromOrigin = this.getOffsetFromOrigin(this.center);
    return {
      leftFromOrigin: Number(centerOffsetFromOrigin.left) - (Number(this.width) / 2),
      topFromOrigin: Number(centerOffsetFromOrigin.top) - (Number(this.height) / 2),
    }
  }
  @autobind
  pointOnViewToLatLng(pointOnView: IPointOnView): Interfaces.ILatLng {
    const viewOffsetFromOrigin = this.getViewOffsetFromOrigin();
    const pointFromOrigin = {
      left: Number(viewOffsetFromOrigin.leftFromOrigin) + Number(pointOnView.leftOnView),
      top: Number(viewOffsetFromOrigin.topFromOrigin) + Number(pointOnView.topOnView),
    };
    return {
      lat: Number(pointFromOrigin.left) / Number(this.unitLat),
      lng: Number(pointFromOrigin.top) / Number(this.unitLng),
    };
  }
  @autobind
  latLngToPointOnView(latlng: Interfaces.ILatLng): IPointOnView {
    const pointFromOrigin = this.getPointOffsetFromOrigin(latlng);
    const viewFromOrigin = this.getViewOffsetFromOrigin();
    return {
      leftOnView: Number(pointFromOrigin.left) - Number(viewFromOrigin.leftFromOrigin),
      topOnView: Number(pointFromOrigin.top) - Number(viewFromOrigin.topFromOrigin),
    };
  }
}
