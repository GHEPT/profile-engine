export interface Project {
    id: string;

    name: string;

    category: string;

    status: ProjectStatus;

    featured: boolean;

    description: string;

    technologies: string[];

    links: ProjectLinks;
}

export interface ProjectLinks {
    website?: string;
    repository?: string;
    demo?: string;
}

export type ProjectStatus =
    | "Planning"
    | "In Development"
    | "Active"
    | "Maintenance"
    | "Archived";