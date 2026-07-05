import fs from "node:fs";
import path from "node:path";

import { Paths } from "../constants/Paths";

import type { RuntimeProfile } from "../types/Profile";

const WIDTH = 1200;
const HEIGHT = 520;

export function generateHeroSvg(
    profile: RuntimeProfile
): string {
    const photo = loadPhoto(profile.photo);

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
            <stop
                offset="0%"
                stop-color="#0B1020"
            />

            <stop
                offset="55%"
                stop-color="#111A35"
            />

            <stop
                offset="100%"
                stop-color="#172554"
            />
        </linearGradient>

        <radialGradient
            id="glow"
            cx="82%"
            cy="45%"
            r="55%"
        >
            <stop
                offset="0%"
                stop-color="#3B82F6"
                stop-opacity="0.20"
            />

            <stop
                offset="100%"
                stop-color="#3B82F6"
                stop-opacity="0"
            />
        </radialGradient>

        <clipPath id="photoClip">
            <circle
                cx="945"
                cy="245"
                r="145"
            />
        </clipPath>

        <filter
            id="photoShadow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
        >
            <feDropShadow
                dx="0"
                dy="18"
                stdDeviation="24"
                flood-color="#000000"
                flood-opacity="0.45"
            />
        </filter>
    </defs>

    <rect
        width="${WIDTH}"
        height="${HEIGHT}"
        rx="24"
        fill="url(#background)"
    />

    <rect
        width="${WIDTH}"
        height="${HEIGHT}"
        rx="24"
        fill="url(#glow)"
    />

    <g transform="translate(72, 78)">
        <text
            x="0"
            y="0"
            font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
            font-size="17"
            font-weight="700"
            letter-spacing="3"
            fill="#60A5FA"
        >
            SOFTWARE ENGINEER • BACKEND • ARCHITECTURE
        </text>

        <text
            x="0"
            y="76"
            font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
            font-size="58"
            font-weight="800"
            fill="#FFFFFF"
        >
            ${escape(profile.name)}
        </text>

        <text
            x="0"
            y="126"
            font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
            font-size="23"
            font-weight="500"
            fill="#CBD5E1"
        >
            ${escape(profile.headline)}
        </text>

        ${renderRoles(profile.roles)}

        <line
            x1="0"
            y1="238"
            x2="610"
            y2="238"
            stroke="#FFFFFF"
            stroke-opacity="0.12"
        />

        ${renderMultiline(
            profile.tagline,
            0,
            286,
            21,
            "#94A3B8",
            52
        )}

        <text
            x="0"
            y="365"
            font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
            font-size="18"
            font-style="italic"
            fill="#60A5FA"
        >
            “${escape(profile.quote)}”
        </text>
    </g>

    ${renderPhoto(photo)}

    <g transform="translate(820, 420)">
        <circle
            cx="0"
            cy="0"
            r="5"
            fill="#22C55E"
        />

        <text
            x="16"
            y="6"
            font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
            font-size="16"
            font-weight="600"
            fill="#CBD5E1"
        >
            ${escape(profile.building.description)}
        </text>
    </g>
</svg>
`.trim();
}

function renderRoles(
    roles: string[]
): string {
    let x = 0;

    return roles
        .map((role) => {
            const width = Math.max(
                112,
                role.length * 9 + 32
            );

            const element = `
<g transform="translate(${x}, 158)">
    <rect
        width="${width}"
        height="38"
        rx="19"
        fill="#FFFFFF"
        fill-opacity="0.06"
        stroke="#FFFFFF"
        stroke-opacity="0.12"
    />

    <text
        x="${width / 2}"
        y="25"
        text-anchor="middle"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="14"
        font-weight="600"
        fill="#E2E8F0"
    >
        ${escape(role)}
    </text>
</g>
`;

            x += width + 12;

            return element;
        })
        .join("");
}

function renderPhoto(
    photo: string | null
): string {
    if (!photo) {
        return "";
    }

    return `
<g filter="url(#photoShadow)">
    <circle
        cx="945"
        cy="245"
        r="154"
        fill="#60A5FA"
        fill-opacity="0.14"
        stroke="#60A5FA"
        stroke-opacity="0.55"
        stroke-width="2"
    />

    <image
        href="${photo}"
        x="800"
        y="100"
        width="290"
        height="290"
        preserveAspectRatio="xMidYMid slice"
        clip-path="url(#photoClip)"

    />
</g>
`;
}

function loadPhoto(
    photo?: string
): string | null {
    if (!photo) {
        return null;
    }

    const absolutePath = path.resolve(
        Paths.root,
        photo
    );

    if (!fs.existsSync(absolutePath)) {
        return null;
    }

    const extension = path
        .extname(absolutePath)
        .toLowerCase();

    const mimeType =
        extension === ".jpg" ||
        extension === ".jpeg"
            ? "image/jpeg"
            : "image/png";

    const base64 = fs
        .readFileSync(absolutePath)
        .toString("base64");

    return `data:${mimeType};base64,${base64}`;
}

function renderMultiline(
    text: string,
    x: number,
    startY: number,
    fontSize: number,
    color: string,
    maxLength: number
): string {
    const lines = wrap(text, maxLength);

    return lines
        .map((line, index) => {
            const y =
                startY +
                index * (fontSize + 10);

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
