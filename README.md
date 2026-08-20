# Skill-hub

English | [中文](README.zh.md)

A composer control for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI. It adds a **Skill-hub** button beside the composer's `+` that lists the session's available skills and pins the selected skill's name as a highlighted chip.

[![license](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![harness](https://img.shields.io/badge/DeepSeek%20Harness-web-blue)](https://github.com/deepseek-ai/deepseek-harness)

## Features

- **Skill picker** — click the button to list every skill available to the current session (via the Harness `skill.list` RPC).
- **Selection chip** — the picked skill's name shows as a highlighted chip next to the button; click the chip to clear it.
- **Click-away** — the dropdown closes when you click outside.
- **No extra setup** — reads the same catalog the built-in `/` skill menu uses.

## Requirements

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) running the **Web** profile.

## Install

This is a browser-only dual-face plugin designed to live inside the DeepSeek Harness monorepo under `packages/extensions/`.

1. Copy this folder to `packages/extensions/skill-hub/`.

2. Add the two tsconfig references:

   - In `tsconfig.host.json` references:
     ```json
     { "path": "./packages/extensions/skill-hub/tsconfig.host.json" }
     ```
   - In `tsconfig.client.json` references:
     ```json
     { "path": "./packages/extensions/skill-hub/tsconfig.client.json" }
     ```

3. Register the row in `$DSH_HOME/profiles/<profile>/cordis.patch.yml`:

   ```yaml
   - insert:
       - id: skill-hub
         name: '@deepseek-ai/dsh-skill-hub'
   ```

4. Build and restart:

   ```bash
   pnpm install
   npx tsc -b packages/extensions/skill-hub/tsconfig.host.json
   npx tsc -b packages/extensions/skill-hub/tsconfig.client.json
   npx tsdown --env.DSH_BUILD_FACE client
   # then restart `dsh web`
   ```

## How it works

The browser half registers into the `conversation.input.left` slot (beside the composer's `+`) and calls `connection.api.skills.list({ sessionId })` to load the skill catalog. Selection state is local to the component.

## License

[MIT](LICENSE)
