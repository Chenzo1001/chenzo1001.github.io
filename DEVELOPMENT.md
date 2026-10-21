# 本地开发与构建

当前构建环境：Hugo 0.168.0、Node.js 22、pnpm 10.14.0。
HugoBlox 模块版本和校验值已锁定在 `go.mod`、`go.sum` 中。

```sh
nvm use
pnpm install --frozen-lockfile
pnpm dev
```

生成用于部署的静态文件与 Pagefind 搜索索引：

```sh
pnpm build
```

输出目录为 `public/`。GitHub Pages 会在变更推送到 `main` 后自动构建和部署。

`.npmrc` 中的 `prefer-symlinked-executables=true` 是 Hugo 调用 Tailwind CSS 所需的设置。
从旧环境升级时，需要重新运行依赖安装，让 pnpm 生成新的可执行文件链接。

后续升级时同步检查 `hugoblox.yaml`、`netlify.toml`、`config/_default/module.yaml`
及 `.devcontainer/devcontainer.json` 中的 Hugo 版本；构建环境需要 Node.js 22 或更高版本。
升级后检查首页、论文页和搜索功能，再部署。
