export interface Journey {
    title: string;
    subtitle?: string;
    timeline: JourneyStep[];
}

export interface JourneyStep {
    year: string;

    title: string;

    organization: string;

    description: string;

    highlights: string[];
}