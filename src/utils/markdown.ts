export function heading(
    text: string,
    level: 1 | 2 | 3 | 4 | 5 | 6 = 2
): string {
    return `${"#".repeat(level)} ${text}`;
}

export function paragraph(text: string): string {
    return text.trim();
}

export function quote(text: string): string {
    return text
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
}

export function bulletList(items: string[]): string {
    return items.map((item) => `- ${item}`).join("\n");
}

export function numberedList(items: string[]): string {
    return items
        .map((item, index) => `${index + 1}. ${item}`)
        .join("\n");
}

export function horizontalRule(): string {
    return "---";
}

export function codeBlock(
    language: string,
    content: string
): string {
    return [
        `\`\`\`${language}`,
        content,
        "```"
    ].join("\n");
}

export function inlineCode(value: string): string {
    return `\`${value}\``;
}

export function bold(value: string): string {
    return `**${value}**`;
}

export function italic(value: string): string {
    return `*${value}*`;
}

export function link(
    label: string,
    url: string
): string {
    return `[${label}](${url})`;
}

export function image(
    alt: string,
    src: string
): string {
    return `![${alt}](${src})`;
}

export function joinSections(
    sections: string[]
): string {
    return sections
        .map((section) => section.trim())
        .filter(Boolean)
        .join("\n\n");
}