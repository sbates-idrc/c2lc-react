// @flow

import React from 'react';
import TextSyntax from './TextSyntax';

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

export default class ProgramTextEditor extends React.Component<ProgramTextEditorProps, ProgramTextEditorState> {
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

    static getDerivedStateFromProps(props: ProgramTextEditorProps, state: ProgramTextEditorState) {
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
