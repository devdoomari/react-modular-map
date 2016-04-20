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
export interface ISyncMapViewProps {
  controller: MapController;
}
export interface ISyncMapViewState {
  center: Interfaces.ILatLng;
  zoomLevel: Number;
}


export default class SyncMapView extends React.Component<any, any> {
  eventEmitter: any;
  constructor(props) {
    super(props);
    this.props.controller.pointToLatLng = this.pointToLatLng;
    this.props.controller.latLngToPoint = this.latLngToPoint;
    this.state = {
      center: {
        lat: 0, lng: 0,
      },
      size: 7,
      width: 100,
      height: 100,
      zoomLevel: 1,
    };
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
    const lngFromLeftmost = this.state.size + latlng.lng;
    const left = lngFromLeftmost * this.__getUnitLongToPixels();

    const latFromTopmost = this.state.size + latlng.lat;
    const top = latFromTopmost * this.__getUnitLatToPixels();
    return {
      left, top,
    };
  }
  @autobind
  pointToLatLng(point: Interfaces.IPoint) {
    const centerMapX = this.state.size * this.__getUnitLongToPixels();
    const centerMapY = this.state.size * this.__getUnitLatToPixels();

    const leftAt0 = centerMapX - (this.state.width / 2);
    const topAt0 = centerMapY - (this.state.height / 2);
    const left = leftAt0 + this.__getUnitLongToPixels() * this.state.center.lng;
    const top = topAt0 + this.__getUnitLatToPixels() * this.state.center.lat;

    const mapX = left + Number(point.left); // wtf typescript?
    const mapY = top + Number(point.top);

    const mapXToCenter = mapX - centerMapX;
    const mapYToCenter = mapY - centerMapY;

    const latlng = {
      lng: mapXToCenter / this.__getUnitLongToPixels(),
      lat: mapYToCenter / this.__getUnitLatToPixels(),
    };
    console.log(latlng);
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
    const range = _.range(-this.state.size, this.state.size);

    const centerMapX = this.state.size * this.__getUnitLongToPixels();
    const centerMapY = this.state.size * this.__getUnitLatToPixels();

    const leftAt0 = centerMapX - (this.state.width / 2);
    const topAt0 = centerMapY - (this.state.height / 2);
    const left = -(leftAt0 + this.__getUnitLongToPixels() * this.state.center.lng);
    const top = -(topAt0 + this.__getUnitLatToPixels() * this.state.center.lat);
    const gridTable = (
      <div>
        {_.map(range, (y) => {
          return (
            <div key={y}>
              {_.map(range, (x) => {
                return (
                  <div
                    key={`${x}:${y}`}
                    style={{
                      width: this.__getUnitLongToPixels(),
                      height: this.__getUnitLatToPixels(),
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
            width: this.state.size * this.__getUnitLongToPixels() * 2,
            height: this.state.size * this.__getUnitLatToPixels() * 2,
          }}
        >
          {gridTable}
        </div>
      </div>
    );
  }
}
