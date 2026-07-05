import fs from "node:fs";

import { Paths } from "../constants/Paths";

import { generateAboutSvg } from "./aboutSvg";

import type { RuntimeProfile } from "../types/Profile";

export function generateAbout(
    profile: RuntimeProfile
): string {
    const svg = generateAboutSvg(profile);

    fs.mkdirSync(Paths.generated, {
        recursive: true
    });

    fs.writeFileSync(
        `${Paths.generated}/about.svg`,
        svg,
        "utf8"
    );

    return `
<p align="center">
    <img
        src="./assets/generated/about.svg"
        alt="${profile.about.title}"
        width="100%"
    />
</p>
`.trim();
}
