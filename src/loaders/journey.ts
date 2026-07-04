import fs from "node:fs";
import path from "node:path";

import yaml from "js-yaml";

import { Paths } from "../constants/Paths";

import type {
    Journey,
    JourneyStep
} from "../types/Journey";

export function loadJourney(): Journey {
    const journey = readYaml<Journey>(Paths.journey);

    validateJourney(journey);

    return {
        ...journey,
        timeline: journey.timeline.map(normalizeStep)
    };
}

function readYaml<T>(file: string): T {
    if (!fs.existsSync(file)) {
        throw new Error(`Journey file not found: ${relative(file)}`);
    }

    const source = fs.readFileSync(file, "utf8");

    if (!source.trim()) {
        throw new Error(`Journey file is empty: ${relative(file)}`);
    }

    const parsed = yaml.load(source);

    if (!parsed || typeof parsed !== "object") {
        throw new Error(`Invalid YAML: ${relative(file)}`);
    }

    return parsed as T;
}

function validateJourney(journey: Journey): void {
    requireString(journey.title, "journey.title");

    if (journey.subtitle !== undefined) {
        requireString(journey.subtitle, "journey.subtitle");
    }

    if (!Array.isArray(journey.timeline)) {
        throw new Error("journey.timeline must be an array.");
    }

    if (journey.timeline.length === 0) {
        throw new Error("journey.timeline cannot be empty.");
    }

    for (const step of journey.timeline) {
        validateStep(step);
    }
}

function validateStep(step: JourneyStep): void {
    requireString(step.year, "timeline.year");
    requireString(step.title, "timeline.title");
    requireString(step.organization, "timeline.organization");
    requireString(step.description, "timeline.description");

    if (!Array.isArray(step.highlights)) {
        throw new Error(
            `Timeline '${step.year}' must contain a highlights array.`
        );
    }
}

function normalizeStep(step: JourneyStep): JourneyStep {
    return {
        year: step.year.trim(),
        title: step.title.trim(),
        organization: step.organization.trim(),
        description: step.description.trim(),
        highlights: step.highlights
            .map((highlight) => highlight.trim())
            .filter(Boolean)
    };
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