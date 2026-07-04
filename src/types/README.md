# Profile Engine v2

> Generate beautiful GitHub profile READMEs from structured content.

---

## Vision

Profile Engine is a static documentation engine that transforms structured YAML content into a polished GitHub profile README.

Instead of manually editing markdown, every section is generated from independent content files, making the profile maintainable, reusable and versionable.

The project is intentionally modular.

Content, rendering and generation are completely separated.

---

## Goals

- Generate professional GitHub profile READMEs
- Keep every section independent
- Generate SVG assets automatically
- Support reusable generators
- Produce deterministic output
- Be easy to extend

---

## Project Structure

```text
profile-engine/

├── assets/
│   ├── icons/
│   └── generated/
│       ├── hero.svg
│       ├── skills.svg
│       └── timeline.svg
│
├── content/
│   ├── config.yml
│   ├── profile.yml
│   ├── projects.yml
│   ├── journey.yml
│   ├── social.yml
│   └── readme/
│       ├── hero.md
│       ├── about.md
│       ├── projects.md
│       ├── github.md
│       └── footer.md
│
├── output/
│   └── README.md
│
├── src/
│
│   ├── components/
│   │
│   │   Hero.ts
│   │   Section.ts
│   │   Table.ts
│   │   Image.ts
│   │   Badge.ts
│   │
│   ├── constants/
│   │
│   │   Paths.ts
│   │
│   ├── engine/
│   │
│   │   Engine.ts
│   │
│   ├── generators/
│   │
│   │   hero.ts
│   │   heroSvg.ts
│   │   about.ts
│   │   projects.ts
│   │   skills.ts
│   │   journey.ts
│   │   github.ts
│   │   social.ts
│   │   footer.ts
│   │
│   ├── loaders/
│   │
│   │   profile.ts
│   │   projects.ts
│   │   journey.ts
│   │   social.ts
│   │   config.ts
│   │
│   ├── renderers/
│   │
│   │   markdown.ts
│   │
│   ├── types/
│   │
│   │   Profile.ts
│   │   Project.ts
│   │   Journey.ts
│   │   Social.ts
│   │   Config.ts
│   │   Section.ts
│   │
│   ├── utils/
│   │
│   │   markdown.ts
│   │   writeFile.ts
│   │
│   └── index.ts
│
├── README.md
├── package.json
└── tsconfig.json
```

---

## Architecture

The engine is divided into five layers.

### Content

Stores all profile information in YAML files.

No markdown is manually edited.

---

### Loaders

Responsible for reading and validating YAML files.

---

### Generators

Transform structured data into markdown fragments and SVG assets.

---

### Components

Reusable markdown building blocks.

Generators compose these components.

---

### Renderer

Assembles every generated section into the final README.

---

## Generation Flow

```text
YAML
   │
   ▼

Loaders
   │
   ▼

Generators
   │
   ▼

Markdown Renderer
   │
   ▼

output/README.md
```

---

## Principles

- Single responsibility
- Composition over duplication
- Content first
- Pure generators
- Deterministic output

---

## Status

Architecture frozen.

Development in progress.