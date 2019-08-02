// @flow

type ActionHandler = {
    (Interpreter): void
};

export default class Interpreter {
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
