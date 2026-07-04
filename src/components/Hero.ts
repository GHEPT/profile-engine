import { renderTemplate } from "../renderers/markdown";

export interface HeroProps {
    name: string;
    headline: string;
    tagline: string;
    image: string;
    quote: string;

    currentFocusTitle?: string;
    currentFocus?: string[];

    buildingTitle?: string;
    buildingDescription?: string;
}

const HERO_TEMPLATE = `
# {{name}}

### {{headline}}

{{tagline}}

<p align="center">

<img
    src="{{image}}"
    alt="{{name}}"
    width="100%"
/>

</p>

---

<table>

<tr>

<td width="50%">

### 🚀 {{currentFocusTitle}}

{{currentFocus}}

</td>

<td width="50%">

### 💡 {{buildingTitle}}

{{buildingDescription}}

</td>

</tr>

</table>

---

> {{quote}}
`.trim();

export class Hero {
    constructor(
        private readonly props: HeroProps
    ) { }

    render(): string {
        return renderTemplate(HERO_TEMPLATE, {
            name: this.props.name,

            headline: this.props.headline,

            tagline: this.props.tagline,

            image: this.props.image,

            quote: this.props.quote,

            currentFocusTitle:
                this.props.currentFocusTitle ??
                "Current Focus",

            currentFocus:
                (this.props.currentFocus ?? [])
                    .map((item) => `- ${item}`)
                    .join("\n"),

            buildingTitle:
                this.props.buildingTitle ??
                "Building",

            buildingDescription:
                this.props.buildingDescription ?? ""
        });
    }
}