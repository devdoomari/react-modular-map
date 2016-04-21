import * as React from 'react';
import * as _ from 'lodash';
import {
  autobind,
} from 'core-decorators';

import {
  Table,
} from 'react-bootstrap';

import MapController from './map_controller';
import {
  Interfaces,
} from '../src';

import MapCalculator from './map-calculator';

export interface ISyncMapViewProps {
  controller: MapController;
}
export interface ISyncMapViewState {
  center: Interfaces.ILatLng;
  zoomLevel: Number;
}


export default class SyncMapView extends React.Component<any, any> {
  eventEmitter: any;
  mapCalculator: MapCalculator;
  constructor(props) {
    super(props);
    this.props.controller.pointToLatLng = this.pointToLatLng;
    this.props.controller.latLngToPoint = this.latLngToPoint;
    this.props.controller.getCenter = this.getCenter;
    this.state = {
      center: {
        lat: 0, lng: 0,
      },
      minLat: -7,
      maxLat: 7,
      minLng: -5,
      maxLng: 5,
      width: 100,
      height: 100,
      zoomLevel: 1,
    };
    const unitLat = this.__getUnitLatToPixels();
    const unitLng = this.__getUnitLongToPixels();
    const mapCalculatorArgs = Object.assign({}, this.state, {
      unitLat, unitLng,
    });
    this.mapCalculator = new MapCalculator(mapCalculatorArgs);
  }
  componentDidMount() {
    this.props.controller.subscribeCenterChanged(this.handleSetCenter);
    this.props.controller.subscribeDimensionChanged(this.handleSetDimension);
  }
  componentWillUnmount() {
    this.props.controller.unsubscribeCenterChanged(this.handleSetCenter);
  }
  @autobind
  latLngToPoint(latlng: Interfaces.ILatLng): Interfaces.IPoint {
    const pointOnView = this.mapCalculator.latLngToPointOnView(latlng);
    return {
      left: pointOnView.leftOnView, top: pointOnView.topOnView,
    };
  }
  @autobind
  pointToLatLng(point: Interfaces.IPoint): Interfaces.ILatLng {
    const latlng = this.mapCalculator.pointOnViewToLatLng({
      leftOnView: point.left, topOnView: point.top,
    });
    return latlng;
  }
  @autobind
  handleSetCenter (center: Interfaces.ILatLng) {
    this.setState({center});
  }
  @autobind
  handleSetDimension(dimension: Interfaces.IDimension) {
    this.setState({
      width: dimension.width,
      height: dimension.height,
    });
  }
  @autobind
  getZoomLevel(): Number {
    return this.state.zoomLevel;
  }
  @autobind
  getCenter(): Interfaces.ILatLng {
    return this.state.center;
  }
  @autobind
  __getUnitLongToPixels() {
    // width of a table cell.
    return 100 / (this.state.zoomLevel);
  }
  @autobind
  __getUnitLatToPixels() {
    // height of a table cell.
    return 50 / (this.state.zoomLevel);
  }
  render() {
    const unitLat = this.__getUnitLatToPixels();
    const unitLng = this.__getUnitLongToPixels();
    const args = Object.assign({}, this.state, {
      unitLat, unitLng,
    });
    this.mapCalculator = new MapCalculator(args);
    const xRange = _.range(this.state.minLng, this.state.maxLng);
    const yRange = _.range(this.state.minLat, this.state.maxLat);

    const viewOffsetFromMap = this.mapCalculator.getViewOffsetOnMap();
    const left = -(viewOffsetFromMap.leftFromMinLng);
    const top = -(viewOffsetFromMap.topFromMinLat);
    const gridTable = (
      <div>
        {_.map(yRange, (y) => {
          return (
            <div key={y}>
              {_.map(xRange, (x) => {
                return (
                  <div
                    key={`${x}:${y}`}
                    style={{
                      width: unitLng,
                      height: unitLat,
                      float: 'left',
                      border: '2px solid black',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }}
                  >
                    <span> {`(${x}:${y})`} </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
    return (
      <div
        style={{width: this.state.width,
                height: this.state.height,
                overflow: 'hidden',
                position: 'relative',
              }}
      >
        <div
          style={{
            position: 'absolute',
            top,
            left,
            width: (this.state.maxLng - this.state.minLng) * unitLng * 2,
            height: (this.state.maxLat - this.state.minLat) * unitLat * 2,
          }}
        >
          {gridTable}
        </div>
      </div>
    );
  }
}
