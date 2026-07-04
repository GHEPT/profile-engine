import path from "node:path";

const ROOT = process.cwd();

export const Paths = {
    root: ROOT,

    assets: path.join(ROOT, "assets"),

    icons: path.join(ROOT, "assets", "icons"),

    generated: path.join(ROOT, "assets", "generated"),

    content: path.join(ROOT, "content"),

    profile: path.join(ROOT, "content", "profile.yml"),

    projects: path.join(ROOT, "content", "projects.yml"),

    journey: path.join(ROOT, "content", "journey.yml"),

    social: path.join(ROOT, "content", "social.yml"),

    config: path.join(ROOT, "content", "config.yml"),

    readme: {
        hero: path.join(ROOT, "content", "readme", "hero.md"),

        about: path.join(ROOT, "content", "readme", "about.md"),

        projects: path.join(ROOT, "content", "readme", "projects.md"),

        github: path.join(ROOT, "content", "readme", "github.md"),

        footer: path.join(ROOT, "content", "readme", "footer.md")
    },

    output: path.join(ROOT, "output"),

    outputReadme: path.join(ROOT, "output", "README.md")
} as const;

export type ProjectPaths = typeof Paths;