// @flow

import React from 'react';

type ActionHandler = {
    (Interpreter): void
};

class Interpreter {
    actions: { [string]: ActionHandler };

    constructor(actions: { [string]: ActionHandler }) {
        this.actions = actions;
    }

    run(program: Array<string>): void {
        for (const action of program) {
            const handler = this.actions[action];
            if (handler) {
                handler(this);
            } else {
                console.log("UNKNOWN ACTION");
            }
        }
    }
}

class TextSyntax {
    read(text: string): Array<string> {
        if (text.trim().length === 0) {
            return [];
        }
        return text.trim().split(/\s+/);
    }

    print(program: Array<string>): string {
        return program.join(" ");
    }
}

type ProgramTextEditorProps = {
    program: Array<string>,
    programVer: number,
    syntax: TextSyntax,
    onChange: (Array<string>) => void
};

type ProgramTextEditorState = {
    programVer: number,
    text: string
};

class ProgramTextEditor extends React.Component<ProgramTextEditorProps, ProgramTextEditorState> {
    // This is a 'uncontrolled component' that maintains its own local version
    // of the program text. The changes are sent outwards (to the
    // props.onChange handler) at blur. And getDerivedStateFromProps() is used
    // with an explicit version number to trigger this component to update
    // its state to reflect changes from outside.
    // See: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

    constructor(props: ProgramTextEditorProps) {
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

    handleChange: (SyntheticEvent<HTMLTextAreaElement>) => void;
    handleChange(e: SyntheticEvent<HTMLTextAreaElement>) {
        // Update the local program text state
        this.setState({
            text: e.currentTarget.value
        });
    }

    handleBlur: () => void;
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

type EditorsSelectProps = {
    numEditors: number,
    onChange: (number) => void
};

class EditorsSelect extends React.Component<EditorsSelectProps> {
    constructor(props: EditorsSelectProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange: (SyntheticEvent<HTMLSelectElement>) => void;
    handleChange(e: SyntheticEvent<HTMLSelectElement>) {
        this.props.onChange(parseInt(e.currentTarget.value, 10));
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

class RunButton extends React.Component<{onClick: () => void}> {
    render() {
        return (
            <button onClick={this.props.onClick}>Run</button>
        );
    }
}

type AppState = {
    program: Array<string>,
    programVer: number,
    numEditors: number
};

class App extends React.Component<{}, AppState> {
    interpreter: Interpreter;
    syntax: TextSyntax;

    constructor(props: {}) {
        super(props);

        this.state = {
            program: ["forward", "left", "right", "forward"],
            programVer: 1,
            numEditors: 1
        };

        this.interpreter = new Interpreter(
            {
                forward: () => { console.log("FORWARD") },
                left: () => { console.log("LEFT") },
                right: () => { console.log("RIGHT") }
            }
        );

        this.syntax = new TextSyntax();

        this.handleProgramChange = this.handleProgramChange.bind(this);
        this.handleNumEditorsChange = this.handleNumEditorsChange.bind(this);
        this.handleClickRun = this.handleClickRun.bind(this);
    }

    handleProgramChange: (Array<string>) => void;
    handleProgramChange(program: Array<string>) {
        this.setState((state) => {
            return {
                program: program,
                programVer: state.programVer + 1
            }
        });
    }

    handleNumEditorsChange: (number) => void;
    handleNumEditorsChange(numEditors: number) {
        this.setState({
            numEditors: numEditors
        });
    }

    handleClickRun: () => void;
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
