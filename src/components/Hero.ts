export interface HeroProps {
    name: string;
    image: string;
}

export class Hero {
    constructor(
        private readonly props: HeroProps
    ) {}

    render(): string {
        return `
<p align="center">
    <img
        src="${this.props.image}"
        alt="${this.props.name}"
        width="100%"
    />
</p>
`.trim();
    }
}
