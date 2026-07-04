import fs from "node:fs";
import path from "node:path";

import yaml from "js-yaml";

import { Paths } from "../constants/Paths";

import type {
    Social,
    SocialProfile
} from "../types/Social";

export function loadSocial(): Social {
    const social = readYaml<Social>(Paths.social);

    validateSocial(social);

    return {
        ...social,
        profiles: normalizeProfiles(
            social.profiles,
            social.settings.sortPrimaryFirst
        )
    };
}

function readYaml<T>(file: string): T {
    if (!fs.existsSync(file)) {
        throw new Error(`Social file not found: ${relative(file)}`);
    }

    const source = fs.readFileSync(file, "utf8");

    if (!source.trim()) {
        throw new Error(`Social file is empty: ${relative(file)}`);
    }

    const parsed = yaml.load(source);

    if (!parsed || typeof parsed !== "object") {
        throw new Error(`Invalid YAML: ${relative(file)}`);
    }

    return parsed as T;
}

function validateSocial(social: Social): void {
    requireString(social.title, "social.title");

    if (social.subtitle !== undefined) {
        requireString(social.subtitle, "social.subtitle");
    }

    if (!Array.isArray(social.profiles)) {
        throw new Error("social.profiles must be an array.");
    }

    for (const profile of social.profiles) {
        validateProfile(profile);
    }

    requireSettings(social);
    requireFooter(social);
}

function validateProfile(profile: SocialProfile): void {
    requireString(profile.id, "profile.id");
    requireString(profile.label, "profile.label");
    requireString(profile.username, "profile.username");
    requireString(profile.url, "profile.url");
    requireString(profile.icon, "profile.icon");

    if (typeof profile.visible !== "boolean") {
        throw new Error(
            `Profile '${profile.id}' must define 'visible' as boolean.`
        );
    }

    if (typeof profile.primary !== "boolean") {
        throw new Error(
            `Profile '${profile.id}' must define 'primary' as boolean.`
        );
    }
}

function requireSettings(social: Social): void {
    const settings = social.settings;

    if (!settings) {
        throw new Error("Missing social.settings.");
    }

    if (typeof settings.openLinksInNewTab !== "boolean") {
        throw new Error("settings.openLinksInNewTab must be boolean.");
    }

    if (typeof settings.showIcons !== "boolean") {
        throw new Error("settings.showIcons must be boolean.");
    }

    if (typeof settings.showLabels !== "boolean") {
        throw new Error("settings.showLabels must be boolean.");
    }

    if (typeof settings.sortPrimaryFirst !== "boolean") {
        throw new Error("settings.sortPrimaryFirst must be boolean.");
    }

    requireString(settings.separator, "settings.separator");
}

function requireFooter(social: Social): void {
    if (!social.footer) {
        throw new Error("Missing social.footer.");
    }

    requireString(
        social.footer.message,
        "footer.message"
    );
}

function normalizeProfiles(
    profiles: SocialProfile[],
    sortPrimaryFirst: boolean
): SocialProfile[] {
    const normalized = profiles.map((profile) => ({
        ...profile,
        id: profile.id.trim(),
        label: profile.label.trim(),
        username: profile.username.trim(),
        url: profile.url.trim(),
        icon: profile.icon.trim()
    }));

    if (!sortPrimaryFirst) {
        return normalized;
    }

    return normalized.sort((a, b) => {
        if (a.primary === b.primary) {
            return a.label.localeCompare(b.label);
        }

        return a.primary ? -1 : 1;
    });
}

function requireString(
    value: unknown,
    field: string
): void {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`Missing required field: ${field}`);
    }
}

function relative(file: string): string {
    return path.relative(process.cwd(), file);
}