export class Path {
    text: string;
    link?: string;

    constructor(text: string, link?: string) {
        this.text = text;
        this.link = link;
    }
}