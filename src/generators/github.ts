import { Image } from "../components/Image";

import type { RuntimeProfile } from "../types/Profile";

export function generateGithub(
    profile: RuntimeProfile
): string {
    const username = profile.githubUsername;

    const sections: string[] = [];

    sections.push("## GitHub");
    sections.push("");

    sections.push(
        "My public repositories document ideas, experiments, products and reusable software architecture."
    );

    sections.push("");

    sections.push(renderStats(username));
    sections.push("");

    sections.push(renderLanguages(username));
    sections.push("");

    sections.push(renderStreak(username));
    sections.push("");

    sections.push(renderActivity(username));
    sections.push("");

    sections.push("### Engineering Principles");
    sections.push("");

    sections.push("- Build reusable systems");
    sections.push("- Prefer composition over inheritance");
    sections.push("- Separate content from rendering");
    sections.push("- Keep architecture deterministic");
    sections.push("- Document everything");
    sections.push("- Automate repetitive work");

    sections.push("");

    sections.push("### Open Source");
    sections.push("");

    sections.push(
        "Every public repository represents an idea that has been organized, documented and intentionally engineered."
    );

    return sections.join("\n");
}

function renderStats(
    username: string
): string {
    return new Image({
        align: "center",

        width: "100%",

        alt: "GitHub Stats",

        src:
            "https://github-readme-stats.vercel.app/api" +
            `?username=${username}` +
            "&show_icons=true" +
            "&hide_border=true" +
            "&count_private=true" +
            "&include_all_commits=true" +
            "&theme=github_dark"
    }).render();
}

function renderLanguages(
    username: string
): string {
    return new Image({
        align: "center",

        width: "100%",

        alt: "Top Languages",

        src:
            "https://github-readme-stats.vercel.app/api/top-langs/" +
            `?username=${username}` +
            "&layout=compact" +
            "&hide_border=true" +
            "&langs_count=10" +
            "&theme=github_dark"
    }).render();
}

function renderStreak(
    username: string
): string {
    return new Image({
        align: "center",

        width: "100%",

        alt: "GitHub Streak",

        src:
            "https://streak-stats.demolab.com" +
            `?user=${username}` +
            "&hide_border=true" +
            "&theme=github-dark-blue"
    }).render();
}

function renderActivity(
    username: string
): string {
    return new Image({
        align: "center",

        width: "100%",

        alt: "GitHub Activity Graph",

        src:
            "https://github-readme-activity-graph.vercel.app/graph" +
            `?username=${username}` +
            "&theme=github-compact" +
            "&hide_border=true"
    }).render();
}