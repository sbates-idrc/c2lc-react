// @flow

function degrees2radians(degrees: number): number {
    return degrees * Math.PI / 180;
}

function wrap(start: number, stop: number, val: number): number {
    return val - (Math.floor((val - start) / (stop - start)) * (stop - start));
}

export { degrees2radians, wrap };
