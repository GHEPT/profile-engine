export interface RenderOptions {
    lineBreak?: string;
    sectionSpacing?: number;
    trimTrailingWhitespace?: boolean;
    ensureFinalNewline?: boolean;
}

const DEFAULT_OPTIONS: Required<RenderOptions> = {
    lineBreak: "\n",
    sectionSpacing: 2,
    trimTrailingWhitespace: true,
    ensureFinalNewline: true
};

export function renderMarkdown(
    sections: Array<string | undefined | null>,
    options: RenderOptions = {}
): string {
    const settings = {
        ...DEFAULT_OPTIONS,
        ...options
    };

    const lineBreak = settings.lineBreak;

    const separator = lineBreak.repeat(
        Math.max(1, settings.sectionSpacing)
    );

    let output = sections
        .filter(isRenderable)
        .map((section) => normalize(section!, settings))
        .join(separator);

    if (settings.trimTrailingWhitespace) {
        output = trimTrailingWhitespace(output);
    }

    if (settings.ensureFinalNewline && !output.endsWith(lineBreak)) {
        output += lineBreak;
    }

    return output;
}

export function renderTemplate(
    template: string,
    context: Record<string, unknown>
): string {
    return template.replace(
        /\{\{\s*([a-zA-Z0-9._-]+)\s*\}\}/g,
        (_, expression: string) => {
            const value = resolve(context, expression);

            if (value === undefined || value === null) {
                return "";
            }

            if (Array.isArray(value)) {
                return value.join("\n");
            }

            return String(value);
        }
    );
}

export function renderList(
    items: string[],
    bullet = "-"
): string {
    return items
        .map((item) => `${bullet} ${item}`)
        .join("\n");
}

export function renderParagraphs(
    paragraphs: string[]
): string {
    return paragraphs
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .join("\n\n");
}

export function renderTable(
    headers: string[],
    rows: string[][]
): string {
    if (headers.length === 0) {
        return "";
    }

    const table: string[] = [];

    table.push(
        `| ${headers.join(" | ")} |`
    );

    table.push(
        `| ${headers.map(() => "---").join(" | ")} |`
    );

    for (const row of rows) {
        table.push(
            `| ${row.join(" | ")} |`
        );
    }

    return table.join("\n");
}

export function renderQuote(
    text: string
): string {
    return text
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
}

function normalize(
    value: string,
    options: Required<RenderOptions>
): string {
    let output = value
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .trim();

    if (options.lineBreak !== "\n") {
        output = output.replace(
            /\n/g,
            options.lineBreak
        );
    }

    return output;
}

function trimTrailingWhitespace(
    value: string
): string {
    return value.replace(/[ \t]+$/gm, "");
}

function resolve(
    object: Record<string, unknown>,
    path: string
): unknown {
    return path
        .split(".")
        .reduce<unknown>((current, key) => {
            if (
                current &&
                typeof current === "object" &&
                key in (current as Record<string, unknown>)
            ) {
                return (current as Record<string, unknown>)[key];
            }

            return undefined;
        }, object);
}

function isRenderable(
    value: unknown
): value is string {
    return (
        typeof value === "string" &&
        value.trim().length > 0
    );
}