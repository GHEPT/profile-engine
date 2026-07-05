import type { RuntimeProfile } from "../types/Profile";

export const CONTACT_HEIGHT = 280;

export function renderContactSvgContent(
    profile: RuntimeProfile
): string {
    return `
    ${renderSectionTitle()}

    <text
        x="48"
        y="102"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="17"
        fill="#CBD5E1"
    >
        I’m always open to meaningful conversations, new ideas and impactful collaborations.
    </text>

    ${renderContactItem(
        48,
        164,
        "LinkedIn",
        linkedinIcon(),
        profile.contact.linkedin
            .replace(/^https?:\/\/(www\.)?linkedin\.com\/in/, "")
    )}

    ${renderContactItem(
        338,
        164,
        "Email",
        emailIcon(),
        profile.contact.email
    )}

    ${renderContactItem(
        648,
        164,
        "Website",
        websiteIcon(),
        profile.contact.website.replace(
            /^https?:\/\//,
            ""
        )
    )}

    ${renderContactItem(
        908,
        164,
        "Location",
        locationIcon(),
        profile.contact.location
    )}

    <text
        x="600"
        y="252"
        text-anchor="middle"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="18"
        font-style="italic"
        fill="#CBD5E1"
    >
        “Clarity is the foundation. Systems are the path. Impact is the destination.”
    </text>
`.trim();
}

function renderSectionTitle(): string {
    return `
    <rect
        x="48"
        y="38"
        width="4"
        height="32"
        rx="2"
        fill="#238BFF"
    />

    <text
        x="64"
        y="65"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="25"
        font-weight="700"
        fill="#F8FAFC"
    >
        Let’s Connect
    </text>
`;
}

function renderContactItem(
    x: number,
    y: number,
    label: string,
    icon: string,
    value: string
): string {
    return `
    <g transform="translate(${x}, ${y})">
        ${icon}

        <text
            x="44"
            y="-8"
            font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
            font-size="15"
            fill="#94A3B8"
        >
            ${escape(label)}
        </text>

        <text
            x="44"
            y="17"
            font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
            font-size="14"
            fill="#F8FAFC"
        >
            ${escape(value)}
        </text>
    </g>
`;
}

function linkedinIcon(): string {
    return `
    <rect
        x="0"
        y="-20"
        width="30"
        height="30"
        rx="5"
        fill="none"
        stroke="#238BFF"
        stroke-width="2"
    />

    <text
        x="15"
        y="3"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="17"
        font-weight="700"
        fill="#238BFF"
    >
        in
    </text>
`;
}

function emailIcon(): string {
    return `
    <rect
        x="0"
        y="-18"
        width="32"
        height="24"
        rx="3"
        fill="none"
        stroke="#3B82F6"
        stroke-width="2"
    />

    <path
        d="M2 -15 L16 -4 L30 -15"
        fill="none"
        stroke="#3B82F6"
        stroke-width="2"
        stroke-linejoin="round"
    />
`;
}

function websiteIcon(): string {
    return `
    <circle
        cx="15"
        cy="-5"
        r="15"
        fill="none"
        stroke="#3B82F6"
        stroke-width="2"
    />

    <path
        d="M0 -5 H30 M15 -20 C9 -15 9 5 15 10 M15 -20 C21 -15 21 5 15 10"
        fill="none"
        stroke="#3B82F6"
        stroke-width="2"
    />
`;
}

function locationIcon(): string {
    return `
    <path
        d="M15 -20 C7 -20 1 -14 1 -6 C1 4 15 12 15 12 C15 12 29 4 29 -6 C29 -14 23 -20 15 -20 Z"
        fill="none"
        stroke="#3B82F6"
        stroke-width="2"
    />

    <circle
        cx="15"
        cy="-6"
        r="4"
        fill="none"
        stroke="#3B82F6"
        stroke-width="2"
    />
`;
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
