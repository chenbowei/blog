# Astro 6 MDX Cloudflare Blog

一个 Astro 6 + MDX + Cloudflare 的静态博客模板。

## 开发

Astro 6 要求 Node.js `22.12.0` 或更高版本。项目里已经包含 `.node-version`。

```bash
npm install
npm run dev
```

## 写文章

在 `src/content/blog/` 下新增 `.md` 或 `.mdx` 文件：

```md
---
title: New Post
description: Short summary for lists and meta tags.
pubDate: 2026-06-24
tags:
  - Astro
draft: false
---

Your content here.
```

## 构建

```bash
npm run build
```

构建产物会输出到 `dist/`。

## 部署到 Cloudflare

先登录 Wrangler：

```bash
npx wrangler login
```

然后部署：

```bash
npm run deploy
```

Cloudflare Pages 配置在 `wrangler.toml`，静态资产目录为 `dist/`。

如果你更偏向 Cloudflare Pages 控制台部署，设置如下：

- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `22.12.0` 或更高
