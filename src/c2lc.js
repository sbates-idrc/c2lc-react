import React from 'react';

class ActionHandler {
    constructor(handler) {
        this.handleAction = handler;
    }
}

class Interpreter {
    constructor(actions) {
        this.actions = actions;
    }

    run(program) {
        for (const action of program) {
            const handler = this.actions[action];
            if (handler) {
                handler.handleAction(this);
            } else {
                console.log("UNKNOWN ACTION");
            }
        }
    }
}

class TextSyntax {
    read(text) {
        if (text.trim().length === 0) {
            return [];
        }
        return text.trim().split(/\s+/);
    }

    print(program) {
        return program.join(" ");
    }
}

class ProgramTextEditor extends React.Component {
    // This is a 'uncontrolled component' that maintains its own local version
    // of the program text. The changes are sent outwards (to the
    // props.onChange handler) at blur. And getDerivedStateFromProps() is used
    // with an explicit version number to trigger this component to update
    // its state to reflect changes from outside.
    // See: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

    constructor(props) {
        super(props);
        this.state = {
            programVer: props.programVer,
            text: props.syntax.print(props.program)
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.programVer !== state.programVer) {
            return {
                programVer: props.programVer,
                text: props.syntax.print(props.program)
            };
        } else {
            return null;
        }
    }

    handleChange(e) {
        // Update the local program text state
        this.setState({
            text: e.target.value
        });
    }

    handleBlur() {
        // Call the props.onChange handler at blur.
        // We could implement a much more sophisticated strategy here, such as
        // checking if the program is valid at each edit (textarea.onChange)
        // and call the onChange handler if the program has changed (and it is
        // valid).
        this.props.onChange(this.props.syntax.read(this.state.text));
    }

    render() {
        return (
            <div>
                <textarea
                    value={this.state.text}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur} />
            </div>
        );
    }
}

class EditorsSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(parseInt(e.target.value, 10));
    }

    render() {
        return (
            <select value={this.props.numEditors} onChange={this.handleChange}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        );
    }
}

class RunButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick}>Run</button>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            program: ["forward", "left", "right", "forward"],
            programVer: 1,
            numEditors: 1
        };

        this.interpreter = new Interpreter(
            {
                forward: new ActionHandler(() => { console.log("FORWARD") }),
                left: new ActionHandler(() => { console.log("LEFT") }),
                right: new ActionHandler(() => { console.log("RIGHT") })
            }
        );

        this.syntax = new TextSyntax();

        this.handleProgramChange = this.handleProgramChange.bind(this);
        this.handleNumEditorsChange = this.handleNumEditorsChange.bind(this);
        this.handleClickRun = this.handleClickRun.bind(this);
    }

    handleProgramChange(program) {
        this.setState((state) => {
            return {
                program: program,
                programVer: state.programVer + 1
            }
        });
    }

    handleNumEditorsChange(numEditors) {
        this.setState({
            numEditors: numEditors
        });
    }

    handleClickRun() {
        this.interpreter.run(this.state.program);
    }

    render() {
        return (
            <div>
                {[...Array(this.state.numEditors)].map((x, i) => {
                    return <ProgramTextEditor
                        program={ this.state.program }
                        programVer={ this.state.programVer }
                        syntax={ this.syntax }
                        onChange={ this.handleProgramChange }
                        key={ i } />
                })}
                <EditorsSelect
                    numEditors={ this.state.numEditors }
                    onChange={ this.handleNumEditorsChange } />
                <RunButton onClick={ this.handleClickRun } />
            </div>
        );
    }
}

export { App };
