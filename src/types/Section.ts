export interface Section {
    title: string;

    content: string;

    level?: HeadingLevel;

    separator?: boolean;
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;