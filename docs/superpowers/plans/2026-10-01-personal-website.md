# 个人网站(VitePress 学习笔记站)实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 从零搭建一个 VitePress 驱动的学习笔记网站,push 到 main 即自动部署到 GitHub Pages。

**Architecture:** VitePress(Vue 静态站生成器)+ Markdown 内容,源代码在 `docs/` 下;GitHub Actions 官方 Pages 模板负责构建与部署;站点挂在子路径 `/personal-website/` 下(配置 `base`)。

**Tech Stack:** Node.js ≥ 18(Actions 用 Node 20)、npm、VitePress 1.x + Vue 3、GitHub Actions、GitHub Pages。

**设计依据:** docs/superpowers/specs/2026-10-01-personal-website-design.md(已批准)

**有意偏离规格书的一点:** 规格书目录树中的 `docs/public/` 暂为空,git 不跟踪空目录且无 favicon 素材,v1 不创建,等有静态资源时再加。

---

### Task 1: 初始化 npm 项目并安装 VitePress

**Files:**
- Create: `package.json`
- Create(install 生成): `package-lock.json`

- [ ] **Step 1: 确认 Node 环境**

Run: `node -v`
Expected: 输出 `v18.x` 或更高(如 `v20.x`)。若报 command not found 或版本过低,先停下手头工作,提示用户安装 Node 20(nvm 或 apt),再继续。

- [ ] **Step 2: 创建 package.json**

```json
{
  "name": "personal-website",
  "private": true,
  "description": "Tevin 的学习笔记 —— 个人网站",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```

- [ ] **Step 3: 安装依赖**

Run: `npm install -D vitepress vue`
Expected: 成功结束,生成 `node_modules/` 与 `package-lock.json`,`package.json` 多出 `devDependencies`。
若网络过慢/超时,换镜像重试:`npm install -D vitepress vue --registry=https://registry.npmmirror.com`

- [ ] **Step 4: 验证安装**

Run: `npx vitepress --version`
Expected: 输出形如 `vitepress/x.y.z`(大版本 ≥ 1)。

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: 初始化 npm 项目,安装 VitePress"
```

---

### Task 2: 编写 VitePress 站点配置

**Files:**
- Create: `docs/.vitepress/config.mts`

- [ ] **Step 1: 创建配置文件**

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: "Tevin 的学习笔记",
  description: "记录学习,沉淀积累",
  // 站点部署在子路径下,必须与仓库名一致,否则资源 404
  base: '/personal-website/',
  // 设计文档目录不参与站点构建
  srcExclude: ['**/superpowers/**'],
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/notes/' },
      { text: 'GitHub', link: 'https://github.com/Jasper11639/personal-website' },
    ],

    sidebar: {
      '/notes/': [
        {
          text: '入门指南',
          items: [
            { text: '笔记总览', link: '/notes/' },
            { text: '如何新增一篇笔记', link: '/notes/getting-started/how-to-add-note' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Jasper11639/personal-website' },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/Jasper11639/personal-website/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    lastUpdatedText: '最后更新',
    docFooter: { prev: '上一页', next: '下一页' },
    darkModeSwitchLabel: '深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    outline: { label: '本页目录' },
  },
})
```

- [ ] **Step 2: 提交前先不验证**(站点内容在 Task 3 就位后,Task 4 统一构建验证——此 Task 配置文件单独无法有效验证,VitePress 加载配置由框架内部完成,单独语法检查无意义)

- [ ] **Step 3: Commit**

```bash
git add docs/.vitepress/config.mts
git commit -m "feat: 添加 VitePress 站点配置(导航/侧边栏/搜索/编辑链接/base)"
```

---

### Task 3: 创建首页与首批内容

**Files:**
- Create: `docs/index.md`
- Create: `docs/notes/index.md`
- Create: `docs/notes/getting-started/how-to-add-note.md`

- [ ] **Step 1: 创建首页 `docs/index.md`**(经典门面风:Hero + 3 卡片)

```markdown
---
layout: home

hero:
  name: "Tevin 的学习笔记"
  tagline: 记录学习,沉淀积累 · 站点持续完善中
  actions:
    - theme: brand
      text: 📖 开始阅读
      link: /notes/
    - theme: alt
      text: GitHub
      link: https://github.com/Jasper11639/personal-website

features:
  - icon: 📚
    title: 笔记分类
    details: 按主题整理的学习笔记,从侧边栏或顶部导航进入浏览。
  - icon: 🕐
    title: 持续更新
    details: 学习不停,笔记不止。每页底部显示最后更新时间。
  - icon: ✏️
    title: 网页可编辑
    details: 每页底部「在 GitHub 上编辑此页」直达在线编辑器,随时随地修改发布。
---
```

- [ ] **Step 2: 创建笔记总览页 `docs/notes/index.md`**

```markdown
# 笔记总览

这里按主题整理我的技术学习笔记。目前已有:

- **入门指南**
  - [如何新增一篇笔记](./getting-started/how-to-add-note) —— 本站的写作与发布流程说明

后续会陆续补充 JavaScript、网络、工具等主题。
```

- [ ] **Step 3: 创建示例笔记 `docs/notes/getting-started/how-to-add-note.md`**

```markdown
# 如何新增一篇笔记

本站全部内容都是 Markdown 文件,新增一篇笔记只需要两步。

## 一、新建 Markdown 文件

在 `docs/notes/` 下按主题建文件夹(没有合适的就新建一个),然后创建 `.md` 文件:

```
docs/notes/<主题>/<笔记名>.md
```

文件第一行写一个一级标题,就是笔记标题:

```markdown
# 我的笔记标题

正文内容……
```

## 二、登记到侧边栏

打开 `docs/.vitepress/config.mts`,在 `sidebar` 对应主题的 `items` 里加一行:

```ts
{ text: '我的笔记标题', link: '/notes/<主题>/<笔记名>' },
```

注意 `link` 不带 `.md` 后缀,以 `/` 开头。

## 发布

- **本地写作**:`npm run docs:dev` 实时预览,完成后 `git push`,几分钟后自动上线。
- **网页写作**:直接在 GitHub 仓库页面新建/编辑上述文件,Commit 后自动发布。

就是这样,开始写吧 🎉
```

- [ ] **Step 4: Commit**

```bash
git add docs/index.md docs/notes/
git commit -m "feat: 添加首页与首批笔记内容(总览 + 写作指南)"
```

---

### Task 4: 本地构建验证

**Files:**
- Modify(可能): `docs/.vitepress/config.mts`(若验证发现问题就地修复)

- [ ] **Step 1: 执行生产构建**

Run: `npm run docs:build`
Expected: 构建成功(输出包含 `build complete`),退出码 0。若报错,按错误信息修复(常见问题:配置拼写、链接指向不存在的文件、frontmatter YAML 缩进)。

- [ ] **Step 2: 验证产物存在**

Run: `test -f docs/.vitepress/dist/index.html && echo "首页产物 OK"`
Expected: 输出 `首页产物 OK`。

- [ ] **Step 3: 验证 base 子路径已生效**(样式/脚本引用必须带 `/personal-website/` 前缀)

Run: `grep -o '/personal-website/assets/[^"]*' docs/.vitepress/dist/index.html | head -3`
Expected: 输出至少一行形如 `/personal-website/assets/xxx.js|css` 的引用。**若输出为空,说明 base 配置未生效,必须修复后才可继续。**

- [ ] **Step 4: 验证设计文档未被构建进站点**

Run: `test ! -d docs/.vitepress/dist/superpowers && echo "srcExclude OK"`
Expected: 输出 `srcExclude OK`。

- [ ] **Step 5(可选,建议): 启动开发服务器人工浏览**

Run: `npm run docs:dev`,浏览器打开终端提示的地址(默认 http://localhost:5173/personal-website/),确认:首页 Hero+卡片正常、点击「开始阅读」进入总览、侧边栏有两篇、Ctrl+K 搜索可用、深色模式切换可用。确认后 Ctrl+C 停止。

- [ ] **Step 6: Commit(若本 Task 有修复)**

```bash
git add -A
git commit -m "fix: 修复构建验证中发现的问题"
```
若无任何修改,跳过本步。

---

### Task 5: GitHub Actions 自动部署工作流

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: 创建工作流文件**(VitePress 官方 Pages 模板,npm 适配;`fetch-depth: 0` 保证 lastUpdated 能取到 git 时间)

```yaml
name: 部署 VitePress 站点到 Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 检出代码
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: 安装 Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: 配置 Pages
        uses: actions/configure-pages@v4
      - name: 安装依赖
        run: npm ci
      - name: 构建 VitePress
        run: npm run docs:build
      - name: 上传产物
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: 部署到 GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: 校验 YAML 语法**

Run: `python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/deploy.yml')); print('YAML OK')"`
Expected: 输出 `YAML OK`。若 python3 无 yaml 库,改用 `npx yaml-lint` 或人工核对缩进(YAML 对缩进敏感)。

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: 添加 GitHub Actions 自动部署到 Pages"
```

---

### Task 6: 上线与全流程验证(需用户配合)

**Files:** 无文件变更;本任务为仓库托管与线上验证。

- [ ] **Step 1: 检查是否已有 GitHub 远程仓库**

Run: `git remote -v`
Expected 与分支处理:
- 已存在 `origin https://github.com/Jasper11639/personal-website.git`(或 SSH 形式)→ 跳到 Step 3
- 无任何远程 → 继续 Step 2

- [ ] **Step 2: 在 GitHub 创建远程仓库(用户操作)**

方式任选其一:
- 网页:打开 https://github.com/new,仓库名填 `personal-website`,Public,**不要**勾选初始化 README/gitignore(本地已有),创建后按页面提示执行:
  `git remote add origin https://github.com/Jasper11639/personal-website.git`
- 或命令行(若已登录 gh):`gh repo create personal-website --public --source=. --remote=origin`

- [ ] **Step 3: 推送代码(涉及凭据,由用户本人在终端输入)**

请用户执行:
```
! git push -u origin main
```
Expected: 推送成功,无认证报错。若提示认证,指导用户配置(gh auth login 或 SSH key)。

- [ ] **Step 4: 开启 Pages(一次性手动设置,用户操作)**

指引用户:仓库页面 → **Settings → Pages** → Build and deployment → **Source 选择 "GitHub Actions"** → 保存。

- [ ] **Step 5: 观察流水线**

Run: `gh run watch`(或网页仓库 Actions 标签页查看)
Expected: "部署 VitePress 站点到 Pages" 工作流 build、deploy 两个 job 全绿。若红,读取失败日志修复(先检查 Step 4 是否已做)。

- [ ] **Step 6: 线上验证**

打开 https://jasper11639.github.io/personal-website/
Expected:
- 页面正常显示且有样式(若白屏/裸 HTML,即 base 错配,回 Task 2 检查 base 并重新走 Task 4 验证)
- 「开始阅读」可进入笔记总览,侧边栏显示两篇笔记,"编辑此页"链接指向正确仓库路径

- [ ] **Step 7: 全流程验证(模拟一次真实写作)**

在 GitHub 网页直接编辑(如给 `docs/notes/index.md` 改一句话)并 Commit 到 main → Actions 自动重跑 → 几分钟后线上内容更新。验证通过后,v1 完成 🎉

---

## Self-Review 记录

- **规格覆盖**:架构/目录(Task 1-3)、base 与 srcExclude(Task 2、Task 4 Step 3/4)、首页 Hero+卡片(Task 3)、v1 全部功能(Task 2:深色/搜索/lastUpdated/editLink/导航/侧边栏)、写作工作流说明(Task 3 示例笔记内容承载)、Actions 部署(Task 5)、线上验证标准 4 条(Task 4 + Task 6)。`docs/public/` 有意暂缓(见开头说明)。
- **占位符扫描**:无 TBD/TODO;所有代码块内容完整;Task 4 Step 5 与 Task 6 的人工程序均含明确操作与预期。
- **一致性**:包脚本名 `docs:dev/build/preview` 在 Task 1 定义、Task 4/5 使用一致;`base` 与 URL 一致;侧边栏链接与 Task 3 文件路径一致(`/notes/getting-started/how-to-add-note` ↔ `docs/notes/getting-started/how-to-add-note.md`);editLink `pattern` 中 `docs/:path` 与源目录结构一致;笔记总览中的相对链接 `./getting-started/how-to-add-note` 与文件一致。
