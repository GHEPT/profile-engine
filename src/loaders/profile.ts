import fs from "node:fs";
import path from "node:path";

import yaml from "js-yaml";

import { Paths } from "../constants/Paths";

import type {
    Contact,
    Profile,
    RuntimeProfile
} from "../types/Profile";

export function loadProfile(): RuntimeProfile {
    const profile = readYaml<Profile>(Paths.profile);

    validateProfile(profile);

    return {
        ...profile,
        githubUsername: extractGithubUsername(profile.contact.github)
    };
}

function readYaml<T>(file: string): T {
    if (!fs.existsSync(file)) {
        throw new Error(`Profile file not found: ${relative(file)}`);
    }

    const source = fs.readFileSync(file, "utf8");

    if (!source.trim()) {
        throw new Error(`Profile file is empty: ${relative(file)}`);
    }

    const parsed = yaml.load(source);

    if (!parsed || typeof parsed !== "object") {
        throw new Error(`Invalid YAML: ${relative(file)}`);
    }

    return parsed as T;
}

function validateProfile(profile: Profile): void {
    requireString(profile.name, "name");
    requireString(profile.headline, "headline");
    requireString(profile.tagline, "tagline");
    requireString(profile.quote, "quote");

    if (!Array.isArray(profile.roles)) {
        throw new Error("profile.roles must be an array.");
    }

    validateAbout(profile);
    validateCurrentFocus(profile);
    validateTechnicalExpertise(profile);
    validateBuilding(profile);
    validateContact(profile.contact);
}

function validateAbout(profile: Profile): void {
    requireString(profile.about.title, "about.title");
    requireString(profile.about.intro, "about.intro");

    if (!Array.isArray(profile.about.items)) {
        throw new Error("about.items must be an array.");
    }

    for (const item of profile.about.items) {
        requireString(item.icon, "about.items.icon");
        requireString(item.text, "about.items.text");
    }
}

function validateCurrentFocus(profile: Profile): void {
    requireString(profile.currentFocus.title, "currentFocus.title");

    if (!Array.isArray(profile.currentFocus.items)) {
        throw new Error("currentFocus.items must be an array.");
    }
}

function validateTechnicalExpertise(profile: Profile): void {
    validateSkillGroup(profile.technicalExpertise.languages, "languages");
    validateSkillGroup(profile.technicalExpertise.backend, "backend");
    validateSkillGroup(profile.technicalExpertise.data, "data");
    validateSkillGroup(profile.technicalExpertise.practices, "practices");
}

function validateSkillGroup(
    group: {
        title: string;
        items: string[];
    },
    name: string
): void {
    requireString(group.title, `${name}.title`);

    if (!Array.isArray(group.items)) {
        throw new Error(`${name}.items must be an array.`);
    }
}

function validateBuilding(profile: Profile): void {
    requireString(profile.building.title, "building.title");
    requireString(profile.building.description, "building.description");
}

function validateContact(contact: Contact): void {
    requireString(contact.email, "contact.email");
    requireString(contact.website, "contact.website");
    requireString(contact.linkedin, "contact.linkedin");
    requireString(contact.github, "contact.github");
    requireString(contact.location, "contact.location");
}

function requireString(value: unknown, field: string): void {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`Missing required field: ${field}`);
    }
}

function extractGithubUsername(linkedin: string): string {
    /**
     * Nesta primeira versão do engine,
     * utilizamos o mesmo identificador do LinkedIn.
     *
     * Posteriormente o Config poderá permitir
     * um githubUsername explícito.
     */
    const parts = linkedin
        .replace(/\/+$/, "")
        .split("/");

    return parts[parts.length - 1];
}

function relative(file: string): string {
    return path.relative(process.cwd(), file);
}