import React, { Component } from 'react';
import { ReactMic } from 'react-mic';

const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-CA';

export class Mic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            interimText: '',
            finalisedText: ''
        }

        recognition.onresult = this.onData.bind(this);
    }

    startRecording = () => {
        this.setState({
            record: true
        });
        recognition.start();
    }

    stopRecording = () => {
        this.setState({
            record: false
        });
    }

    onData = (event) => {
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
        } else if (speechResult.includes('never mind') || speechResult.includes('delete') || speechResult.includes('cancle') || speechResult.includes('back')) {
            this.props.cancle();
        } else if (speechResult.includes('home')) {
            this.props.home();
        } else if (speechResult.includes('clear')) {
            this.props.clear();
        } else if (speechResult.includes('reset')) {
            this.props.deleteAll();
        }
        }
    };

    onStop(recordedBlob) {
        recognition.stop();
    }

    render() {
        return (
            <div>
            <div>
                {SpeechRecognition ? (
                    <p>SpeechRecognition available</p>
                ) : (
                    <p>SpeechRecognition is not available {SpeechRecognition}</p>
                )}
            </div>
            <ReactMic
                record={this.state.record}
                className="sound-wave"
                onStop={this.onStop}
                onData={this.onData}
                strokeColor="#000000"
                backgroundColor="#FF4081" />
            <button onClick={this.startRecording} type="button">Start</button>
            <button onClick={this.stopRecording} type="button">Stop</button>
            </div>
        )
    }
}

export default Mic
