import fs from "node:fs";

import { Hero } from "../components/Hero";

import { generateHeroSvg } from "./heroSvg";

import { Paths } from "../constants/Paths";

import type { Config } from "../types/Config";
import type { RuntimeProfile } from "../types/Profile";

export function generateHero(
    profile: RuntimeProfile,
    config?: Config
): string {
    generateAssets(profile, config);

    const hero = new Hero({
        name: profile.name,
        image: relativeHeroImage()
    });

    return hero.render();
}

function generateAssets(
    profile: RuntimeProfile,
    config?: Config
): void {
    const enabled =
        config?.svg.hero.enabled ?? true;

    if (!enabled) {
        return;
    }

    const svg = generateHeroSvg(profile);

    ensureGeneratedDirectory();

    fs.writeFileSync(
        Paths.generated + "/hero.svg",
        svg,
        "utf8"
    );
}

function ensureGeneratedDirectory(): void {
    fs.mkdirSync(Paths.generated, {
        recursive: true
    });
}

function relativeHeroImage(): string {
    return "./assets/generated/hero.svg";
}