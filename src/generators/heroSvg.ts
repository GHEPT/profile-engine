import fs from "node:fs";
import path from "node:path";

import { Paths } from "../constants/Paths";

import type { RuntimeProfile } from "../types/Profile";

const WIDTH = 1200;

export const HERO_HEIGHT = 440;

export function generateHeroSvg(
    profile: RuntimeProfile
): string {
    return `
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${WIDTH}"
    height="${HERO_HEIGHT}"
    viewBox="0 0 ${WIDTH} ${HERO_HEIGHT}"
    role="img"
    aria-labelledby="title description"
>
    <title id="title">${escape(profile.name)}</title>

    <desc id="description">
        ${escape(profile.headline)}
    </desc>

    ${renderHeroSvgContent(profile)}
</svg>
`.trim();
}

export function renderHeroSvgContent(
    profile: RuntimeProfile,
    includeBackground = true
): string {
    const photo = loadPhoto(profile.photo);

    return `
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

        <linearGradient
            id="photoBorderGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
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

        <clipPath id="photoClip">
            <circle
                cx="1010"
                cy="165"
                r="125"
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
                dy="12"
                stdDeviation="20"
                flood-color="#000000"
                flood-opacity="0.35"
            />
        </filter>
    </defs>

    ${includeBackground ? `
    <rect
        width="${WIDTH}"
        height="${HERO_HEIGHT}"
        rx="24"
        fill="url(#background)"
    />

    <rect
        width="${WIDTH}"
        height="${HERO_HEIGHT}"
        rx="24"
        fill="url(#glow)"
    />
    ` : ""}

    <g transform="translate(48, 72)">
        <text
            x="0"
            y="10"
            font-family="Arial Narrow, Liberation Sans Narrow, Inter, Segoe UI, Helvetica, Arial, sans-serif"
            font-size="58"
            font-weight="700"
            letter-spacing="-1"
            fill="#FFFFFF"
        >
            ${escape(profile.name)}
        </text>

        ${renderHeadline()}

        <line
            x1="-24"
            y1="218"
            x2="700"
            y2="218"
            stroke="#FFFFFF"
            stroke-opacity="0.14"
        />

        ${renderProfessionalLine()}

    </g>

    ${renderPhoto(photo)}

    <line
        x1="24"
        y1="385"
        x2="1176"
        y2="385"
        stroke="#FFFFFF"
        stroke-opacity="0.12"
    />
`.trim();
}

function renderHeadline(): string {
    return `
    <text
        x="0"
        y="92"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="28"
        font-weight="400"
        fill="#CBD5E1"
    >
        I build
        <tspan fill="#60A5FA"> products</tspan>
        and
        <tspan fill="#60A5FA"> intelligent systems</tspan>
        that help
    </text>

    <text
        x="0"
        y="132"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="28"
        font-weight="400"
        fill="#CBD5E1"
    >
        businesses
        <tspan fill="#60A5FA"> understand themselves</tspan>,
        make better
    </text>

    <text
        x="0"
        y="172"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="28"
        font-weight="400"
        fill="#CBD5E1"
    >
        decisions and
        <tspan fill="#60A5FA"> evolve continuously</tspan>.
    </text>
`;
}

function renderProfessionalLine(): string {
    return `
    <g transform="translate(0, 264)">
        ${renderBriefcaseIcon(0, 0)}

        <text
            x="30"
            y="6"
            font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
            font-size="17"
            font-weight="500"
            fill="#CBD5E1"
        >
            Software Engineer
        </text>

        ${renderCubeIcon(205, 0)}

        <text
            x="237"
            y="6"
            font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
            font-size="17"
            font-weight="500"
            fill="#CBD5E1"
        >
            Founder @ Teo Logic
        </text>

        ${renderTargetIcon(445, 0)}

        <text
            x="477"
            y="6"
            font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
            font-size="17"
            font-weight="500"
            fill="#CBD5E1"
        >
            Operational Intelligence
        </text>
    </g>
`;
}

function renderBriefcaseIcon(
    x: number,
    y: number
): string {
    return `
    <g
        transform="translate(${x}, ${y - 10})"
        fill="none"
        stroke="#3B82F6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <rect
            x="1"
            y="6"
            width="20"
            height="14"
            rx="2"
        />

        <path d="M7 6V3h8v3" />

        <path d="M1 11h20" />
    </g>
`;
}

function renderCubeIcon(
    x: number,
    y: number
): string {
    return `
    <g
        transform="translate(${x}, ${y - 11})"
        fill="none"
        stroke="#6366F1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M11 1 21 7 11 13 1 7Z" />

        <path d="M1 7v11l10 6 10-6V7" />

        <path d="M11 13v11" />
    </g>
`;
}

function renderTargetIcon(
    x: number,
    y: number
): string {
    return `
    <g
        transform="translate(${x}, ${y - 11})"
        fill="none"
        stroke="#8B5CF6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <circle
            cx="11"
            cy="13"
            r="9"
        />

        <circle
            cx="11"
            cy="13"
            r="4"
        />

        <path d="M15 9 22 2" />

        <path d="M17 2h5v5" />
    </g>
`;
}

function renderPhoto(
    photo: string | null
): string {
    if (!photo) {
        return "";
    }

    return `
<g>
    <circle
        cx="1010"
        cy="165"
        r="128"
        fill="none"
        stroke="url(#photoBorderGradient)"
        stroke-width="2"
    />

    <image
        href="${photo}"
        x="885"
        y="40"
        width="250"
        height="250"
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
