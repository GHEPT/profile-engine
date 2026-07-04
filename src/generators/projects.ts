import fs from "node:fs";

import { Paths } from "../constants/Paths";

import { renderTemplate } from "../renderers/markdown";

import type { Project } from "../types/Project";

export function generateProjects(
    projects: Project[]
): string {
    const template = loadTemplate();

    const featured = projects.filter(
        (project) => project.featured
    );

    return renderTemplate(template, {
        projects: {
            intro:
                "The following projects represent the products, platforms and systems that best reflect the way I approach software engineering.",

            featured: renderProjects(featured),

            technologies: renderTechnologies(projects)
        }
    });
}

function loadTemplate(): string {
    return fs.readFileSync(
        Paths.readme.projects,
        "utf8"
    );
}

function renderProjects(
    projects: Project[]
): string {
    return projects
        .map(renderProject)
        .join("\n\n");
}

function renderProject(
    project: Project
): string {
    const lines: string[] = [];

    lines.push(`### ${project.name}`);
    lines.push("");

    lines.push(project.description);

    lines.push("");

    lines.push("| Property | Value |");
    lines.push("|:---------|:------|");
    lines.push(`| Category | ${project.category} |`);
    lines.push(`| Status | ${project.status} |`);
    lines.push(
        `| Technologies | ${project.technologies.join(", ")} |`
    );

    const links = buildLinks(project);

    if (links.length > 0) {
        lines.push("");
        lines.push(links.join(" • "));
    }

    return lines.join("\n");
}

function buildLinks(
    project: Project
): string[] {
    const links: string[] = [];

    if (project.links.website) {
        links.push(
            `[Website](${project.links.website})`
        );
    }

    if (project.links.repository) {
        links.push(
            `[Repository](${project.links.repository})`
        );
    }

    if (project.links.demo) {
        links.push(
            `[Demo](${project.links.demo})`
        );
    }

    return links;
}

function renderTechnologies(
    projects: Project[]
): string {
    const technologies = Array.from(
        new Set(
            projects.flatMap(
                (project) => project.technologies
            )
        )
    ).sort();

    return technologies
        .map(
            (technology) => `- ${technology}`
        )
        .join("\n");
}