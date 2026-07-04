export type ImageAlignment =
    | "left"
    | "center"
    | "right";

export type ImageRenderMode =
    | "html"
    | "markdown";

export interface ImageProps {
    src: string;

    alt: string;

    width?: number | string;

    height?: number | string;

    title?: string;

    align?: ImageAlignment;

    mode?: ImageRenderMode;
}

export class Image {
    constructor(
        private readonly props: ImageProps
    ) { }

    render(): string {
        this.validate();

        if ((this.props.mode ?? "html") === "markdown") {
            return this.renderMarkdown();
        }

        return this.renderHtml();
    }

    private renderMarkdown(): string {
        const image = `![${this.escapeMarkdown(
            this.props.alt
        )}](${this.props.src}${this.props.title
                ? ` "${this.escapeMarkdown(this.props.title)}"`
                : ""
            })`;

        if (!this.props.align) {
            return image;
        }

        return [
            `<p align="${this.props.align}">`,
            "",
            image,
            "",
            "</p>"
        ].join("\n");
    }

    private renderHtml(): string {
        const attributes: string[] = [];

        attributes.push(`src="${this.escapeHtml(this.props.src)}"`);

        attributes.push(`alt="${this.escapeHtml(this.props.alt)}"`);

        if (this.props.title) {
            attributes.push(
                `title="${this.escapeHtml(this.props.title)}"`
            );
        }

        if (this.props.width !== undefined) {
            attributes.push(`width="${this.props.width}"`);
        }

        if (this.props.height !== undefined) {
            attributes.push(`height="${this.props.height}"`);
        }

        const image = `<img ${attributes.join(" ")} />`;

        if (!this.props.align) {
            return image;
        }

        return [
            `<p align="${this.props.align}">`,
            "",
            image,
            "",
            "</p>"
        ].join("\n");
    }

    private validate(): void {
        if (!this.props.src.trim()) {
            throw new Error("Image src cannot be empty.");
        }

        if (!this.props.alt.trim()) {
            throw new Error("Image alt cannot be empty.");
        }
    }

    private escapeHtml(
        value: string
    ): string {
        return value
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    private escapeMarkdown(
        value: string
    ): string {
        return value
            .replace(/\[/g, "\\[")
            .replace(/\]/g, "\\]")
            .replace(/"/g, '\\"');
    }
}