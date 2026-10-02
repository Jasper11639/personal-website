# 个人网站设计文档

日期:2026-10-01
状态:已获用户确认(brainstorm 定稿)

## 1. 背景与目标

- 用途:记录技术学习笔记,以网站形式持续完善与对外可见
- 仓库:`Jasper11639/personal-website`(GitHub)
- 核心原则:**内容优先、维护成本最低、可持续演进**(YAGNI)

## 2. 技术架构

- **静态站点生成器:VitePress**(Vue 技术栈,为文档/笔记而生)
- 内容形式:Markdown(.md)
- 部署:GitHub Actions 自动构建 → GitHub Pages
- 站点 URL:`https://jasper11639.github.io/personal-website/`
  - 注意:仓库名非 `jasper11639.github.io`,站点挂在子路径下,**必须配置 `base: '/personal-website/'`**,否则全站资源 404
- 运行时要求:Node.js ≥ 18(Actions 中使用 Node 20),包管理器用 npm

## 3. 目录结构

```
personal-website/
├── .github/workflows/deploy.yml   # 自动部署流水线(push main → 构建 → Pages)
├── docs/                          # VitePress 源代码根目录
│   ├── .vitepress/config.mts      # 站点配置(标题/导航/侧边栏/搜索/base 等)
│   ├── index.md                   # 首页(home 布局)
│   ├── notes/                     # 学习笔记,按主题分文件夹
│   │   ├── index.md               # 笔记总览页
│   │   └── <主题>/                # 如 javascript/、network/、tools/
│   │       └── <笔记名>.md
│   ├── public/                    # 静态资源(favicon 等)
│   └── superpowers/specs/         # 设计文档(本文档所在)
├── package.json
├── .gitignore                     # 忽略 node_modules、构建产物、.superpowers/
└── README.md
```

**关键配置**:VitePress 会把 `docs/` 下所有 md 当作页面处理,因此 `config.mts` 中需设置 `srcExclude: ['**/superpowers/**']`,避免设计文档被构建进网站。

## 4. 页面与布局

- **首页**:VitePress `home` 布局(经典门面风)
  - Hero 区:站名「Tevin 的学习笔记」(占位,可随时在配置中修改)+ 一句话标语 + 「开始阅读」「GitHub」按钮
  - Features 区 3 张卡片:📚 笔记分类、🕐 持续更新、✏️ 网页可编辑
- **笔记页**:默认文档布局,左侧边栏按主题分组
- **顶部导航**:首页 / 笔记 / GitHub 仓库链接
- 界面语言:简体中文

## 5. v1 功能范围

| 功能 | 说明 |
|---|---|
| 深色模式 | 主题内置,跟随系统,可手动切换 |
| 全文搜索 | VitePress 内置本地搜索(Ctrl+K),无外部服务依赖 |
| 最后更新时间 | `lastUpdated: true`,取自 git 提交时间 |
| ✏️ 编辑此页 | `editLink` 指向 GitHub 仓库网页编辑器,每页一键直达 |
| 侧边栏目录 | 在 config.mts 中手动维护(一篇一行),简单可控 |

**v1 明确不做**(以后想要再加):评论区、标签系统、RSS、访问统计、网页 CMS、自定义域名。

## 6. 写作工作流

1. **主力方式**:VSCode 本地编辑 md → `npm run docs:dev` 实时预览 → push 自动发布
2. **网页方式**:直接在 GitHub 仓库网页新建/编辑 md(手机/平板亦可)→ Commit 自动发布
3. **快捷修改**:浏览站点时点页面底部「编辑此页」直达 GitHub 编辑器

新增一篇笔记 = 在 `docs/notes/<主题>/` 新建 md + 在 config.mts 侧边栏对应分组加一行链接。

## 7. 部署管线

- `.github/workflows/deploy.yml`:采用 VitePress 官方 Pages 模板
  - 触发:push 到 `main` 分支,以及手动触发(workflow_dispatch)
  - 步骤:Node 20 → `npm ci` → `npm run docs:build` → 上传 `docs/.vitepress/dist` → `actions/deploy-pages`
- **一次性手动设置**(用户完成):仓库 Settings → Pages → Build and deployment → Source 选择 "GitHub Actions"

## 8. 验证标准(完成定义)

1. `npm run docs:build` 本地构建成功,无报错
2. `npm run docs:dev` 可浏览:首页(Hero+卡片)、笔记总览、示例笔记页,搜索/深色模式可用
3. push 后 Actions 流水线全绿,`https://jasper11639.github.io/personal-website/` 可访问且样式正常(验证 base 配置正确)
4. 走通"新增一篇笔记 → 网页编辑提交 → 自动发布上线"全流程

## 9. 后续演进方向(非 v1)

- 笔记中嵌入交互式 demo(VitePress 支持 md 内嵌 Vue 组件)
- 评论区(giscus)、RSS、sitemap、标签页、自定义域名、国内加速
