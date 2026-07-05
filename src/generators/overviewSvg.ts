import type { RuntimeProfile } from "../types/Profile";
import type { Project } from "../types/Project";


export const OVERVIEW_HEIGHT = 390;

export function renderOverviewSvgContent(
    profile: RuntimeProfile,
    projects: Project[]
): string {
    const featuredProjects = projects
        .filter((project) => project.featured)
        .slice(0, 3);

    return `
    <rect
        x="24"
        y="28"
        width="1152"
        height="330"
        rx="8"
        fill="#07111F"
        fill-opacity="0.24"
        stroke="#94A3B8"
        stroke-opacity="0.16"
    />

    <line
        x1="400"
        y1="28"
        x2="400"
        y2="358"
        stroke="#94A3B8"
        stroke-opacity="0.16"
    />

    <line
        x1="800"
        y1="28"
        x2="800"
        y2="358"
        stroke="#94A3B8"
        stroke-opacity="0.16"
    />

    ${renderSectionTitle(
        48,
        72,
        "What I’m Building"
    )}

    ${renderSectionTitle(
        424,
        72,
        "Technical Expertise"
    )}

    ${renderSectionTitle(
        824,
        72,
        "Featured Projects"
    )}

    ${renderBuilding(profile)}

    ${renderTechnicalExpertise(profile)}

    ${renderFeaturedProjects(featuredProjects)}
`.trim();
}

function renderSectionTitle(
    x: number,
    y: number,
    title: string
): string {
    return `
    <rect
        x="${x}"
        y="${y - 25}"
        width="4"
        height="28"
        rx="2"
        fill="#238BFF"
    />

    <text
        x="${x + 16}"
        y="${y}"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="23"
        font-weight="700"
        fill="#F8FAFC"
    >
        ${escape(title)}
    </text>
`;
}

function renderBuilding(
    profile: RuntimeProfile
): string {
    const focus = profile.currentFocus.items
        .slice(0, 4);

    return `
    ${renderMultilineText(
        profile.building.description,
        48,
        118,
        16,
        28,
        42,
        "#CBD5E1"
    )}

    <line
        x1="48"
        y1="218"
        x2="376"
        y2="218"
        stroke="#94A3B8"
        stroke-opacity="0.16"
    />

    <text
        x="48"
        y="252"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="15"
        fill="#60A5FA"
    >
        Current focus
    </text>

    ${focus
        .map((item, index) =>
            renderFocusItem(item, index)
        )
        .join("")}
`;
}

function renderFocusItem(
    item: string,
    index: number
): string {
    const column = index % 2;
    const row = Math.floor(index / 2);

    const x = 48 + column * 164;
    const y = 270 + row * 42;

    return `
    <rect
        x="${x}"
        y="${y}"
        width="152"
        height="32"
        rx="6"
        fill="#111827"
        stroke="#334155"
        stroke-opacity="0.70"
    />

    <text
        x="${x + 10}"
        y="${y + 21}"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="13"
        fill="#CBD5E1"
    >
        ${escape(item)}
    </text>
`;
}

function renderTechnicalExpertise(
    profile: RuntimeProfile
): string {
    const groups = Object.values(
        profile.technicalExpertise
    );

    return groups
        .map((group, index) => {
            const y = 118 + index * 62;

            return `
    <text
        x="448"
        y="${y}"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="17"
        font-weight="600"
        fill="#60A5FA"
    >
        ${escape(group.title)}
    </text>

    <text
        x="448"
        y="${y + 25}"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="15"
        fill="#CBD5E1"
    >
        ${escape(group.items.join(" • "))}
    </text>
`;
        })
        .join("");
}

function renderFeaturedProjects(
    projects: Project[]
): string {
    return projects
        .map((project, index) => {
            const y = 118 + index * 112;

            return `
    <text
        x="848"
        y="${y}"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="17"
        font-weight="600"
        fill="#8B5CF6"
    >
        ${escape(project.name)}
    </text>

    ${renderMultilineText(
        project.description,
        848,
        y + 24,
        13,
        18,
        36,
        "#CBD5E1"
    )}
`;
        })
        .join("");
}

function renderMultilineText(
    text: string,
    x: number,
    startY: number,
    fontSize: number,
    lineHeight: number,
    maxLength: number,
    color: string
): string {
    const lines = wrapText(text, maxLength);

    return lines
        .map((line, index) => {
            const y = startY + index * lineHeight;

            return `
    <text
        x="${x}"
        y="${y}"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="${fontSize}"
        fill="${color}"
    >
        ${escape(line)}
    </text>`;
        })
        .join("");
}

function wrapText(
    text: string,
    maxLength: number
): string[] {
    const words = text.split(/\s+/);
    const lines: string[] = [];

    let current = "";

    for (const word of words) {
        const candidate =
            `${current} ${word}`.trim();

        if (candidate.length <= maxLength) {
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
