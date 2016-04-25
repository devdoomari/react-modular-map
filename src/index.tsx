// http://stackoverflow.com/questions/30712638/typescript-export-imported-interface
export { default as MapBounds} from './types/bounds';
export { default as BaseMapProvider } from './types/base-map-provider';
export { default as ControlledMap } from './controlled-map';
export { default as Map } from './map';

import * as Interfaces from './interfaces';
export { Interfaces };

import * as Behaviors from './behaviors';
export { Behaviors };
