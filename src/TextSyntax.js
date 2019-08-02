// @flow

export default class TextSyntax {
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
