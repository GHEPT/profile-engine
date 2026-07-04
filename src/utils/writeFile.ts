import fs from "node:fs";
import path from "node:path";

export function writeFile(
    filePath: string,
    content: string
): void {
    const directory = path.dirname(filePath);

    fs.mkdirSync(directory, {
        recursive: true
    });

    fs.writeFileSync(filePath, content, {
        encoding: "utf8"
    });
}