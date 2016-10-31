import ReactDOM from 'react-dom';
import React, {
  Component,
} from 'react';
import {
  Row, Col,
} from 'react-bootstrap';
import _ from 'lodash';

import MockMapProvider from 'react-map-mock';
import {
  Map,
  Behaviors,
} from '../src';

import Marker from './marker';

class MapViewDemo extends Component {
  constructor(props) {
    super(props);
    this.mockMapProvider = new MockMapProvider();
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <h1> Map View Test! </h1>
        <Row>
          <Col md={1} sm={1} />
          <Col md={8} sm={8} >
            <div
              style={{
                width: 600, height: 500,
                border: '5px dotted black',
              }}
            >
              <Map
                mapProvider={this.mockMapProvider}
                style={{
                  width: 600, height: 500,
                }}
                behaviors={[
                  new Behaviors.ClickToCenter(),
                  new Behaviors.DragToMoveAround(),
                  new Behaviors.ScrollToZoomIn(),
                ]}
                initialCenter={{ lat: 0, lng: 0 }}
              >
                <Marker position={{ lat: 0, lng: 0 }} />
                <Marker position={{ lat: 1, lng: 0 }} />
                <Marker position={{ lat: 0, lng: 1 }} />
                <Marker position={{ lat: 1, lng: 1 }} />
                <Marker position={{ lat: -1, lng: 0 }} />
                <Marker position={{ lat: 0, lng: -1 }} />
                <Marker position={{ lat: -1, lng: 0 }} />
              </Map>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

ReactDOM.render(
  <MapViewDemo />,
  document.getElementById('app')
);
