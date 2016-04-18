import * as React from 'react';
import BaseMapProvider from './types/baseMapProvider';

export interface ReactMapProps {
  mapProvider: BaseMapProvider;
}
export interface ReactMapState {

}
export default class ReactMap extends React.Component<ReactMapProps, ReactMapState> {
  constructor(props) {
    super(props);
  }
}
