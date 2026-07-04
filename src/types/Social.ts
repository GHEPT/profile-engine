export interface Social {
    title: string;

    subtitle?: string;

    profiles: SocialProfile[];

    settings: SocialSettings;

    footer: SocialFooter;
}

export interface SocialProfile {
    id: string;

    label: string;

    username: string;

    url: string;

    icon: string;

    visible: boolean;

    primary: boolean;
}

export interface SocialSettings {
    openLinksInNewTab: boolean;

    showIcons: boolean;

    showLabels: boolean;

    sortPrimaryFirst: boolean;

    separator: string;
}

export interface SocialFooter {
    message: string;
}