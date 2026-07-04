import fs from "node:fs";

import { Paths } from "../constants/Paths";

import type { Config } from "../types/Config";
import type { Journey } from "../types/Journey";

export function generateJourney(
    journey: Journey,
    config?: Config
): string {
    generateTimelineSvg(journey, config);

    const output: string[] = [];

    output.push(`## ${journey.title}`);
    output.push("");

    if (journey.subtitle) {
        output.push(journey.subtitle);
        output.push("");
    }

    output.push('<p align="center">');
    output.push("");
    output.push(
        '<img src="./assets/generated/timeline.svg" alt="Timeline" width="100%" />'
    );
    output.push("");
    output.push("</p>");
    output.push("");

    for (const step of journey.timeline) {
        output.push(renderStep(step));
        output.push("");
    }

    return output.join("\n").trim();
}

function renderStep(
    step: Journey["timeline"][number]
): string {
    const lines: string[] = [];

    lines.push(`### ${step.year} · ${step.title}`);
    lines.push("");

    lines.push(`**${step.organization}**`);
    lines.push("");

    lines.push(step.description);
    lines.push("");

    if (step.highlights.length > 0) {
        lines.push("**Highlights**");
        lines.push("");

        for (const highlight of step.highlights) {
            lines.push(`- ${highlight}`);
        }
    }

    return lines.join("\n");
}

function generateTimelineSvg(
    journey: Journey,
    config?: Config
): void {
    const enabled =
        config?.svg.timeline.enabled ?? true;

    if (!enabled) {
        return;
    }

    fs.mkdirSync(Paths.generated, {
        recursive: true
    });

    fs.writeFileSync(
        `${Paths.generated}/timeline.svg`,
        buildTimelineSvg(journey),
        "utf8"
    );
}

function buildTimelineSvg(
    journey: Journey
): string {
    const spacing = 180;
    const start = 90;

    const width = Math.max(
        1200,
        start * 2 +
        (journey.timeline.length - 1) * spacing
    );

    const height = 180;

    const circles = journey.timeline
        .map((step, index) => {
            const x = start + index * spacing;

            return `
<circle
    cx="${x}"
    cy="90"
    r="10"
    fill="#38BDF8"
/>

<text
    x="${x}"
    y="60"
    text-anchor="middle"
    font-size="14"
    fill="#FFFFFF"
>
${escape(step.year)}
</text>

<text
    x="${x}"
    y="125"
    text-anchor="middle"
    font-size="15"
    font-weight="700"
    fill="#E2E8F0"
>
${escape(step.title)}
</text>
`;
        })
        .join("");

    const lines = journey.timeline
        .slice(0, -1)
        .map((_, index) => {
            const x1 = start + index * spacing;
            const x2 = start + (index + 1) * spacing;

            return `
<line
    x1="${x1}"
    y1="90"
    x2="${x2}"
    y2="90"
    stroke="#475569"
    stroke-width="3"
/>
`;
        })
        .join("");

    return `
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${width}"
    height="${height}"
    viewBox="0 0 ${width} ${height}"
>

<rect
    width="${width}"
    height="${height}"
    rx="22"
    fill="#0F172A"
/>

${lines}

${circles}

</svg>
`.trim();
}

function escape(
    value: string
): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}