// @flow

type CommandOptions = {
    sop1: number,
    sop2: number,
    did: number,
    cid: number,
    seq: number,
    data: Array<number>
};

export default class SpheroPacketBuilder {
    buildCommandPacket(options: CommandOptions): Uint8Array {
        const dataLength = options.data ? options.data.length : 0;
        let packet = new Uint8Array(7 + dataLength);

        packet[0] = options.sop1;
        packet[1] = options.sop2;
        packet[2] = options.did;
        packet[3] = options.cid;
        packet[4] = options.seq;
        packet[5] = dataLength + 1;

        for (let i = 0; i < dataLength; i++) {
            packet[6 + i] = options.data[i];
        }

        packet[6 + dataLength] = this.calculateChecksum(packet, 2, 6 + dataLength);

        return packet;
    }

    calculateChecksum(data: Uint8Array, begin: number, end: number): number {
        let sum = 0;
        for (let i = begin; i < end; i++) {
            sum += data[i];
        }
        return (~sum) & 0xFF;
    }

    // Sphero Commands

    // heading (0-359)
    setHeading(heading: number): Uint8Array {
        return this.buildCommandPacket({
            sop1: 0xFF,
            sop2: 0xFE,
            did: 0x02,
            cid: 0x01,
            seq: 0x00,
            data: [(heading >> 8) & 0xFF, heading & 0xFF]
        });
    }

    // red (0-255)
    // green (0-255)
    // blue (0-255)
    setRgbLed(red: number, green: number, blue: number): Uint8Array {
        return this.buildCommandPacket({
            sop1: 0xFF,
            sop2: 0xFE,
            did: 0x02,
            cid: 0x20,
            seq: 0x00,
            data: [red, green, blue, 0x00]
        });
    }

    // speed (0-255)
    // heading (0-359)
    roll(speed: number, heading: number): Uint8Array {
        const state = 0x01;
        return this.buildCommandPacket({
            sop1: 0xFF,
            sop2: 0xFE,
            did: 0x02,
            cid: 0x30,
            seq: 0x00,
            data: [speed, (heading >> 8) & 0xFF, heading & 0xFF, state]
        });
    }
}
