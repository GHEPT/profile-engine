import type { RuntimeProfile } from "../types/Profile";

const WIDTH = 1200;
const HEIGHT = 320;

const PADDING_X = 64;
const PADDING_Y = 56;

export function generateHeroSvg(
    profile: RuntimeProfile
): string {
    const headlineY = PADDING_Y + 42;
    const titleY = headlineY + 48;
    const taglineY = titleY + 42;

    return `
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${WIDTH}"
    height="${HEIGHT}"
    viewBox="0 0 ${WIDTH} ${HEIGHT}"
    role="img"
    aria-labelledby="title description"
>

    <title id="title">${escape(profile.name)}</title>

    <desc id="description">
        ${escape(profile.headline)}
    </desc>

    <defs>

        <linearGradient
            id="background"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
        >
            <stop offset="0%" stop-color="#0F172A"/>

            <stop offset="100%" stop-color="#111827"/>

        </linearGradient>

        <linearGradient
            id="accent"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
        >
            <stop offset="0%" stop-color="#38BDF8"/>

            <stop offset="100%" stop-color="#22C55E"/>
        </linearGradient>

    </defs>

    <rect
        width="${WIDTH}"
        height="${HEIGHT}"
        rx="28"
        fill="url(#background)"
    />

    <rect
        x="36"
        y="36"
        width="8"
        height="${HEIGHT - 72}"
        rx="4"
        fill="url(#accent)"
    />

    <text
        x="${PADDING_X}"
        y="${headlineY}"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="18"
        font-weight="600"
        fill="#38BDF8"
    >
        SOFTWARE ENGINEER • BACKEND • AUTOMATION
    </text>

    <text
        x="${PADDING_X}"
        y="${titleY}"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="40"
        font-weight="700"
        fill="#FFFFFF"
    >
        ${escape(profile.name)}
    </text>

    <text
        x="${PADDING_X}"
        y="${taglineY}"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="22"
        fill="#CBD5E1"
    >
        ${escape(profile.headline)}
    </text>

    ${renderMultiline(
        profile.tagline,
        PADDING_X,
        taglineY + 38,
        18,
        "#94A3B8"
    )}

    <g transform="translate(840,52)">

        <rect
            width="300"
            height="216"
            rx="18"
            fill="#FFFFFF08"
            stroke="#FFFFFF12"
        />

        <text
            x="28"
            y="42"
            font-family="Inter, Segoe UI"
            font-size="16"
            font-weight="700"
            fill="#FFFFFF"
        >
            CURRENT FOCUS
        </text>

        ${renderFocus(profile.currentFocus.items)}

    </g>

</svg>
`.trim();
}

function renderFocus(
    items: string[]
): string {
    return items
        .map((item, index) => {
            const y = 74 + index * 34;

            return `
<circle
    cx="20"
    cy="${y - 6}"
    r="4"
    fill="#38BDF8"
/>

<text
    x="34"
    y="${y}"
    font-family="Inter, Segoe UI"
    font-size="15"
    fill="#E2E8F0"
>
    ${escape(item)}
</text>
`;
        })
        .join("");
}

function renderMultiline(
    text: string,
    x: number,
    startY: number,
    fontSize: number,
    color: string
): string {
    const lines = wrap(text, 58);

    return lines
        .map((line, index) => {
            const y = startY + index * (fontSize + 10);

            return `
<text
    x="${x}"
    y="${y}"
    font-family="Inter, Segoe UI"
    font-size="${fontSize}"
    fill="${color}"
>
    ${escape(line)}
</text>`;
        })
        .join("");
}

function wrap(
    text: string,
    max: number
): string[] {
    const words = text.split(/\s+/);

    const lines: string[] = [];

    let current = "";

    for (const word of words) {
        if ((current + " " + word).trim().length <= max) {
            current = `${current} ${word}`.trim();
            continue;
        }

        lines.push(current);

        current = word;
    }

    if (current) {
        lines.push(current);
    }

    return lines;
}

function escape(
    value: string
): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}