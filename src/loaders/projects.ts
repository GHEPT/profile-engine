import fs from "node:fs";
import path from "node:path";

import yaml from "js-yaml";

import { Paths } from "../constants/Paths";

import type { Project } from "../types/Project";

interface ProjectsDocument {
    projects: Project[];
}

export function loadProjects(): Project[] {
    const document = readYaml<ProjectsDocument>(Paths.projects);

    if (!Array.isArray(document.projects)) {
        throw new Error(
            "projects.yml must contain a top-level 'projects' array."
        );
    }

    const projects = document.projects.map(normalizeProject);

    validateUniqueIds(projects);

    return projects;
}

function readYaml<T>(file: string): T {
    if (!fs.existsSync(file)) {
        throw new Error(`Projects file not found: ${relative(file)}`);
    }

    const source = fs.readFileSync(file, "utf8");

    if (!source.trim()) {
        throw new Error(`Projects file is empty: ${relative(file)}`);
    }

    const parsed = yaml.load(source);

    if (!parsed || typeof parsed !== "object") {
        throw new Error(`Invalid YAML: ${relative(file)}`);
    }

    return parsed as T;
}

function normalizeProject(project: Project): Project {
    requireString(project.id, "project.id");
    requireString(project.name, "project.name");
    requireString(project.category, "project.category");
    requireString(project.status, "project.status");
    requireString(project.description, "project.description");

    if (!Array.isArray(project.technologies)) {
        throw new Error(
            `Project '${project.id}' must contain a technologies array.`
        );
    }

    const technologies = project.technologies
        .map((technology) => technology.trim())
        .filter(Boolean);

    return {
        ...project,

        featured: Boolean(project.featured),

        technologies,

        links: {
            website: normalizeOptional(project.links?.website),
            repository: normalizeOptional(project.links?.repository),
            demo: normalizeOptional(project.links?.demo)
        }
    };
}

function validateUniqueIds(projects: Project[]): void {
    const ids = new Set<string>();

    for (const project of projects) {
        if (ids.has(project.id)) {
            throw new Error(
                `Duplicate project id '${project.id}' found in projects.yml.`
            );
        }

        ids.add(project.id);
    }
}

function normalizeOptional(
    value: string | undefined
): string | undefined {
    if (!value) {
        return undefined;
    }

    const normalized = value.trim();

    return normalized.length === 0
        ? undefined
        : normalized;
}

function requireString(
    value: unknown,
    field: string
): void {
    if (typeof value !== "string" || value.trim() === "") {
        throw new Error(`Missing required field: ${field}`);
    }
}

function relative(file: string): string {
    return path.relative(process.cwd(), file);
}