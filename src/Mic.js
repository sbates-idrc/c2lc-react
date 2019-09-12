// @flow

import React from 'react';
import { ReactMic } from 'react-mic';

type MicProps = {
    voiceInput: (string) => void,
    run: () => void,
    cancel: () => void,
    home: () => void,
    clear: () => void,
    deleteAll: () => void
};

type MicState = {
    speechRecognitionOn: boolean
};

export class Mic extends React.Component<MicProps, MicState> {
    recognition: any;

    constructor(props: MicProps) {
        super(props);

        this.state = {
            speechRecognitionOn: false
        };

        this.recognition = new window.webkitSpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.lang = 'en-CA';
        this.recognition.onresult = this.onSpeechRecognitionResult.bind(this);

        this.startSpeechRecognition = this.startSpeechRecognition.bind(this);
        this.stopSpeechRecognition = this.stopSpeechRecognition.bind(this);
    }

    startSpeechRecognition: () => void;
    startSpeechRecognition() {
        this.setState((state) => {
            if (!state.speechRecognitionOn) {
                this.recognition.start();
            }
            return {
                speechRecognitionOn: true
            };
        });
    }

    stopSpeechRecognition: () => void;
    stopSpeechRecognition() {
        this.setState((state) => {
            if (state.speechRecognitionOn) {
                this.recognition.stop();
            }
            return {
                speechRecognitionOn: false
            };
        });
    }

    onSpeechRecognitionResult: (any) => void;
    onSpeechRecognitionResult(event: any) {
        if (event.results != null) {
            let speechResult = event.results[event.results.length-1][0].transcript.toLowerCase();
            if (speechResult.includes('forward')) {
                this.props.voiceInput('forward');
            } else if (speechResult.includes('left')) {
                this.props.voiceInput('left');
            } else if (speechResult.includes('right')) {
                this.props.voiceInput('right');
            } else if (speechResult.includes('run')) {
                this.props.run();
            } else if (speechResult.includes('never mind') || speechResult.includes('delete') || speechResult.includes('cancel') || speechResult.includes('back')) {
                this.props.cancel();
            } else if (speechResult.includes('home')) {
                this.props.home();
            } else if (speechResult.includes('clear')) {
                this.props.clear();
            } else if (speechResult.includes('reset')) {
                this.props.deleteAll();
            }
        }
    };

    render() {
        return (
            <div>
                <ReactMic
                    record={this.state.speechRecognitionOn}
                    className="sound-wave"
                    strokeColor="#000000"
                    backgroundColor="#FF4081" />
                <button onClick={this.startSpeechRecognition} type="button">Start</button>
                <button onClick={this.stopSpeechRecognition} type="button">Stop</button>
            </div>
        )
    }
}

export default Mic
