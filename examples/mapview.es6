import ReactDOM from 'react-dom';
import React, {
  Component
} from 'react';
import {
  Row, Col,
  Button,
  Input,
} from 'react-bootstrap';
import _ from 'lodash';

import SyncMockMapProvider from '../__tmp__/mocks/sync-map-provider';
import {
  Map,
} from '../__tmp__/src';
import {
  APIKEY,
} from './config';

class MapViewDemo extends Component {
  constructor(props) {
    super(props);
    this.syncMockMapProvider = new SyncMockMapProvider();
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <Map
          mapProvider={this.syncMockMapProvider}
          style={{
            width: 800, height: 600,
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <MapViewDemo/>,
  document.getElementById('app')
);
