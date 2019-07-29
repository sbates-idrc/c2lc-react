import React from 'react';

class ActionHandler {
    constructor(handler) {
        this.handleAction = handler;
    }
}

class Interpreter {
    constructor(actions, program) {
        this.actions = actions;
        this.program = program;
    }

    run() {
        for (const action of this.program) {
            const handler = this.actions[action];
            if (!handler) {
                console.log("UNKNOWN ACTION");
            } else {
                handler.handleAction.apply(this);
            }
        }
    }
}

class RunButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.interpreter.run();
    }

    render() {
        return (
            <button onClick={this.handleClick}>Run</button>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.interpreter = new Interpreter(
            {
                forward: new ActionHandler(() => { console.log("FORWARD") }),
                left: new ActionHandler(() => { console.log("LEFT") }),
                right: new ActionHandler(() => { console.log("RIGHT") })
            },
            ["forward", "left", "right", "forward"]
        );
    }

    render() {
        return (
            <RunButton interpreter={ this.interpreter } />
        );
    }
}

export { App };
