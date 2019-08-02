// @flow

import React from 'react';

type EditorsSelectProps = {
    numEditors: number,
    onChange: (number) => void
};

export default class EditorsSelect extends React.Component<EditorsSelectProps> {
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
