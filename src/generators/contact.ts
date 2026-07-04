import { Badge } from "../components/Badge";

import type { Social } from "../types/Social";

export function generateContact(
    social: Social
): string {
    const visibleProfiles = social.profiles.filter(
        (profile) => profile.visible
    );

    const orderedProfiles = social.settings.sortPrimaryFirst
        ? [...visibleProfiles].sort(compareProfiles)
        : visibleProfiles;

    const badges = orderedProfiles.map((profile) =>
        new Badge({
            label: profile.label,
            message: profile.username,
            logo: normalizeLogo(profile.icon),
            style: profile.primary
                ? "for-the-badge"
                : "flat",
            link: profile.url
        }).render()
    );

    const links = badges.join(
        social.settings.separator
    );

    return [
        "## Contact",
        "",
        '<p align="center">',
        "",
        links,
        "",
        "</p>"
    ].join("\n");
}

function compareProfiles(
    a: Social["profiles"][number],
    b: Social["profiles"][number]
): number {
    if (a.primary === b.primary) {
        return a.label.localeCompare(b.label);
    }

    return a.primary ? -1 : 1;
}

function normalizeLogo(
    icon: string
): string {
    const map: Record<string, string> = {
        github: "github",
        linkedin: "linkedin",
        globe: "googlechrome",
        mail: "gmail",
        instagram: "instagram",
        x: "x"
    };

    return map[icon] ?? icon;
}