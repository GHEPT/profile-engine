import fs from "node:fs";

import { Badge } from "../components/Badge";

import { Paths } from "../constants/Paths";

import type { Config } from "../types/Config";
import type { RuntimeProfile } from "../types/Profile";

export function generateSkills(
    profile: RuntimeProfile,
    config?: Config
): string {
    generateSkillsSvg(profile, config);

    const sections: string[] = [];

    sections.push("## Skills");
    sections.push("");

    sections.push(
        "The technologies below represent the tools I use most frequently when building products, backend systems and automation platforms."
    );

    sections.push("");

    sections.push('<p align="center">');
    sections.push("");
    sections.push(
        '<img src="./assets/generated/skills.svg" alt="Skills" width="100%" />'
    );
    sections.push("");
    sections.push("</p>");
    sections.push("");

    appendGroup(
        sections,
        profile.technicalExpertise.languages.title,
        profile.technicalExpertise.languages.items
    );

    appendGroup(
        sections,
        profile.technicalExpertise.backend.title,
        profile.technicalExpertise.backend.items
    );

    appendGroup(
        sections,
        profile.technicalExpertise.data.title,
        profile.technicalExpertise.data.items
    );

    appendGroup(
        sections,
        profile.technicalExpertise.practices.title,
        profile.technicalExpertise.practices.items
    );

    return sections.join("\n");
}

function appendGroup(
    output: string[],
    title: string,
    technologies: string[]
): void {
    output.push(`### ${title}`);
    output.push("");

    const badges = technologies.map((technology) =>
        new Badge({
            label: technology,
            logo: logo(technology),
            style: "flat"
        }).render()
    );

    output.push(badges.join(" "));
    output.push("");
}

function generateSkillsSvg(
    profile: RuntimeProfile,
    config?: Config
): void {
    const enabled =
        config?.svg.skills.enabled ?? true;

    if (!enabled) {
        return;
    }

    const svg = buildSkillsSvg(profile);

    fs.mkdirSync(Paths.generated, {
        recursive: true
    });

    fs.writeFileSync(
        `${Paths.generated}/skills.svg`,
        svg,
        "utf8"
    );
}

function buildSkillsSvg(
    profile: RuntimeProfile
): string {
    const groups = [
        profile.technicalExpertise.languages,
        profile.technicalExpertise.backend,
        profile.technicalExpertise.data,
        profile.technicalExpertise.practices
    ];

    const rowHeight = 52;
    const header = 56;

    const height =
        header +
        groups.reduce(
            (total, group) =>
                total + 42 + group.items.length * rowHeight,
            0
        ) +
        24;

    let y = 44;

    const body: string[] = [];

    for (const group of groups) {
        body.push(`
<text
    x="42"
    y="${y}"
    font-size="20"
    font-weight="700"
    fill="#FFFFFF"
>
${escape(group.title)}
</text>
`);

        y += 34;

        for (const item of group.items) {
            body.push(`
<circle
    cx="50"
    cy="${y - 6}"
    r="5"
    fill="#38BDF8"
/>

<text
    x="66"
    y="${y}"
    font-size="16"
    fill="#CBD5E1"
>
${escape(item)}
</text>
`);

            y += rowHeight;
        }

        y += 10;
    }

    return `
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="1200"
    height="${height}"
    viewBox="0 0 1200 ${height}"
>

<rect
    width="1200"
    height="${height}"
    rx="24"
    fill="#0F172A"
/>

${body.join("\n")}

</svg>
`.trim();
}

function logo(
    technology: string
): string {
    const map: Record<string, string> = {
        Java: "openjdk",
        TypeScript: "typescript",
        JavaScript: "javascript",
        SQL: "postgresql",

        "Spring Boot": "springboot",
        Docker: "docker",
        Linux: "linux",
        PostgreSQL: "postgresql",
        Redis: "redis",
        Supabase: "supabase",
        Git: "git",
        AWS: "amazonaws",
        Agile: "jira"
    };

    return map[technology] ?? technology.toLowerCase();
}

function escape(
    value: string
): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}