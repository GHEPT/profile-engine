import type { RuntimeProfile } from "../types/Profile";

import {
    HERO_HEIGHT,
    renderHeroSvgContent
} from "./heroSvg";

import {
    ABOUT_HEIGHT,
    renderAboutSvgContent
} from "./aboutSvg";

import {
    JOURNEY_HEIGHT,
    renderJourneySvgContent
} from "./journeySvg";

import type { Journey } from "../types/Journey";
import type { Project } from "../types/Project";

import {
    OVERVIEW_HEIGHT,
    renderOverviewSvgContent
} from "./overviewSvg";

import {
    CONTACT_HEIGHT,
    renderContactSvgContent
} from "./contactSvg";

const WIDTH = 1200;

export function generateProfileSvg(
    profile: RuntimeProfile,
    journey: Journey,
    projects: Project[]
): string {
    const height =
        HERO_HEIGHT +
        ABOUT_HEIGHT +
        JOURNEY_HEIGHT +
        OVERVIEW_HEIGHT +
        CONTACT_HEIGHT;

    return `
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${WIDTH}"
    height="${height}"
    viewBox="0 0 ${WIDTH} ${height}"
    role="img"
    aria-labelledby="profile-title profile-description"
>
    <title id="profile-title">${escape(profile.name)}</title>

    <desc id="profile-description">
        ${escape(profile.headline)}
    </desc>

    <defs>
        <linearGradient
            id="profileBackground"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
        >
            <stop offset="0%" stop-color="#0B1020" />
            <stop offset="55%" stop-color="#111A35" />
            <stop offset="100%" stop-color="#07111F" />
        </linearGradient>
    </defs>

    <rect
        width="${WIDTH}"
        height="${height}"
        rx="24"
        fill="url(#profileBackground)"
    />

    ${renderHeroSvgContent(profile, false)}

    <g transform="translate(0, ${HERO_HEIGHT})">
        ${renderAboutSvgContent(profile, false)}
    </g>

    <g transform="translate(0, ${HERO_HEIGHT + ABOUT_HEIGHT})">
        ${renderJourneySvgContent(journey)}
    </g>

    <g transform="translate(0, ${HERO_HEIGHT + ABOUT_HEIGHT + JOURNEY_HEIGHT})">
        ${renderOverviewSvgContent(profile, projects)}
    </g>

    <g transform="translate(0, ${HERO_HEIGHT + ABOUT_HEIGHT + JOURNEY_HEIGHT + OVERVIEW_HEIGHT})">
        ${renderContactSvgContent(profile)}
    </g>
</svg>
`.trim();
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
