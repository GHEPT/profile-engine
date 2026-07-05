import fs from "node:fs";
import path from "node:path";

import { Paths } from "../constants/Paths";

import { loadConfig } from "../loaders/config";
import { loadJourney } from "../loaders/journey";
import { loadProfile } from "../loaders/profile";
import { loadProjects } from "../loaders/projects";
import { loadSocial } from "../loaders/social";

import { generateFooter } from "../generators/footer";
import { generateGithub } from "../generators/github";
import { generateProfileSvg } from "../generators/profileSvg";
import { generateJourney } from "../generators/journey";
import { generateProjects } from "../generators/projects";
import { generateSkills } from "../generators/skills";

import { renderMarkdown } from "../renderers/markdown";
import { generateContact } from "../generators/contact";

import { writeFile } from "../utils/writeFile";

import type { Config } from "../types/Config";

export class Engine {
    public run(): void {
        const config = loadConfig();

        this.prepareWorkspace(config);

        const profile = loadProfile();
        const projects = loadProjects();
        const journey = loadJourney();
        const social = loadSocial();

        const sections: string[] = [];

        if (config.svg.profile.enabled) {
            const profileSvg = generateProfileSvg(profile);

            writeFile(
                `${Paths.generated}/profile.svg`,
                profileSvg
            );

            sections.push(
                `<p align="center">
    <img
        src="./assets/generated/profile.svg"
        alt="${profile.name}"
        width="100%"
    />
</p>`
            );
        }

        if (config.features.projects) {
            sections.push(
                generateProjects(projects)
            );
        }

        if (config.features.skills) {
            sections.push(
                generateSkills(profile, config)
            );
        }

        if (config.features.journey) {
            sections.push(
                generateJourney(journey, config)
            );
        }

        if (config.features.github) {
            sections.push(
                generateGithub(profile)
            );
        }

        if (config.features.contact) {
            sections.push(
                generateContact(social)
            );
        }

        if (config.features.footer) {
            sections.push(
                generateFooter()
            );
        }

        const markdown = renderMarkdown(
            sections,
            config.render
        );

        writeFile(
            Paths.outputReadme,
            markdown
        );
    }

    private prepareWorkspace(
        config: Config
    ): void {
        if (config.engine.createDirectories) {
            this.ensureDirectory(Paths.output);

            this.ensureDirectory(Paths.generated);
        }

        if (
            config.engine.overwriteOutput &&
            fs.existsSync(Paths.outputReadme)
        ) {
            fs.rmSync(Paths.outputReadme);
        }
    }

    private ensureDirectory(
        directory: string
    ): void {
        fs.mkdirSync(directory, {
            recursive: true
        });
    }

    public clean(): void {
        if (fs.existsSync(Paths.outputReadme)) {
            fs.rmSync(Paths.outputReadme);
        }

        if (fs.existsSync(Paths.generated)) {
            fs.rmSync(Paths.generated, {
                recursive: true,
                force: true
            });

            fs.mkdirSync(Paths.generated, {
                recursive: true
            });
        }
    }

    public validate(): boolean {
        loadConfig();
        loadProfile();
        loadProjects();
        loadJourney();
        loadSocial();

        return true;
    }

    public status(): EngineStatus {
        return {
            outputExists: fs.existsSync(
                Paths.outputReadme
            ),

            generatedAssets: this.generatedAssets(),

            outputDirectory: path.resolve(
                Paths.output
            )
        };
    }

    private generatedAssets(): string[] {
        if (!fs.existsSync(Paths.generated)) {
            return [];
        }

        return fs
            .readdirSync(Paths.generated)
            .sort();
    }
}

export interface EngineStatus {
    outputExists: boolean;

    generatedAssets: string[];

    outputDirectory: string;
}