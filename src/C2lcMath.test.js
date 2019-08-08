// @flow

import * as C2lcMath from './C2lcMath';

test('C2lcMath.wrap', () => {
    // [0, 10]

    expect(C2lcMath.wrap(0, 10, 0)).toBe(0);
    expect(C2lcMath.wrap(0, 10, 10)).toBe(0);
    expect(C2lcMath.wrap(0, 10, 8)).toBe(8);
    expect(C2lcMath.wrap(0, 10, 12)).toBe(2);
    expect(C2lcMath.wrap(0, 10, 20)).toBe(0);
    expect(C2lcMath.wrap(0, 10, 23)).toBe(3);
    expect(C2lcMath.wrap(0, 10, -2)).toBe(8);
    expect(C2lcMath.wrap(0, 10, -10)).toBe(0);
    expect(C2lcMath.wrap(0, 10, -13)).toBe(7);

    // [-20, -10]

    expect(C2lcMath.wrap(-20, -10, -20)).toBe(-20);
    expect(C2lcMath.wrap(-20, -10, -10)).toBe(-20);
    expect(C2lcMath.wrap(-20, -10, -12)).toBe(-12);
    expect(C2lcMath.wrap(-20, -10, -8)).toBe(-18);
    expect(C2lcMath.wrap(-20, -10, 0)).toBe(-20);
    expect(C2lcMath.wrap(-20, -10, 13)).toBe(-17);
    expect(C2lcMath.wrap(-20, -10, -22)).toBe(-12);
    expect(C2lcMath.wrap(-20, -10, -30)).toBe(-20);
    expect(C2lcMath.wrap(-20, -10, -33)).toBe(-13);
});
