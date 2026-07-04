export type BadgeStyle =
    | "flat"
    | "flat-square"
    | "plastic"
    | "for-the-badge"
    | "social";

export interface BadgeProps {
    label: string;

    message?: string;

    color?: string;

    logo?: string;

    logoColor?: string;

    style?: BadgeStyle;

    link?: string;

    alt?: string;
}

const SHIELDS_BASE_URL = "https://img.shields.io/badge";

export class Badge {
    constructor(
        private readonly props: BadgeProps
    ) { }

    render(): string {
        this.validate();

        const image = `![${this.alt}](${this.url})`;

        if (!this.props.link) {
            return image;
        }

        return `[${image}](${this.props.link})`;
    }

    get url(): string {
        const label = this.encode(this.props.label);

        const message = this.encode(
            this.props.message ?? ""
        );

        const color = this.encode(
            this.props.color ?? "2d333b"
        );

        const parameters = new URLSearchParams();

        parameters.set(
            "style",
            this.props.style ?? "flat"
        );

        if (this.props.logo) {
            parameters.set(
                "logo",
                this.props.logo
            );
        }

        if (this.props.logoColor) {
            parameters.set(
                "logoColor",
                this.props.logoColor
            );
        }

        return `${SHIELDS_BASE_URL}/${label}-${message}-${color}?${parameters.toString()}`;
    }

    get alt(): string {
        return (
            this.props.alt ??
            this.props.label
        );
    }

    private validate(): void {
        if (!this.props.label.trim()) {
            throw new Error(
                "Badge label cannot be empty."
            );
        }

        if (
            this.props.link &&
            !/^https?:\/\//.test(this.props.link)
        ) {
            throw new Error(
                `Invalid badge link: ${this.props.link}`
            );
        }
    }

    private encode(
        value: string
    ): string {
        return encodeURIComponent(value)
            .replace(/%20/g, "_");
    }
}