import fs from "node:fs";

import { Paths } from "../constants/Paths";

import { renderTemplate } from "../renderers/markdown";

import type { RuntimeProfile } from "../types/Profile";

export function generateAbout(
    profile: RuntimeProfile
): string {
    const template = loadTemplate();

    return renderTemplate(template, {
        about: {
            intro: profile.about.intro,

            items: renderAboutItems(profile),

            title: profile.about.title
        },

        technicalExpertise: {
            languages: renderSkillGroup(
                profile.technicalExpertise.languages.items
            ),

            backend: renderSkillGroup(
                profile.technicalExpertise.backend.items
            ),

            data: renderSkillGroup(
                profile.technicalExpertise.data.items
            ),

            practices: renderSkillGroup(
                profile.technicalExpertise.practices.items
            )
        },

        building: {
            title: profile.building.title,

            description: profile.building.description
        }
    });
}

function loadTemplate(): string {
    return fs.readFileSync(
        Paths.readme.about,
        "utf8"
    );
}

function renderAboutItems(
    profile: RuntimeProfile
): string {
    return profile.about.items
        .map(
            (item) =>
                `- ${item.text}`
        )
        .join("\n");
}

function renderSkillGroup(
    items: string[]
): string {
    return items
        .map(
            (item) =>
                `- ${item}`
        )
        .join("\n");
}