// @flow

import SpheroPacketBuilder from './SpheroPacketBuilder';

test('setHeading', () => {
    const packetBuilder = new SpheroPacketBuilder();

    expect(packetBuilder.setHeading(0)).toStrictEqual(
        new Uint8Array([
            0xFF, 0xFE, 0x02, 0x01, 0x00, 0x03,
            0x00,
            0x00,
            0xF9
        ])
    );

    expect(packetBuilder.setHeading(359)).toStrictEqual(
        new Uint8Array([
            0xFF, 0xFE, 0x02, 0x01, 0x00, 0x03,
            0x01, // 256
            103, // 359 - 256
            0x91
        ])
    );
});

test('setRgbLed', () => {
    const packetBuilder = new SpheroPacketBuilder();

    expect(packetBuilder.setRgbLed(0, 0, 0)).toStrictEqual(
        new Uint8Array([
            0xFF, 0xFE, 0x02, 0x20, 0x00, 0x05,
            0x00,
            0x00,
            0x00,
            0x00,
            0xD8
        ])
    );

    expect(packetBuilder.setRgbLed(255, 255, 255)).toStrictEqual(
        new Uint8Array([
            0xFF, 0xFE, 0x02, 0x20, 0x00, 0x05,
            0xFF,
            0xFF,
            0xFF,
            0x00,
            0xDB
        ])
    );

    expect(packetBuilder.setRgbLed(255, 0, 0)).toStrictEqual(
        new Uint8Array([
            0xFF, 0xFE, 0x02, 0x20, 0x00, 0x05,
            0xFF,
            0x00,
            0x00,
            0x00,
            0xD9
        ])
    );

    expect(packetBuilder.setRgbLed(0, 255, 0)).toStrictEqual(
        new Uint8Array([
            0xFF, 0xFE, 0x02, 0x20, 0x00, 0x05,
            0x00,
            0xFF,
            0x00,
            0x00,
            0xD9
        ])
    );

    expect(packetBuilder.setRgbLed(0, 0, 255)).toStrictEqual(
        new Uint8Array([
            0xFF, 0xFE, 0x02, 0x20, 0x00, 0x05,
            0x00,
            0x00,
            0xFF,
            0x00,
            0xD9
        ])
    );
});

test('roll', () => {
    const packetBuilder = new SpheroPacketBuilder();

    expect(packetBuilder.roll(0, 0)).toStrictEqual(
        new Uint8Array([
            0xFF, 0xFE, 0x02, 0x30, 0x00, 0x05,
            0x00,
            0x00,
            0x00,
            0x01,
            0xC7
        ])
    );

    expect(packetBuilder.roll(255, 359)).toStrictEqual(
        new Uint8Array([
            0xFF, 0xFE, 0x02, 0x30, 0x00, 0x05,
            0xFF,
            0x01, // 256
            103, // 359 - 256
            0x01,
            0x60
        ])
    );
});
