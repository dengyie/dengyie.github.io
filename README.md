# Little Lighthouse

English: [README.en.md](README.en.md)

> 一个以 Folk Canvas 视觉语言构建的个人博客，基于 Next.js 静态导出，强调编辑感版式、项目自有插画资源与 GitHub Pages 发布体验。

[![Live Site](assets/readme/badges/live.svg)](https://dengyie.github.io)
![Next.js](assets/readme/badges/nextjs.svg)
![React](assets/readme/badges/react.svg)
![TypeScript](assets/readme/badges/typescript.svg)
![Static Export](assets/readme/badges/export.svg)

Little Lighthouse 是一个偏暗色、偏编辑化的技术博客项目，用来承载工程笔记、设计记录与静态站点实验。当前实现聚焦于 Folk Canvas 风格：带边框的阅读画布、民俗感装饰纹样、本地 SVG 插画，以及适合 GitHub Pages 的静态发布模型。

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
| 当前目标 | 高保真重建 Folk Canvas 风格博客界面与内容结构 |
| 交付方式 | Next.js 静态导出后发布到 GitHub Pages |
| 内容来源 | 当前路由仍由 Folk Showcase 数据驱动，新增博客发布包链路已作为后续迁移基础 |
| 当前重点 | 编辑感表现、路由一致性、资源本地化、README 展示质量与新增博客工作流 |

## 这是什么项目

这是一个围绕 `Little Lighthouse` 品牌构建的静态个人博客项目，目标不是做一个普通模板站，而是做一个有明确视觉风格、有设计文档、有内容结构约束的展示型博客。

当前界面方向采用暗色 Folk Canvas：带颗粒感的深色背景、暖色装饰边框、本地民俗风 SVG 插画、卡片式文章组织方式，以及更接近杂志页面的阅读节奏。

## 项目亮点

- 使用 `public/ornaments/folk/` 下的本地 SVG 民俗装饰资源
- 基于 Next.js `output: "export"` 的静态导出工作流
- 文章卡片、详情页、RSS、sitemap 共用一份内容数据源
- 新增博客采用 Markdown + `.meta.json` 的发布包基础链路，并提供默认值与校验兜底
- 首页、文章列表、文章详情、分类归档均有独立页面实现
- 设计规范、修复方案、页面说明统一沉淀在 `design-system/`

## 为什么这个仓库页会更完整

这个仓库不只是放代码，还把设计说明、页面规范、截图产物、预览资源和数据结构都留在仓库里。这样后续继续开发、回看设计决策、或者给别人展示项目时，都不会只剩一堆零散文件。

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

## 目录结构

```text
.
|-- design-system/          # 视觉规范、实现计划、页面说明
|-- content/                # Markdown 正文与发布元数据
|-- assets/readme/          # README 本地徽章与截图资源
|-- output/                 # 设计稿与 QA 截图产物
|-- public/                 # 静态资源、装饰素材、生成的元数据文件
|-- scripts/                # 构建期脚本
|-- src/
|   |-- app/                # App Router 页面
|   |-- components/         # Folk 组件与通用组件
|   |-- data/               # 统一展示数据源
|   |-- lib/                # 内容处理与辅助函数
|   `-- styles/             # 全局样式与设计 token
`-- out/                    # 静态导出结果
```

## 本地开发

安装依赖并启动开发环境：

```bash
npm install
npm run dev
```

执行生产构建与静态导出：

```bash
npm run build
```

在生产构建前，会先执行 `scripts/generate-static-meta.mjs` 来刷新这些文件：

- `public/rss.xml`
- `public/sitemap.xml`
- `public/robots.txt`

## 内容与发布模型

当前 Folk Canvas 展示页仍使用统一的数据源，以保持已交付页面稳定：

- `src/data/folkShowcase.json`
- `src/data/folkShowcase.ts`

这份数据会驱动：

- 首页精选与归档卡片
- 文章详情内容
- 分类数量统计

新增博客的长期链路已经落地为发布包模型：

- `content/posts/<slug>.md`：文章正文
- `content/posts/<slug>.meta.json`：标题、分类、发布时间、发布状态、SEO、关联文章等发布字段
- `src/lib/publishing/`：解析、校验、默认值与 fallback warning
- `src/data/publishing/`：作者、分类和站点默认资源配置

可选图片资源可以放在 `public/posts/<slug>/` 下；未上传时会走分类或站点默认兜底，不阻断构建。

RSS 与 sitemap 已经由发布包链路生成，只包含 `published: true` 的真实文章包。

## 设计系统

项目的设计说明与实现约束主要放在 `design-system/`，包括：

- `MASTER.md`
- `IMPLEMENTATION-PLAN.md`
- `ASSET-AND-DATA-SPEC.md`

另外几个有用的仓库资源：

- `design-system/pages/`：各页面规格说明
- `output/qa-screenshots/`：视觉验收截图
- `public/ornaments/folk/`：项目自有装饰插画资源

## 部署说明

线上站点地址是 [dengyie.github.io](https://dengyie.github.io)。项目通过静态托管方式发布，构建结果输出在 `out/` 目录。
