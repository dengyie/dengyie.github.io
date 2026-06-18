# Little Lighthouse

English: [README.en.md](README.en.md)

> 一个以 Folk Canvas 视觉语言构建的个人技术博客，基于 Next.js 静态导出，强调编辑感页面、本地插画资源、GitHub Pages 发布，以及 AI 辅助的新增文章流程。

[![Live Site](assets/readme/badges/live.svg)](https://dengyie.github.io)
![Next.js](assets/readme/badges/nextjs.svg)
![React](assets/readme/badges/react.svg)
![TypeScript](assets/readme/badges/typescript.svg)
![Static Export](assets/readme/badges/export.svg)

Little Lighthouse 是一个偏暗色、偏编辑化的技术博客项目，用来承载工程笔记、设计记录与静态站点实验。当前实现聚焦 Folk Canvas 风格：带边框的阅读画布、民俗感装饰纹样、本地 SVG 插画，以及适合 GitHub Pages 的静态发布模型。

## 项目预览

| 桌面首页 | 移动首页 |
| --- | --- |
| ![Little Lighthouse 桌面首页](assets/readme/desktop-home.png) | ![Little Lighthouse 移动首页](assets/readme/mobile-home.png) |

| 文章列表 | 文章详情 |
| --- | --- |
| ![Little Lighthouse 文章列表](assets/readme/desktop-posts.png) | ![Little Lighthouse 文章详情](assets/readme/desktop-posts__java-map-comparison.png) |

## 仓库概览

| 项目项 | 说明 |
| --- | --- |
| 在线地址 | [dengyie.github.io](https://dengyie.github.io) |
| 主要目标 | 高保真重建 Folk Canvas 风格博客界面与内容结构 |
| 交付方式 | Next.js 静态导出后发布到 GitHub Pages |
| 内容来源 | 站点展示层使用 Folk Showcase 数据；新增文章使用 Markdown + `.meta.json` 发布包 |
| 发布门禁 | `npm.cmd run build`、`scripts/verify-blog-package.mjs`、route fidelity verifiers |
| AI 协作 | 站点与流程由 Codex 辅助设计、实现、验证和文档化；可复用 skill 源码维护在 [`dengyie/awesome-skills`](https://github.com/dengyie/awesome-skills) |

## 这是什么项目

这是一个围绕 `Little Lighthouse` 品牌构建的静态个人博客。目标不是做一个普通模板站，而是做一个有明确视觉风格、有设计文档、有内容结构约束的展示型博客。

当前界面方向采用暗色 Folk Canvas：带颗粒感的深色背景、暖色装饰边框、本地民俗风 SVG 插画、卡片式文章组织方式，以及更接近杂志页面的阅读节奏。

网站以 GitHub Pages 静态托管为目标，同时保持源码可维护、视觉系统可复用。

## 项目亮点

- 使用 `public/ornaments/folk/` 下的本地 SVG 民俗装饰资源
- 基于 Next.js `output: "export"` 的静态导出工作流
- 首页、文章列表、文章详情、分类归档均有独立页面实现
- 新增博客采用 Markdown + `.meta.json` 发布包链路，提供默认值、校验与兜底机制
- `scripts/verify-blog-package.mjs` 可验证文章包是否进入详情页、归档页、分类页、RSS 和 sitemap
- `/submit` 是静态投稿说明页，只解释如何把内容交给 AI 发布流程，不承载上传、token 或 CMS 行为
- 设计规范、修复方案、页面说明统一沉淀在 `design-system/`

## AI 辅助发布边界

这个仓库只保存博客站点本身需要的资源和文件：

- 页面代码
- 内容包
- 本地图片和插画资源
- 构建脚本
- 发布验证脚本
- 站点设计与流程文档

可复用的 Codex skill 不放在本仓库内。`little-lighthouse-blog-publisher` 的 skill 源码维护在：

```text
dengyie/awesome-skills/little-lighthouse-blog-publisher
```

它负责分阶段收集正文、元数据和可选图片，给出编辑建议，确认兜底策略，并在用户最终确认后执行本仓库内的文件写入、构建、验证、审查和提交。

GitHub Pages 仍然只是静态站点，不会接收 GitHub token，不会从浏览器直接写仓库，也不会存储上传内容。

## 技术栈

- Next.js 15
- React 19
- TypeScript
- CSS Modules
- `remark` / `rehype` 内容渲染链路

## 主要路由

| 路由 | 用途 |
| --- | --- |
| `/` | 首页，包含主视觉、精选文章、分类区与宣言区域 |
| `/posts` | 文章列表页 |
| `/posts/[slug]` | 文章详情页 |
| `/categories/[category]` | 分类归档页 |
| `/submit` | 静态投稿说明页 |

## 目录结构

```text
.
|-- design-system/          # 视觉规格、实现计划、页面说明
|-- content/                # Markdown 正文与发布元数据
|-- assets/readme/          # README 本地徽章与截图资源
|-- output/                 # QA 产物与截图
|-- public/                 # 静态资源、装饰素材、生成的元数据文件
|-- scripts/                # 构建期和发布验证脚本
|-- src/
|   |-- app/                # App Router 页面
|   |-- components/         # Folk 组件与通用组件
|   |-- data/               # 展示数据与发布配置
|   |-- lib/                # 内容处理与发布解析
|   `-- styles/             # 全局样式与设计 token
`-- out/                    # 静态导出结果
```

## 本地开发

```bash
npm install
npm run dev
```

执行生产构建与静态导出：

```bash
npm run build
```

在生产构建前，会先执行 `scripts/generate-static-meta.mjs` 刷新：

- `public/rss.xml`
- `public/sitemap.xml`
- `public/robots.txt`

## 内容与发布模型

当前 Folk Canvas 展示页使用统一内容数据源来保持已交付页面稳定：

- `src/data/folkShowcase.json`
- `src/data/folkShowcase.ts`

新增博客的长期链路已经落地为发布包模型：

- `content/posts/<slug>.md`：文章正文
- `content/posts/<slug>.meta.json`：标题、分类、日期、发布状态、SEO、相关文章等发布字段
- `public/posts/<slug>/thumbnail.png`：可选卡片图
- `public/posts/<slug>/hero.png`：可选详情页图
- `public/posts/<slug>/og.png`：可选社交分享图
- `src/lib/publishing/`：解析、校验、默认值与 fallback warning
- `src/data/publishing/`：作者、分类和站点默认配置

未上传图片时会走分类或站点默认兜底，不阻断构建。

RSS 和 sitemap 由发布包链路生成，只包含 `published: true` 的真实文章包。

## 验证命令

```bash
npm.cmd run build
node scripts/verify-blog-package.mjs java-map-comparison
node scripts/verify-posts-archive-fidelity.mjs
node scripts/verify-post-detail-fidelity.mjs
node scripts/verify-category-page-fidelity.mjs
```

## 设计系统

项目的设计说明与实现约束主要放在 `design-system/`，包括：

- `MASTER.md`
- `IMPLEMENTATION-PLAN.md`
- `ASSET-AND-DATA-SPEC.md`
- `little-lighthouse-blog-publisher-skill-design.md`
- `pages/submit-page-spec.md`

其他有用资源：

- `design-system/pages/`：各页面规格说明
- `output/qa-screenshots/`：视觉验收截图
- `public/ornaments/folk/`：项目自有装饰插画资源

## 部署说明

线上站点地址是 [dengyie.github.io](https://dengyie.github.io)。项目通过 GitHub Actions 以静态托管方式发布，构建结果输出到 `out/` 目录。
