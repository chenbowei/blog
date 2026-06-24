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

## 访问统计

项目支持 Cloudflare Web Analytics。到 Cloudflare Dashboard 创建 Web Analytics site 后，把 token 配到 Pages 环境变量：

```text
PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=你的 token
```

配置后重新部署，页面会自动加载 Cloudflare 统计脚本。没有这个变量时不会加载统计脚本。

文章页还会自动显示阅读时间、英文词数和中文字符数。

## 留言功能

文章页支持 Giscus 留言。它基于 GitHub Discussions，适合静态博客。

先在 GitHub 仓库启用 Discussions，然后到 <https://giscus.app/> 选择仓库和 Discussion 分类，复制生成配置里的值，填到 Cloudflare Pages 环境变量：

```text
PUBLIC_GISCUS_REPO=chenbowei/blog
PUBLIC_GISCUS_REPO_ID=你的 repo id
PUBLIC_GISCUS_CATEGORY=Announcements
PUBLIC_GISCUS_CATEGORY_ID=你的 category id
```

保存后重新部署，文章页底部会显示留言区。注意：Giscus 使用的仓库需要公开，并且要安装 Giscus GitHub App。

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
