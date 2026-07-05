import type { Journey } from "../types/Journey";


export const JOURNEY_HEIGHT = 500;

export function renderJourneySvgContent(
    journey: Journey
): string {
    return `
    <rect
        x="24"
        y="28"
        width="4"
        height="36"
        rx="2"
        fill="#238BFF"
    />

    <text
        x="48"
        y="57"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="27"
        font-weight="700"
        fill="#F8FAFC"
    >
        ${escape(journey.title)}
    </text>

    ${journey.subtitle ? `
    <text
        x="48"
        y="94"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="18"
        fill="#CBD5E1"
    >
        ${escape(journey.subtitle)}
    </text>
    ` : ""}

    ${journey.timeline
        .map((step, index) =>
            renderStep(step, index)
        )
        .join("")}

    ${renderTimeline()}
`.trim();
}

function renderTimeline(): string {
    const positions = [48, 266, 484, 702, 920];

    return `
    <defs>
        <linearGradient
            id="journeyCurveGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
        >
            <stop
                offset="0%"
                stop-color="#0EA5E9"
            />

            <stop
                offset="55%"
                stop-color="#3B82F6"
            />

            <stop
                offset="100%"
                stop-color="#A855F7"
            />
        </linearGradient>

        <marker
            id="journeyArrow"
            markerWidth="5"
            markerHeight="5"
            refX="4.5"
            refY="2.5"
            orient="auto"
            markerUnits="strokeWidth"
        >
            <path
                d="M0,0 L5,2.5 L0,5 Z"
                fill="#A855F7"
            />
        </marker>
    </defs>

    <line
        x1="48"
        y1="430"
        x2="1152"
        y2="430"
        stroke="#334155"
        stroke-width="2"
    />

    <path
        d="
            M 48 430
            C 260 430, 390 430, 484 424
            C 610 416, 700 398, 770 365
            C 875 316, 960 230, 1040 118
        "
        fill="none"
        stroke="url(#journeyCurveGradient)"
        stroke-width="7"
        stroke-linecap="round"
        marker-end="url(#journeyArrow)"
    />

    ${positions
        .map((x, index) => `
        <circle
            cx="${x}"
            cy="430"
            r="7"
            fill="${stepColor(index)}"
        />
        `)
        .join("")}
`;
}

function renderStep(
    step: Journey["timeline"][number],
    index: number
): string {
    const positions = [48, 266, 484, 702, 920];
    const x = positions[index] ?? 48;
    const contentX = index === 4 ? 1015 : x;
    const contentY = index === 4 ? 225 : 155;

    return `
    ${index > 0 ? `
    <line
        x1="${x - 20}"
        y1="150"
        x2="${x - 20}"
        y2="410"
        stroke="#334155"
        stroke-opacity="0.55"
        stroke-dasharray="2 4"
    />
    ` : ""}

    <g transform="translate(${contentX}, ${contentY})">
        ${renderStepIcon(index)}

        <text
            x="0"
            y="52"
            font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
            font-size="17"
            font-weight="600"
            fill="${stepColor(index)}"
        >
            ${escape(step.title)}
        </text>

        ${renderMultiline(
            step.description,
            0,
            86,
            17,
            "#CBD5E1",
            22
        )}
    </g>

    <text
        x="${x}"
        y="465"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="17"
        fill="#CBD5E1"
    >
        ${escape(step.year)}
    </text>
`;
}

function renderStepIcon(
    index: number
): string {
    const color = stepColor(index);

    const icons = [
        `
        <rect
            x="3"
            y="-10"
            width="30"
            height="22"
            rx="3"
            fill="none"
            stroke="${color}"
            stroke-width="3"
        />
        <path
            d="M11 -10 V-16 H25 V-10"
            fill="none"
            stroke="${color}"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M3 -2 H33"
            fill="none"
            stroke="${color}"
            stroke-width="3"
        />
        `,
        `
        <path
            d="M2 5 H9 L14 -9 L21 14 L27 -3 H36"
            fill="none"
            stroke="${color}"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        `,
        `
        <path
            d="M12 -12 L2 0 L12 12"
            fill="none"
            stroke="${color}"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M24 -12 L34 0 L24 12"
            fill="none"
            stroke="${color}"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M21 -16 L15 16"
            fill="none"
            stroke="${color}"
            stroke-width="3"
            stroke-linecap="round"
        />
        `,
        `
        <path
            d="M12 8 C18 5 27 -4 30 -15 C19 -14 10 -5 7 1 Z"
            fill="none"
            stroke="${color}"
            stroke-width="3"
            stroke-linejoin="round"
        />
        <circle
            cx="22"
            cy="-7"
            r="3"
            fill="none"
            stroke="${color}"
            stroke-width="2"
        />
        <path
            d="M8 3 L2 9 M14 9 L9 15 M5 12 L1 16"
            fill="none"
            stroke="${color}"
            stroke-width="3"
            stroke-linecap="round"
        />
        `,
        `
        <circle
            cx="18"
            cy="0"
            r="15"
            fill="none"
            stroke="${color}"
            stroke-width="3"
        />
        <circle
            cx="18"
            cy="0"
            r="7"
            fill="none"
            stroke="${color}"
            stroke-width="3"
        />
        <path
            d="M27 -10 L37 -20 M31 -20 H37 V-14"
            fill="none"
            stroke="${color}"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        `
    ];

    return icons[index] ?? icons[0];
}

function stepColor(
    index: number
): string {
    const colors = [
        "#3B82F6",
        "#3B82F6",
        "#8B5CF6",
        "#8B5CF6",
        "#A855F7"
    ];

    return colors[index] ?? "#3B82F6";
}

function renderMultiline(
    text: string,
    x: number,
    startY: number,
    fontSize: number,
    color: string,
    maxLength: number,
    textAnchor = "start"
): string {
    const lines = wrap(text, maxLength);

    return lines
        .map((line, index) => `
        <text
            x="${x}"
            y="${startY + index * (fontSize + 8)}"
            font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
            font-size="${fontSize}"
            text-anchor="${textAnchor}"
            fill="${color}"
        >
            ${escape(line)}
        </text>
        `)
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
        const candidate =
            `${current} ${word}`.trim();

        if (candidate.length <= max) {
            current = candidate;
            continue;
        }

        if (current) {
            lines.push(current);
        }

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
