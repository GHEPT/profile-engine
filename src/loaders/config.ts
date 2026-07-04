import fs from "node:fs";
import path from "node:path";

import yaml from "js-yaml";

import { Paths } from "../constants/Paths";

import type {
    Config,
    SvgAssetConfig
} from "../types/Config";

export function loadConfig(): Config {
    const config = readYaml<Config>(Paths.config);

    validateConfig(config);

    return config;
}

function readYaml<T>(file: string): T {
    if (!fs.existsSync(file)) {
        throw new Error(`Config file not found: ${relative(file)}`);
    }

    const source = fs.readFileSync(file, "utf8");

    if (!source.trim()) {
        throw new Error(`Config file is empty: ${relative(file)}`);
    }

    const parsed = yaml.load(source);

    if (!parsed || typeof parsed !== "object") {
        throw new Error(`Invalid YAML: ${relative(file)}`);
    }

    return parsed as T;
}

function validateConfig(config: Config): void {
    validateProject(config);
    validatePaths(config);
    validateRender(config);
    validateSvg(config);
    validateEngine(config);
    validateMarkdown(config);
    validateFeatures(config);
}

function validateProject(config: Config): void {
    requireString(config.project.name, "project.name");
    requireString(config.project.version, "project.version");
    requireString(config.project.description, "project.description");
    requireString(config.project.author, "project.author");
}

function validatePaths(config: Config): void {
    const paths = config.paths;

    requireString(paths.assets, "paths.assets");
    requireString(paths.generated, "paths.generated");

    requireString(paths.content, "paths.content");

    requireString(paths.profile, "paths.profile");
    requireString(paths.projects, "paths.projects");
    requireString(paths.journey, "paths.journey");
    requireString(paths.social, "paths.social");

    requireString(paths.readme.hero, "paths.readme.hero");
    requireString(paths.readme.about, "paths.readme.about");
    requireString(paths.readme.projects, "paths.readme.projects");
    requireString(paths.readme.github, "paths.readme.github");
    requireString(paths.readme.footer, "paths.readme.footer");
    
    requireString(paths.output.readme, "paths.output.readme");
}

function validateRender(config: Config): void {
    const render = config.render;

    if (typeof render.lineBreak !== "string") {
        throw new Error("render.lineBreak must be a string.");
    }

    if (render.sectionSpacing < 1) {
        throw new Error(
            "render.sectionSpacing must be greater than zero."
        );
    }
}

function validateSvg(config: Config): void {
    validateSvgAsset(config.svg.hero, "svg.hero");
    validateSvgAsset(config.svg.skills, "svg.skills");
    validateSvgAsset(config.svg.timeline, "svg.timeline");
}

function validateSvgAsset(
    asset: SvgAssetConfig,
    field: string
): void {
    if (typeof asset.enabled !== "boolean") {
        throw new Error(`${field}.enabled must be boolean.`);
    }

    requireString(asset.output, `${field}.output`);
}

function validateEngine(config: Config): void {
    const engine = config.engine;

    requireBoolean(engine.overwriteOutput, "engine.overwriteOutput");
    requireBoolean(engine.createDirectories, "engine.createDirectories");
    requireBoolean(engine.failOnMissingContent, "engine.failOnMissingContent");
    requireBoolean(engine.deterministicOutput, "engine.deterministicOutput");
    requireBoolean(engine.sortProjects, "engine.sortProjects");
    requireBoolean(engine.validateContent, "engine.validateContent");
}

function validateMarkdown(config: Config): void {
    const markdown = config.markdown;

    requireString(markdown.headingStyle, "markdown.headingStyle");
    requireString(markdown.bullet, "markdown.bullet");
    requireString(markdown.emphasis, "markdown.emphasis");
    requireString(markdown.strong, "markdown.strong");
}

function validateFeatures(config: Config): void {
    const features = config.features;

    requireBoolean(features.hero, "features.hero");
    requireBoolean(features.about, "features.about");
    requireBoolean(features.projects, "features.projects");
    requireBoolean(features.skills, "features.skills");
    requireBoolean(features.journey, "features.journey");
    requireBoolean(features.github, "features.github");
    requireBoolean(features.contact, "features.contact");
    requireBoolean(features.footer, "features.footer");
}

function requireString(
    value: unknown,
    field: string
): void {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`Missing required field: ${field}`);
    }
}

function requireBoolean(
    value: unknown,
    field: string
): void {
    if (typeof value !== "boolean") {
        throw new Error(`${field} must be boolean.`);
    }
}

function relative(file: string): string {
    return path.relative(process.cwd(), file);
}