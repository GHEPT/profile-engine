import type { RuntimeProfile } from "../types/Profile";

const WIDTH = 1200;
export const ABOUT_HEIGHT = 310;

export function generateAboutSvg(
    profile: RuntimeProfile
): string {
    return `
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${WIDTH}"
    height="${ABOUT_HEIGHT}"
    viewBox="0 0 ${WIDTH} ${ABOUT_HEIGHT}"
    role="img"
    aria-labelledby="about-title about-description"
>
    <title id="about-title">${escape(profile.about.title)}</title>

    <desc id="about-description">
        ${escape(profile.about.intro)}
    </desc>

    ${renderAboutSvgContent(profile)}
</svg>
`.trim();
}

export function renderAboutSvgContent(
    profile: RuntimeProfile,
    includeBackground = true
): string {
    return `
    ${includeBackground ? `
    <rect
        width="${WIDTH}"
        height="${ABOUT_HEIGHT}"
        fill="#07111F"
    />
    ` : ""}

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
        ${escape(profile.about.title)}
    </text>

    ${profile.about.items
        .map((item, index) =>
            renderItem(
                item.icon,
                item.text,
                index
            )
        )
        .join("")}

    <line
        x1="24"
        y1="294"
        x2="1176"
        y2="294"
        stroke="#94A3B8"
        stroke-opacity="0.16"
    />
`.trim();
}

function renderItem(
    icon: string,
    text: string,
    index: number
): string {
    const y = 104 + index * 48;

    return `
<g transform="translate(40, ${y})">
    ${renderIcon(icon)}

    <text
        x="64"
        y="8"
        font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="18"
        fill="#CBD5E1"
    >
        ${escape(text)}
    </text>
</g>
`;
}

function renderIcon(
    icon: string
): string {
    const icons: Record<string, string> = {
        target: `
<circle
    cx="18"
    cy="0"
    r="14"
    fill="none"
    stroke="#8B5CF6"
    stroke-width="3"
/>
<circle
    cx="18"
    cy="0"
    r="6"
    fill="none"
    stroke="#8B5CF6"
    stroke-width="3"
/>
<path
    d="M27 -10 L37 -20 M31 -20 H37 V-14"
    fill="none"
    stroke="#8B5CF6"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
/>
`,

        cube: `
<path
    d="M18 -16 L34 -7 L34 11 L18 20 L2 11 L2 -7 Z"
    fill="none"
    stroke="#6366F1"
    stroke-width="3"
    stroke-linejoin="round"
/>
<path
    d="M2 -7 L18 2 L34 -7 M18 2 V20"
    fill="none"
    stroke="#6366F1"
    stroke-width="3"
    stroke-linejoin="round"
/>
`,

        growth: `
<path
    d="M2 14 L13 3 L21 10 L36 -7"
    fill="none"
    stroke="#6366F1"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
/>
<path
    d="M27 -7 H36 V2"
    fill="none"
    stroke="#6366F1"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
/>
`,

        people: `
<circle
    cx="12"
    cy="-7"
    r="7"
    fill="none"
    stroke="#6366F1"
    stroke-width="3"
/>
<circle
    cx="28"
    cy="-5"
    r="6"
    fill="none"
    stroke="#6366F1"
    stroke-width="3"
/>
<path
    d="M0 17 C1 7 6 3 12 3 C19 3 23 8 24 17"
    fill="none"
    stroke="#6366F1"
    stroke-width="3"
    stroke-linecap="round"
/>
<path
    d="M25 5 C33 5 38 9 39 17"
    fill="none"
    stroke="#6366F1"
    stroke-width="3"
    stroke-linecap="round"
/>
`
    };

    return icons[icon] ?? icons.target;
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
