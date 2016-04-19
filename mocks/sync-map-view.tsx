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
} from '../src'
export interface ISyncMapViewProps {
  controller: MapController;
}
export interface ISyncMapViewState {
  center: Interfaces.ILatLng;
  zoomLevel: Number,
}


export default class SyncMapView extends React.Component<any, any> {
  eventEmitter: any;
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    this.props.controller.subscribeCenterChanged(this.handleSetCenter);
    this.props.controller.subscribeDimensionChanged(this.handleSetDimension);
  }
  componentWillUnmount() {
    this.props.controller.unsubscribeCenterChanged()
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
  render() {
    const range = _.range(-50, 50);
    const gridTable = (
      <Table>
        <tbody>
          {_.map(range, (y) => {
            return (
              <tr key={y}>
                {_.map(range, (x) => {
                  return (
                    <td key={`${x}:${y}`}>
                      <span> {`(${x}:${y})`} </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
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
            top: 50,
            left: 50,
          }}
        >
          {gridTable}
        </div>
      </div>
    );
  }
}
