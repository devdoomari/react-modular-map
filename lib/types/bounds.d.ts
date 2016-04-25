export interface BoundsParams {
    minLat: Number;
    maxLat: Number;
    minLng: Number;
    maxLng: Number;
}
export default class Bounds {
    minLat: Number;
    maxLat: Number;
    minLng: Number;
    maxLng: Number;
    constructor(p: BoundsParams);
}
