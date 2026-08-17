# Skill-hub

A composer control for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI. It adds a **Skill-hub** button beside the composer's `+` that lists the session's available skills and pins the selected skill's name as a highlighted chip in the input.

![status](https://img.shields.io/badge/status-beta-blue) ![license](https://img.shields.io/badge/license-MIT-green)

## Features

- **Skill picker** — click the button to list every skill available to the current session (via the Harness `skill.list` RPC).
- **Selection chip** — picking a skill shows its name as a highlighted chip next to the button; click the chip to clear it.
- **No extra setup** — reads the same skill catalog the built-in `/` skill menu uses.

## Requirements

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) running the **Web** profile.

## Download

```bash
git clone https://github.com/<your-account>/dsh-skill-hub.git
```

## Install

This is a browser-only dual-face plugin designed to live inside the DeepSeek Harness monorepo under `packages/extensions/`.

1. Copy this folder into `packages/extensions/skill-hub/`.
2. Add the tsconfig references (below).
3. Register the row in your profile's patch file (below).
4. Build and restart.

### tsconfig references

In `tsconfig.host.json` references:

```json
{ "path": "./packages/extensions/skill-hub/tsconfig.host.json" }
```

In `tsconfig.client.json` references:

```json
{ "path": "./packages/extensions/skill-hub/tsconfig.client.json" }
```

### Profile registration

In `$DSH_HOME/profiles/<profile>/cordis.patch.yml`:

```yaml
- insert:
    - id: skill-hub
      name: '@deepseek-ai/dsh-skill-hub'
```

### Build

```bash
pnpm install
npx tsc -b packages/extensions/skill-hub/tsconfig.host.json
npx tsc -b packages/extensions/skill-hub/tsconfig.client.json
npx tsdown --env.DSH_BUILD_FACE client
```

Then restart `dsh web`.

## How it works

The browser half registers into the `conversation.input.left` slot (beside the composer's `+` button) and calls `connection.api.skills.list({ sessionId })` to load the skill catalog. Selection state is local to the component.

## License

[MIT](LICENSE)
