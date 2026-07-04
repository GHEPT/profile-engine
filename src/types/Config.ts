export interface Config {
    project: ProjectConfig;

    paths: PathsConfig;

    render: RenderConfig;

    svg: SvgConfig;

    engine: EngineConfig;

    markdown: MarkdownConfig;

    features: FeatureFlags;
}

export interface ProjectConfig {
    name: string;
    version: string;
    description: string;
    author: string;
}

export interface PathsConfig {
    assets: string;
    generated: string;

    content: string;

    profile: string;
    projects: string;
    journey: string;
    social: string;

    readme: {
        hero: string;
        about: string;
        projects: string;
        github: string;
        footer: string;
    };

    output: {
        readme: string;
    };
}

export interface RenderConfig {
    lineBreak: string;
    sectionSpacing: number;
    trimTrailingWhitespace: boolean;
    ensureFinalNewline: boolean;
}

export interface SvgConfig {
    hero: SvgAssetConfig;
    skills: SvgAssetConfig;
    timeline: SvgAssetConfig;
}

export interface SvgAssetConfig {
    enabled: boolean;
    output: string;
}

export interface EngineConfig {
    overwriteOutput: boolean;
    createDirectories: boolean;
    failOnMissingContent: boolean;
    deterministicOutput: boolean;
    sortProjects: boolean;
    validateContent: boolean;
}

export interface MarkdownConfig {
    headingStyle: string;
    bullet: string;
    emphasis: string;
    strong: string;
}

export interface FeatureFlags {
    hero: boolean;
    about: boolean;
    journey: boolean;
    skills: boolean;
    projects: boolean;
    github: boolean;
    contact: boolean;
    footer: boolean;
}