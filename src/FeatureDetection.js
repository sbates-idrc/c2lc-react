// @flow

type NavigatorMaybeBluetooth = Navigator & {
    bluetooth: any
};

function bluetoothApiIsAvailable(): boolean {
    return !!(((navigator: any): NavigatorMaybeBluetooth).bluetooth);
}

export { bluetoothApiIsAvailable };
