import fs from "node:fs";
import { Paths } from "../constants/Paths";
import { renderTemplate } from "../renderers/markdown";


export function generateFooter(): string {
    const template = loadTemplate();

    return renderTemplate(template, {});
}

function loadTemplate(): string {
    return fs.readFileSync(
        Paths.readme.footer,
        "utf8"
    );
}