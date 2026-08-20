# Skill-hub

[English](README.md) | 中文

一个用于 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI 的输入框控制组件。它在输入框的 `+` 按钮旁添加 **Skill-hub** 按钮，用于列出当前会话可用的 skills，并将选中 skill 的名称固定显示为高亮标签。

[![license](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![harness](https://img.shields.io/badge/DeepSeek%20Harness-web-blue)](https://github.com/deepseek-ai/deepseek-harness)

## 功能

- **Skill 选择器**——点击按钮，通过 Harness 的 `skill.list` RPC 列出当前会话可用的全部 skills。
- **选择标签**——选中的 skill 名称会以高亮标签显示在按钮旁；点击该标签可清除选择。
- **点击外部关闭**——点击下拉菜单之外的区域会关闭菜单。
- **无需额外配置**——读取内置 `/` skill 菜单所使用的同一份目录。

## 要求

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 以 **Web** profile 运行。

## 安装

这是一个以浏览器端为主的双面插件，设计为放置在 DeepSeek Harness monorepo 的 `packages/extensions/` 目录下。

1. 将此文件夹复制到 `packages/extensions/skill-hub/`。

2. 添加两个 tsconfig 引用：

   - 在 `tsconfig.host.json` 的 references 中添加：
     ```json
     { "path": "./packages/extensions/skill-hub/tsconfig.host.json" }
     ```
   - 在 `tsconfig.client.json` 的 references 中添加：
     ```json
     { "path": "./packages/extensions/skill-hub/tsconfig.client.json" }
     ```

3. 在 `$DSH_HOME/profiles/<profile>/cordis.patch.yml` 中注册：

   ```yaml
   - insert:
       - id: skill-hub
         name: '@deepseek-ai/dsh-skill-hub'
   ```

4. 构建并重启：

   ```bash
   pnpm install
   npx tsc -b packages/extensions/skill-hub/tsconfig.host.json
   npx tsc -b packages/extensions/skill-hub/tsconfig.client.json
   npx tsdown --env.DSH_BUILD_FACE client
   # 然后重启 `dsh web`
   ```

## 工作方式

浏览器端将组件注册到 `conversation.input.left` 插槽（输入框 `+` 按钮旁），并调用 `connection.api.skills.list({ sessionId })` 加载 skill 目录。选择状态仅保存在该组件本地。

## 许可证

[MIT](LICENSE)
