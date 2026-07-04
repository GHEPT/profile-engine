import { renderTemplate } from "../renderers/markdown";

export interface SectionProps {
    title: string;

    content: string;

    level?: 1 | 2 | 3 | 4 | 5 | 6;

    separator?: boolean;

    id?: string;
}

const SECTION_TEMPLATE = `
{{heading}}

{{content}}

{{separator}}
`.trim();

export class Section {
    constructor(
        private readonly props: SectionProps
    ) { }

    render(): string {
        return renderTemplate(SECTION_TEMPLATE, {
            heading: this.buildHeading(),

            content: this.normalizeContent(),

            separator: this.props.separator === false
                ? ""
                : "---"
        }).trim();
    }

    private buildHeading(): string {
        const level = this.props.level ?? 2;

        return `${"#".repeat(level)} ${this.props.title}`;
    }

    private normalizeContent(): string {
        return this.props.content
            .replace(/\r\n/g, "\n")
            .replace(/\r/g, "\n")
            .trim();
    }
}