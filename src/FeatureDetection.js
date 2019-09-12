// @flow

type NavigatorMaybeBluetooth = Navigator & {
    bluetooth: any
};

function bluetoothApiIsAvailable(): boolean {
    return !!(((navigator: any): NavigatorMaybeBluetooth).bluetooth);
}

function speechRecognitionIsAvailable(): boolean {
    return !!((window: any).webkitSpeechRecognition);
}

export { bluetoothApiIsAvailable, speechRecognitionIsAvailable };
