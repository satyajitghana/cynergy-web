export class Quote {
    text: String;
    author: String;

    constructor(text?: string, author?: string) {
        if (text !== undefined) {
            this.text = text;
        } else {
            this.text = '';
        }
        if (author !== undefined) {
            this.author = author;
        } else {
            this.author = '';
        }
    }
}
