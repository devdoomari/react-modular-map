import * as React from 'react';
import BaseMapProvider from './types/base-map-provider';
export { BaseMapProvider };
import { ILatLng, IBehavior } from './interfaces';
import MapController from './map-controller';
export interface ReactMapProps {
    mapProvider: BaseMapProvider;
    style: any;
    width: Number;
    height: Number;
    behaviors: Array<IBehavior>;
}
export interface ReactMapState {
}
export default class ReactMap extends React.Component<ReactMapProps, ReactMapState> {
    eventsStream: any;
    refs: any;
    mapController: MapController;
    constructor(props: any);
    initMapController: (mapController: MapController) => void;
    handleSetCenter: (center: ILatLng) => void;
    handleSetZoom: (zoomLevel: Number) => void;
    handleMouseEvent: (reactEvent: any) => void;
    componentDidMount: () => void;
    render(): JSX.Element;
}
