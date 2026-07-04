# Profile Engine Architecture

## Philosophy

The engine does not generate Markdown.

The engine generates a complete GitHub profile experience.

Markdown is only one of the outputs.

---

## Input

content/

- profile.yml
- projects.yml
- journey.yml
- social.yml
- config.yml

---

## Output

output/

README.md

assets/generated/

hero.svg

skills.svg

timeline.svg

---

## Pipeline

YAML

↓

Loaders

↓

Models

↓

Engine

↓

Generators

↓

Artifacts

↓

README

---

## Rules

Generators never read files.

Loaders never generate output.

Templates never contain logic.

The Engine is the only orchestrator.

---

## Responsibilities

Profile

Personal information.

Projects

Portfolio.

Journey

Career timeline.

Social

Links.

Hero

Visual identity.

README

Composition.

---

## Quality

Readable.

Maintainable.

Opinionated.

Beautiful.

Generic.