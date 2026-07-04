export interface Profile {
    name: string;

    headline: string;

    tagline: string;

    photo?: string;

    roles: string[];

    about: AboutSection;

    currentFocus: CurrentFocusSection;

    technicalExpertise: TechnicalExpertise;

    building: BuildingSection;

    contact: Contact;

    quote: string;
}

export interface AboutSection {
    title: string;
    intro: string;
    items: AboutItem[];
}

export interface AboutItem {
    icon: string;
    text: string;
}

export interface CurrentFocusSection {
    title: string;
    items: string[];
}

export interface TechnicalExpertise {
    languages: SkillGroup;
    backend: SkillGroup;
    data: SkillGroup;
    practices: SkillGroup;
}

export interface SkillGroup {
    title: string;
    items: string[];
}

export interface BuildingSection {
    title: string;
    description: string;
}

export interface Contact {
    email: string;

    website: string;

    linkedin: string;

    github: string;

    location: string;
}

/**
 * Estrutura utilizada internamente pelo engine
 * após a normalização dos dados carregados.
 */
export interface RuntimeProfile extends Profile {
    githubUsername: string;
}

/**
 * Dados utilizados especificamente para
 * renderização do Hero.
 */
export interface HeroModel {
    name: string;

    headline: string;

    tagline: string;

    image: string;

    quote: string;
}

/**
 * Dados utilizados para renderização da seção
 * "About".
 */
export interface AboutModel {
    title: string;

    intro: string;

    items: AboutItem[];

    technicalExpertise: TechnicalExpertise;

    building: BuildingSection;
}

/**
 * Modelo utilizado para renderização
 * das informações de contato.
 */
export interface ContactModel {
    name: string;

    headline: string;

    location: string;

    email: string;

    website: string;

    linkedin: string;

    quote: string;
}