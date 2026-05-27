# 魏俊浩的博客 - 项目文档

基于 [Hugo](https://gohugo.io/) + [FixIt](https://fixit.lruihao.cn/) 主题搭建的个人博客，内容涵盖**数字生活**、**梅花易数**、**杂文随笔**三大方向。

---

## 目录

- [项目结构](#项目结构)
- [文章内容](#文章内容)
- [配置文件](#配置文件)
- [自定义模板](#自定义模板)
- [自定义样式](#自定义样式)
- [静态资源](#静态资源)
- [构建工具](#构建工具)
- [主题文件](#主题文件)

---

## 项目结构

```
myblog/
├── hugo.toml              # 主配置文件（全功能开启 + 详细中文注释）
├── .gitignore             # Git 忽略规则
├── .hugo_build.lock       # Hugo 构建锁（自动生成，勿删）
├── README.md              # 本文件
├── archetypes/            # 文章模板
│   └── default.md         # 新建文章的默认 Front Matter 模板
├── content/               # 网站内容
│   ├── about.md           # "关于我"页面
│   └── posts/             # 博客文章（所有 .md 文件）
├── data/                  # Hugo 数据文件目录（当前为空）
├── i18n/                  # 自定义多语言翻译覆盖（当前为空）
├── static/                # 静态资源（直接复制到输出目录）
│   └── images/            # 图片资源
├── assets/                # Hugo Pipes 处理的资源
│   ├── jsconfig.json      # JS 路径映射（IDE 智能提示用）
│   ├── scss/              # 自定义 SCSS 样式
│   │   ├── _custom.scss   # 自定义 CSS 规则
│   │   └── _override.scss # SCSS 变量覆写（配色、字体等）
│   └── css/
│       └── extended/      # 扩展 CSS
│           └── toc.css    # 文章目录专属样式
├── layouts/               # 自定义模板（覆盖主题默认模板）
│   └── partials/
│       ├── breadcrumbs.html  # 自定义面包屑导航
│       └── toc.html          # 自定义文章目录（TOC）
├── bin/                   # 本地构建工具
│   └── dart-sass/         # Dart Sass 编译器（Hugo 编译 SCSS 所需）
├── resources/             # Hugo 生成缓存（自动生成）
├── public/                # 构建输出目录（自动生成）
└── themes/                # 主题
    └── FixIt/             # FixIt 主题（v0.4.X）
```

---

## 文章内容

### `content/posts/` — 博客文章（共 6 篇）

| 文件名 | 标题 | 日期 | 分类 | 状态 |
|--------|------|------|------|:--:|
| `2026-05-12-从0到1搭建个人博客.md` | 从0到1搭建个人博客 | 2026-05-12 | 数字生活 | 草稿 |
| `2026-05-12-基础知识.md` | 基础知识（梅花易数入门） | 2026-05-12 | 梅花易数 | 草稿 |
| `2026-05-12-几乎丧失了深度执行力.md` | 几乎丧失了深度执行力 | 2026-05-13 | 杂文 | ✅ 已发布 |
| `数字生活-markdown语法.md` | Markdown 语法速记 | 2026-05-15 | 数字生活 | 草稿 |
| `数字生活-QQ群机器人.md` | QQ 运维机器人 | 2026-05-15 | 数字生活 | 草稿 |
| `数字生活-代码版本管理.md` | 关于代码版本管理 | 2026-05-22 | 数字生活 | 草稿 |

**分类分布**：数字生活 ×4 | 杂文 ×1 | 梅花易数 ×1

> 💡 **提示**：目前仅 1 篇为发布状态（`draft: false`），其余 5 篇为草稿（`draft: true`）。草稿文章仅在 `hugo server -D` 模式下可见，线上构建时会被隐藏。发布前需将 `draft: true` 改为 `draft: false`。

**文章 Front Matter 说明**：

```yaml
---
title: "文章标题"           # 文章标题，显示在页面顶部
description: ""             # 文章描述，用于 SEO 和摘要
date: "2026-05-12"          # 发布日期
lastmod: ""                 # 最后修改日期（可选，不填则自动获取）
draft: true                 # 是否草稿（true=隐藏，false=公开发布）
tags: []                    # 标签列表，如 ["Hugo", "博客"]
categories: ["数字生活"]    # 分类列表
preview: ""                 # 封面图路径（可选）
hiddenFromHomePage: false   # 是否在首页隐藏（可选）
---
```

### `content/about.md` — 关于我页面

博主"魏俊浩"的个人介绍页面。访问路径：`/about`。包含博客定位说明和社交信息。

---

## 配置文件

### `hugo.toml` — 主配置文件（约 1400 行）

全功能开启的配置文件，每个配置项均附有详细的中文注释。主要配置区段：

| 区段 | 行号范围 | 说明 |
|------|----------|------|
| **一、Hugo 全局基础配置** | 12-40 | 站点标题、URL、主题、语言、版权等 |
| **二、Front Matter 配置** | 48-55 | 文章元数据读取优先级 |
| **三、图片处理** | 63-65 | JPEG 压缩质量 |
| **四、导航菜单** | 75-115 | 顶部导航栏配置（文章/分类/标签/归档/关于） |
| **五、相关文章推荐** | 123-143 | 相似文章匹配策略 |
| **六、Hugo 模块配置** | 150-153 | Hugo 版本要求 |
| **七、输出格式定义** | 161-207 | archive/offline/link/search 等输出格式 |
| **八、页面输出设置** | 215-225 | 每种页面类型生成的输出格式 |
| **九、分类法配置** | 233-236 | category(分类)、tag(标签)、collection(合集) |
| **十、Markdown 渲染** | 244-304 | 代码高亮、Goldmark 扩展、数学公式等 |
| **十一、站点地图** | 312-315 | Sitemap 更新频率设置 |
| **十二、永久链接** | 323-329 | 自定义 URL 规则（当前使用默认） |
| **十三、隐私配置** | 337-341 | DNT（不跟踪）、YouTube 隐私增强 |
| **十四、FixIt 主题参数** | 349-1194 | 作者、搜索、导航、页脚、归档、首页、社交、图表、水印等全部功能 |
| **十五、文章页面配置** | 1202-1528 | 目录、标题编号、数学公式、评论、分享、过期提醒等 |

**关键开关**（快速定位常用配置）：

- 🔍 **搜索**：`params.search.enable` → `true`（Fuse.js 本地搜索）
- 📊 **统计**：`params.busuanzi.enable` → `true`（不蒜子访客统计）
- 🏠 **首页**：`params.home.profile.enable` → `true`（个人资料区）
- 💬 **评论**：`params.page.comment.enable` → `false`（需选择评论系统并填入信息）
- 📐 **标题编号**：`params.page.heading.number.enable` → `true`
- 🧮 **数学公式**：`params.page.math.enable` → `true`（KaTeX）
- 📋 **代码块**：`params.codeblock` → 全功能开启（复制/下载/全屏/行号切换）
- 🔗 **外部链接**：`params.link.guard.enable` → `true`（跳转确认）

### `.gitignore`

排除以下内容不纳入版本控制：
- `/public/` — 构建输出
- `/resources/` — Hugo 资源缓存
- `.hugo_build.lock` — 构建锁文件
- `.DS_Store`、`Thumbs.db` 等系统文件

---

## 自定义模板

项目在 `layouts/` 目录下有两个自定义 partial 模板，用于覆盖主题默认行为：

### `layouts/partials/breadcrumbs.html`

自定义面包屑导航组件。在文章页面顶部显示层级导航路径（如：首页 > 分类名 > 文章标题），帮助读者了解当前位置。

### `layouts/partials/toc.html`

自定义文章目录（Table of Contents）组件。在文章侧边栏生成悬浮目录导航，自动解析文章中的 h1-h6 标题，支持展开/折叠和滚动高亮。

---

## 自定义样式

### `assets/scss/_override.scss` — SCSS 变量覆写

定义博客全局配色和排版变量，覆盖主题默认值：

- **背景色**：暖白 `#fdfcf8`
- **字体栈**：衬线字体优先（Noto Serif SC → 宋体 → serif），回退到系统字体
- **链接悬停色**：暗红 `#c0504d`
- **基础字号**：17px
- **行高**：1.75

### `assets/scss/_custom.scss` — 自定义 CSS 规则

约 115 行自定义样式，包括：

- **文章卡片样式**：圆角、阴影、悬停效果
- **标题排版**：h2-h6 的字体大小、颜色、边框、间距
- **行内代码**：暗红色 `#c0504d` 配色，圆角背景
- **图片样式**：圆角 + 阴影
- **引用块 blockquote**：左侧装饰条、斜体
- **暗色模式适配**：深色背景下的标题、代码、引用块颜色调整
- **标签云样式**：标签间距和排版

### `assets/css/extended/toc.css` — 目录布局样式

控制文章目录（TOC）的布局与尺寸：

- 目录容器宽度：300px
- 内容区宽度：650px
- 全局导航宽度：1380px
- 目录滚动条美化
- 目录层级缩进
- 激活状态高亮

### `assets/jsconfig.json` — JS 路径映射

为 IDE（如 VS Code）提供模块路径映射，将 `*` 映射到 `themes/FixIt/assets/*`，实现 JS 文件的智能提示和跳转。

---

## 静态资源

### `static/images/avatar.png`

博主头像图片（约 625 KB）。配置于 `hugo.toml` 的 `params.author.avatar` 和 `params.home.profile.avatarURL` 中，显示在关于页、首页个人资料区和文章底部作者信息处。

### `static/images/cs.png`

通用配图（约 24 KB），可作为文章封面或正文插图使用。

---

## 构建工具

### `bin/dart-sass/`

Dart Sass 二进制可执行文件目录。Hugo 在编译 SCSS 文件时需要此工具。当前版本对应的 Hugo 要求为 `>= 0.158.0 (Extended)`。

### `bin/ds.zip`

Dart Sass 的原始压缩包（3.8 MB），作为备份保留。

---

## 主题文件

### `themes/FixIt/` — FixIt 主题 v0.4.X

FixIt 是由 [Lruihao](https://github.com/hugo-fixit) 开发的 Hugo 主题，基于 DoIt 重构，MIT 协议开源。官方文档：[fixit.lruihao.cn](https://fixit.lruihao.cn/)

#### 主题核心文件

| 文件 | 说明 |
|------|------|
| `theme.toml` | 主题元数据（名称、版本、作者、协议、Hugo 最低版本） |
| `hugo.toml` | 主题默认配置模板（约 48 KB），供参考和覆盖 |
| `README.md` | 主题英文说明（16.6 KB） |
| `README.zh-cn.md` | 主题中文说明（16.5 KB） |
| `LICENSE` | MIT 开源许可证 |
| `go.mod` | Go 模块定义文件 |
| `package.json` | Node 依赖（pnpm workspace 管理） |
| `giscus.json` | Giscus 评论系统默认配置 |

#### 主题布局模板（`layouts/`）

**顶级布局**：

| 文件 | 对应页面 |
|------|----------|
| `baseof.html` | 所有页面的 HTML 骨架 |
| `home.html` | 首页（个人资料区 + 文章列表） |
| `home.archives.html` | 归档页（`/archives/`） |
| `home.offline.html` | PWA 离线页面 |
| `home.link.html` | 友链页面 |
| `section.html` | 分区页面（如 `/posts/`） |
| `taxonomy.html` | 分类法列表页 |
| `taxonomies.html` | 分类法聚合页 |
| `term.html` | 分类/标签详情页 |
| `tags.html` | 标签云页面 |
| `search.html` | 搜索结果页 |
| `404.html` | 404 错误页 |
| `friends.html` | 友链列表页 |
| `summary.html` | 文章摘要卡片 |
| `sitemap.xml` | 站点地图 |
| `robots.txt` | 爬虫协议 |

**文章渲染**：

| 文件 | 说明 |
|------|------|
| `posts/single.html` | **文章详情页布局**（最核心的渲染模板，12.94 KB） |

**Markdown 渲染钩子（`_markup/`，12 个文件）**：

控制 Markdown 各元素如何渲染为 HTML：
- `render-heading.html` — 标题（支持自动编号、锚点）
- `render-image.html` — 图片（支持灯箱、懒加载）
- `render-link.html` — 链接（区分内部/外部链接）
- `render-table.html` — 表格
- `render-codeblock.html` — 通用代码块
- `render-codeblock-mermaid.html` — Mermaid 图表
- `render-codeblock-echarts.html` — ECharts 图表
- `render-codeblock-toggle.html` — 折叠代码块
- `render-codeblock-file-tree.html` — 文件树
- `render-codeblock-fixit.html` / `json.html` — 自定义代码块、JSON 查看器
- `render-passthrough.html` — 数学公式穿透
- `render-blockquote-alert.html` — 引用警告框（Admonition）

**Shortcode（`_shortcodes/`，28 个）**：

提供丰富的 Hugo 短代码，在文章中通过 `{{</* shortcode */>}}` 语法调用：

| Shortcode | 功能 |
|-----------|------|
| `admonition` | 自定义警告框（提示/注意/警告/错误等） |
| `image` | 增强图片（支持标题、缩放、灯箱） |
| `link` | 增强链接（支持图标、下载属性） |
| `music` / `audio` | 音乐播放器 / 音频 |
| `bilibili` / `douyin` | 嵌入 B站/抖音 视频 |
| `echarts` / `mermaid` | 图表渲染 |
| `timeline` | 时间线 |
| `file-tree` | 文件树结构 |
| `typeit` | 打字机动画效果 |
| `details` | 折叠面板 |
| `tabs` | 标签页切换 |
| `fixit-encryptor` | **内容加密**（密码保护） |
| `reward` | 打赏组件 |
| `person` / `friend` | 个人名片 / 友链卡片 |

**Partial 组件（`_partials/`，11 个子目录）**：

| 子目录 | 文件数 | 功能 |
|--------|:--:|------|
| `function/` | 31 | 工具函数：代码高亮、图片处理、文件树生成、内容加密、远程资源获取、字数统计等 |
| `plugin/` | 20 | 功能插件：评论系统、社交分享、统计分析（Google/Baidu/Fathom 等）、ECharts/Mermaid 图表、代码块包装、图片灯箱、内容加密、Cookie 同意 |
| `init/` | 8 | 页面初始化：环境检测、版本检测、浏览器兼容性处理、全局变量初始化、PWA 补丁 |
| `layouts/` | 10 | 页面结构组件：header、footer、面包屑、分页器、head 标签、assets 加载、评论容器、侧边栏 widgets |
| `single/` | 10 | 文章详情组件：作者信息、合集导航、过期提醒、加密解密器、相关文章推荐、打赏、页脚 |
| `section/` | 1 | `recently-updated.html` — 最近更新面板 |
| `home/` | 1 | `profile.html` — 首页个人资料卡片 |
| `feed/` | 1 | `rss.html` — RSS/Atom/JSON Feed 生成 |
| `store/` | 2 | `script.html` / `style.html` — JS/CSS 资源管理 |
| `_debug/` | 2 | 调试工具（变量 dump、调用栈输出） |

#### 多语言翻译（`i18n/`）

支持 16 种语言的界面翻译文件（.toml 格式）：

de（德语）、en（英语）、es（西班牙语）、fr（法语）、hi（印地语）、it（意大利语）、ja（日语）、ko（韩语）、pl（波兰语）、pt-BR（巴西葡萄牙语）、ro（罗马尼亚语）、ru（俄语）、sr（塞尔维亚语）、vi（越南语）、zh-CN（简体中文）、zh-TW（繁体中文）

#### 静态资源（`static/`）

- `favicon.ico` — 默认网站图标
- `lib/webfonts/` — FontAwesome 6 字体（4 个 woff2）
- `lib/katex/fonts/` — KaTeX 数学公式字体（28 个文件）
- `lib/lightgallery/` — 图片灯箱字体和图标

#### 主题资源（`assets/`）

- `scss/` — SCSS 源文件（`_variables.scss` 变量定义、`main.scss` 入口、核心/页面/组件样式）
- `js/` — JS 源文件（`theme.js` 78KB 主题核心、`fixit-decryptor.js` 加密解密、`service-worker.js` PWA、工具函数等）
- `images/` — SVG 图标（主题 logo、Hugo logo、加载动画、社交媒体图标）
- `data/` — 数据文件（CDN 映射 `jsdelivr.yml`/`unpkg.yml`、社交平台配置 `social.yml`、polyfill 配置）
- `lib/` — 第三方库本地副本

---

## 本地开发

```bash
# 进入项目目录
cd e:/hugo/blog/myblog

# 开发模式（包含草稿，实时预览）
$env:PATH = "e:/hugo/blog/myblog/bin/dart-sass;$env:PATH"
hugo server -D

# 生产构建（不包含草稿）
hugo

# 新建文章
hugo new posts/文章名.md
```

访问 [http://localhost:1313](http://localhost:1313) 预览。

---

## 待办事项

- [ ] 将 5 篇草稿文章的 `draft` 改为 `false` 以公开发布
- [ ] 初始化 Git 仓库（`git init`）后，将 `enableGitInfo` 改为 `true`
- [ ] 部署到线上时，修改 `baseURL` 为真实域名
- [ ] 选择并配置评论系统（推荐 Giscus 或 Waline）
- [ ] 填入统计分析工具的 ID（如需要）
- [ ] 准备头像图片 `static/images/avatar.png`（当前 625 KB 偏大，建议压缩）

---

> 最后更新：2026-05-27
