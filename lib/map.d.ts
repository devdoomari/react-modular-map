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
    initialCenter: ILatLng;
    initialZoomLevel: Number;
    onCenterChanged(center: any): any;
    onZoomLevelChanged(zoomLevel: any): any;
}
export interface ReactMapState {
    center: ILatLng;
    zoomLevel: Number;
    providerInitialized: Boolean;
}
export default class ReactMap extends React.Component<ReactMapProps, any> {
    eventsStream: any;
    refs: any;
    mapController: MapController;
    static defaultProps: {
        onCenterChanged(): void;
        onZoomLevelChanged(): void;
    };
    constructor(props: any);
    initMapController: (mapController: MapController) => void;
    componentDidMount: () => Promise<void>;
    handleCenterChanged: (center: ILatLng) => void;
    handleZoomLevelChanged: (zoomLevel: Number) => void;
    handleSetCenter: (center: ILatLng) => void;
    handleSetZoom: (zoomLevel: Number) => void;
    handleMouseEvent: (reactEvent: any) => void;
    processChildren: (children: any) => React.ReactElement<any>[];
    render(): JSX.Element;
}
